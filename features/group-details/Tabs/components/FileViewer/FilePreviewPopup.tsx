"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { getFileTypeInfo } from "@/features/group-details/Tabs/utils/fileTypeUtils";

// Dynamically import pdf.js and docx-preview to avoid SSR issues
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfjsLib = typeof window !== "undefined" ? require("pdfjs-dist") : null;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const renderAsync = typeof window !== "undefined" ? require("docx-preview").renderAsync : null;

// Configure PDF.js worker
if (typeof window !== "undefined" && pdfjsLib) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;
}

interface FilePreviewPopupProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  fileName: string;
  contentType: string;
}

function FilePreviewPopup({
  isOpen,
  onClose,
  fileUrl,
  fileName,
  contentType,
}: FilePreviewPopupProps) {
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
  const pdfCanvasRef = useRef<HTMLCanvasElement>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const docxContainerRef = useRef<HTMLDivElement>(null);
  const fileInfo = getFileTypeInfo(contentType);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pdfDoc, setPdfDoc] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  // Zoom logic: 1.0 = "Fit to Width"
  const [zoomLevel, setZoomLevel] = useState(1.0); 
  const [isLoading, setIsLoading] = useState(false);
  
  // Store container width to recalculate PDF scale on resize/rotate
  const [containerWidth, setContainerWidth] = useState(0);

  // --- PDF Logic ---

  // 1. Load PDF Document
  useEffect(() => {
    if (isOpen && fileInfo.category === "pdf" && fileUrl && pdfjsLib) {
      setIsLoading(true);
      const loadingTask = pdfjsLib.getDocument(fileUrl);
      
      loadingTask.promise
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((loadedDoc: any) => {
          setPdfDoc(loadedDoc);
          setTotalPages(loadedDoc.numPages);
          setCurrentPage(1);
          setZoomLevel(1.0); // Reset zoom
          setIsLoading(false);
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          console.error("Error loading PDF:", error);
          setIsLoading(false);
        });

      return () => {
        loadingTask.destroy(); 
        setPdfDoc(null);
      };
    }
  }, [isOpen, fileInfo.category, fileUrl]);

  // 2. Watch Container Resize (Fixes Mobile Orientation & Layout)
  useEffect(() => {
    if (!pdfContainerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });

    resizeObserver.observe(pdfContainerRef.current);
    return () => resizeObserver.disconnect();
  }, [isOpen, fileInfo.category]);

  // 3. Render PDF Page
  const renderPage = useCallback(() => {
    if (!pdfDoc || !pdfCanvasRef.current || containerWidth === 0) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pdfDoc.getPage(currentPage).then((page: any) => {
      const canvas = pdfCanvasRef.current!;
      const context = canvas.getContext("2d");
      if (!context) return;

      // Calculate Scale: Fit to width of container
      const unscaledViewport = page.getViewport({ scale: 1 });
      const padding = 32; // Safety margin
      const scaleToFit = (containerWidth - padding) / unscaledViewport.width;
      
      // Apply user zoom on top of the "Fit Width" scale
      const finalScale = scaleToFit * zoomLevel;

      const viewport = page.getViewport({ scale: finalScale });
      
      // Handle High DPI (Retina)
      const outputScale = window.devicePixelRatio || 1;

      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      
      // CSS controls the display size
      canvas.style.width = Math.floor(viewport.width) + "px";
      canvas.style.height = Math.floor(viewport.height) + "px";

      const transform = outputScale !== 1 
        ? [outputScale, 0, 0, outputScale, 0, 0] 
        : null;

      const renderContext = {
        canvasContext: context,
        transform: transform,
        viewport: viewport,
      };

      page.render(renderContext);
    });
  }, [pdfDoc, currentPage, zoomLevel, containerWidth]);

  // Trigger render
  useEffect(() => {
    if(pdfDoc) {
      // Small timeout to let UI settle
      const t = setTimeout(() => renderPage(), 10);
      return () => clearTimeout(t);
    }
  }, [renderPage, pdfDoc]);


  // --- DOCX Logic ---
  useEffect(() => {
    if (
      isOpen &&
      fileInfo.category === "document" &&
      fileUrl &&
      docxContainerRef.current &&
      renderAsync
    ) {
      setIsLoading(true);
      fetch(fileUrl)
        .then((response) => response.blob())
        .then((blob) => {
          if (docxContainerRef.current && renderAsync) {
            docxContainerRef.current.innerHTML = "";
            return renderAsync(blob, docxContainerRef.current, undefined, {
              className: "docx-preview-content", 
              inWrapper: true,
              ignoreWidth: false, // Keep false to respect doc layout
              ignoreHeight: false, 
              breakPages: true,
              renderHeaders: true,
              renderFooters: true,
              experimental: false,
            });
          }
        })
        .then(() => setIsLoading(false))
        .catch((error) => {
          console.error("Error loading DOCX:", error);
          setIsLoading(false);
        });
    }
  }, [isOpen, fileInfo.category, fileUrl, contentType]);

  // --- Modal Events ---
  useEffect(() => {
    if (!isOpen && mediaRef.current) {
      if ("pause" in mediaRef.current) mediaRef.current.pause();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // --- Render Helpers ---

  const renderContent = () => {
    switch (fileInfo.category) {
      case 'video':
        return (
          <div className="flex-1 flex items-center justify-center bg-black min-h-0">
            <video
              ref={mediaRef as React.RefObject<HTMLVideoElement>}
              controls
              autoPlay
              className="w-full h-full object-contain"
              src={fileUrl}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        );

      case 'audio':
        return (
          <div className="flex-1 flex items-center justify-center bg-gray-900 p-4 sm:p-12 min-h-0">
            <div className="flex flex-col items-center gap-6 w-full max-w-lg bg-gray-800 p-8 rounded-xl shadow-lg">
              {/* Audio Icon */}
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                  <path d="M9 18V5l12-2v13M9 18c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm12-2c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"/>
                </svg>
              </div>
              <audio
                ref={mediaRef as React.RefObject<HTMLAudioElement>}
                controls
                autoPlay
                className="w-full"
                src={fileUrl}
              >
                Your browser does not support the audio tag.
              </audio>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="flex-1 flex items-center justify-center bg-black p-4 overflow-hidden">
            <img
              src={fileUrl}
              alt={fileName}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        );

      case 'pdf':
        return (
          <div className="flex-1 flex flex-col bg-gray-100 min-h-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-800 p-2 sm:p-3 border-b border-gray-700 gap-2 shrink-0 z-10">
              {/* Pagination */}
              <div className="flex items-center gap-2 order-2 sm:order-1">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage <= 1 || isLoading}
                  className="px-3 py-1 bg-gray-700 text-white rounded text-sm disabled:opacity-50 hover:bg-gray-600"
                >
                  Prev
                </button>
                <span className="text-white text-xs sm:text-sm whitespace-nowrap min-w-[60px] text-center">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage >= totalPages || isLoading}
                  className="px-3 py-1 bg-gray-700 text-white rounded text-sm disabled:opacity-50 hover:bg-gray-600"
                >
                  Next
                </button>
              </div>
              
              {/* Zoom Controls */}
              <div className="flex items-center gap-2 order-1 sm:order-2 w-full sm:w-auto justify-center sm:justify-end">
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(0.5, prev - 0.25))}
                  disabled={isLoading}
                  className="px-3 py-1 bg-gray-700 text-white rounded text-sm disabled:opacity-50 hover:bg-gray-600 w-8"
                >
                  -
                </button>
                <span className="text-white text-xs sm:text-sm w-12 text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((prev) => Math.min(3, prev + 0.25))}
                  disabled={isLoading}
                  className="px-3 py-1 bg-gray-700 text-white rounded text-sm disabled:opacity-50 hover:bg-gray-600 w-8"
                >
                  +
                </button>
              </div>
            </div>

            {/* CRITICAL FIX FOR PDF CLIPPING: 
               1. relative + overflow-auto on parent
               2. block + mx-auto on canvas (NO flex justify-center) 
            */}
            <div 
              ref={pdfContainerRef}
              className="flex-1 relative overflow-auto bg-gray-500 w-full"
            >
              <div className="min-h-full p-4 sm:p-8 flex flex-col items-center">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-500/50 z-20">
                      <div className="bg-black/75 text-white px-4 py-2 rounded">Loading...</div>
                    </div>
                  )}
                  {/* Canvas must be block with margin auto to scroll correctly when zoomed */}
                  <canvas
                    ref={pdfCanvasRef}
                    className="bg-white shadow-xl block mx-auto"
                    style={{ display: isLoading ? "none" : "block" }}
                  />
              </div>
            </div>
          </div>
        );

      case 'document':
        return (
          <div className="flex-1 flex flex-col bg-gray-100 min-h-0 relative">
             {isLoading && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-100/90">
                <div className="text-gray-600 font-medium">Loading document...</div>
              </div>
            )}
            
            {/* CRITICAL FIX: 
               1. We use a plain div (not flex) for the scrolling container.
               2. 'overflow-auto' handles the scrollbars.
               3. We apply 'bg-[#f3f4f6]' to match the document background.
            */}
            <div className="flex-1 overflow-auto w-full h-full bg-[#f3f4f6]">
               {/* 1. 'min-h-full' ensures it fills height.
                  2. 'mx-auto' centers it horizontally if the screen is wide enough.
                  3. We REMOVED 'flex' and 'items-center' to prevent the left-side clipping.
               */}
               <div
                ref={docxContainerRef}
                className="w-full min-h-full p-4 sm:p-8 mx-auto"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="flex-1 flex items-center justify-center bg-gray-900 p-8">
            <p className="text-gray-400">Cannot preview this file type</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-6">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      
      {/* LAYOUT FIX:
          Mobile: w-full h-full (Fullscreen)
          Desktop: max-w/max-h rounded-xl (Modal)
      */}
      <div className="relative bg-black w-full h-full sm:max-w-[1200px] sm:max-h-[90vh] flex flex-col sm:rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-900 border-b border-gray-800 shrink-0 z-30">
          <h3 className="text-white text-base font-medium truncate flex-1 mr-4">
            {fileName}
          </h3>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-800 rounded-full transition-colors shrink-0"
          >
            <Image src="/close.svg" alt="close" width={20} height={20} className="invert opacity-70 hover:opacity-100" />
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}

export default FilePreviewPopup;