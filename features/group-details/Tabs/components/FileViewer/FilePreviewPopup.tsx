"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  const docxContainerRef = useRef<HTMLDivElement>(null);
  const fileInfo = getFileTypeInfo(contentType);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pdfDoc, setPdfDoc] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.5);
  const [isLoading, setIsLoading] = useState(false);

  // Load PDF with pdf.js
  useEffect(() => {
    if (isOpen && fileInfo.category === "pdf" && fileUrl && pdfjsLib) {
      setIsLoading(true);
      pdfjsLib
        .getDocument(fileUrl)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .promise.then((loadedDoc: any) => {
          setPdfDoc(loadedDoc);
          setTotalPages(loadedDoc.numPages);
          setCurrentPage(1);
          setIsLoading(false);
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          console.error("Error loading PDF:", error);
          setIsLoading(false);
        });
    }

    return () => {
      if (pdfDoc) {
        pdfDoc.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, fileInfo.category, fileUrl]);

  // Render PDF page
  useEffect(() => {
    if (pdfDoc && pdfCanvasRef.current && fileInfo.category === "pdf" && pdfjsLib) {
      setIsLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pdfDoc.getPage(currentPage).then((page: any) => {
        const canvas = pdfCanvasRef.current!;
        const context = canvas.getContext("2d")!;
        const viewport = page.getViewport({ scale });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          canvas: canvas,
        };

        page.render(renderContext).promise.then(() => {
          setIsLoading(false);
        });
      });
    }
  }, [pdfDoc, currentPage, scale, fileInfo.category]);

  // Load DOCX with docx-preview
  useEffect(() => {
    if (isOpen && fileInfo.category === "document" && fileUrl && docxContainerRef.current && renderAsync) {
      setIsLoading(true);
      fetch(fileUrl)
        .then((response) => response.blob())
        .then((blob) => {
          if (docxContainerRef.current && renderAsync) {
            docxContainerRef.current.innerHTML = "";
            return renderAsync(blob, docxContainerRef.current, undefined, {
              className: "docx-preview-container",
              inWrapper: true,
              ignoreWidth: false,
              ignoreHeight: false,
              ignoreFonts: false,
              breakPages: true,
              ignoreLastRenderedPageBreak: true,
              experimental: false,
              trimXmlDeclaration: true,
              useBase64URL: false,
              renderHeaders: true,
              renderFooters: true,
              renderFootnotes: true,
              renderEndnotes: true,
              debug: false,
            });
          }
        })
        .then(() => {
          setIsLoading(false);
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          console.error("Error loading DOCX:", error);
          setIsLoading(false);
        });
    }
  }, [isOpen, fileInfo.category, fileUrl]);

  useEffect(() => {
    // Pause media when closing
    if (!isOpen && mediaRef.current) {
      if ("pause" in mediaRef.current) {
        mediaRef.current.pause();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when popup is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const renderContent = () => {
    switch (fileInfo.category) {
      case 'video':
        return (
          <div className="flex-1 flex items-center justify-center bg-black">
            <video
              ref={mediaRef as React.RefObject<HTMLVideoElement>}
              controls
              autoPlay
              className="w-full h-full max-h-[calc(90vh-60px)]"
              src={fileUrl}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        );

      case 'audio':
        return (
          <div className="flex-1 flex items-center justify-center bg-gray-100 p-[48px]">
            <div className="flex flex-col items-center gap-[24px] w-full max-w-[600px]">
              <div className="w-[120px] h-[120px] bg-gray-200 rounded-full flex items-center justify-center">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-600"
                >
                  <path d="M9 18V5l12-2v13M9 18c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm12-2c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" stroke="currentColor" strokeWidth="2" />
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
          <div className="flex-1 flex items-center justify-center bg-black p-[24px] overflow-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fileUrl}
              alt={fileName}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        );

      case 'pdf':
        return (
          <div className="flex-1 flex flex-col bg-gray-100">
            {/* PDF Controls */}
            <div className="flex items-center justify-between bg-gray-800 p-[12px] border-b border-gray-700">
              <div className="flex items-center gap-[12px]">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage <= 1 || isLoading}
                  className="px-[12px] py-[6px] bg-gray-700 text-white rounded disabled:opacity-50 hover:bg-gray-600"
                >
                  Previous
                </button>
                <span className="text-white text-[14px]">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage >= totalPages || isLoading}
                  className="px-[12px] py-[6px] bg-gray-700 text-white rounded disabled:opacity-50 hover:bg-gray-600"
                >
                  Next
                </button>
              </div>
              <div className="flex items-center gap-[12px]">
                <button
                  onClick={() => setScale((prev) => Math.max(0.5, prev - 0.25))}
                  disabled={isLoading}
                  className="px-[12px] py-[6px] bg-gray-700 text-white rounded disabled:opacity-50 hover:bg-gray-600"
                >
                  -
                </button>
                <span className="text-white text-[14px]">{Math.round(scale * 100)}%</span>
                <button
                  onClick={() => setScale((prev) => Math.min(3, prev + 0.25))}
                  disabled={isLoading}
                  className="px-[12px] py-[6px] bg-gray-700 text-white rounded disabled:opacity-50 hover:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>
            {/* PDF Canvas */}
            <div className="flex-1 overflow-auto bg-gray-500 flex items-start justify-center p-[24px]">
              {isLoading && (
                <div className="text-white text-[16px]">Loading PDF...</div>
              )}
              <canvas
                ref={pdfCanvasRef}
                className="bg-white shadow-lg"
                style={{ display: isLoading ? "none" : "block" }}
              />
            </div>
          </div>
        );

      case 'document':
        return (
          <div className="flex-1 flex flex-col bg-white overflow-auto">
            {isLoading && (
              <div className="flex items-center justify-center p-[48px]">
                <div className="text-gray-600 text-[16px]">Loading document...</div>
              </div>
            )}
            <div
              ref={docxContainerRef}
              className="flex-1 overflow-auto p-[24px]"
              style={{ display: isLoading ? "none" : "block" }}
            />
          </div>
        );

      default:
        return (
          <div className="flex-1 flex items-center justify-center bg-gray-100 p-[48px]">
            <div className="text-center">
              <p className="text-[18px] text-gray-600">
                Cannot preview this file type
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90" onClick={onClose} />

      {/* Popup */}
      <div className="relative bg-black w-[95vw] h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-[16px] bg-gray-900 border-b border-gray-700">
          <h3 className="text-white text-[18px] truncate flex-1 mr-[16px]">
            {fileName}
          </h3>
          <button
            onClick={onClose}
            className="shrink-0 hover:opacity-75 transition-opacity"
          >
            <Image
              src="/close.svg"
              alt="close"
              width={24}
              height={24}
              className="invert"
            />
          </button>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
}

export default FilePreviewPopup;
