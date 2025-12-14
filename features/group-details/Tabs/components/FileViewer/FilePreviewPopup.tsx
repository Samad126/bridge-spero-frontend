"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getFileTypeInfo } from "@/features/group-details/Tabs/utils/fileTypeUtils";
import dynamic from "next/dynamic";

// Dynamically import PDF viewer components to avoid SSR issues
const PDFViewer = dynamic(
  () => import("./PDFViewer"),
  { ssr: false }
);

// Dynamically import docx-preview to avoid SSR issues
// eslint-disable-next-line @typescript-eslint/no-require-imports
const renderAsync = typeof window !== "undefined" ? require("docx-preview").renderAsync : null;

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
  const docxContainerRef = useRef<HTMLDivElement>(null);
  const fileInfo = getFileTypeInfo(contentType);
  const [textContent, setTextContent] = useState<string>("");

  // --- Text File Logic ---
  useEffect(() => {
    if (isOpen && fileInfo.category === "text" && fileUrl) {
      const loadTextFile = async () => {
        try {
          const response = await fetch(fileUrl);
          const text = await response.text();
          setTextContent(text);
        } catch (error) {
          console.error("Error loading text file:", error);
          setTextContent("Error loading file");
        }
      };

      loadTextFile();
    }
  }, [isOpen, fileInfo.category, fileUrl]);

  // --- DOCX Logic ---
  useEffect(() => {
    if (
      isOpen &&
      fileInfo.category === "document" &&
      fileUrl &&
      docxContainerRef.current &&
      renderAsync
    ) {
      const loadDocument = async () => {
        try {
          const response = await fetch(fileUrl);
          const blob = await response.blob();
          if (docxContainerRef.current && renderAsync) {
            docxContainerRef.current.innerHTML = "";
            await renderAsync(blob, docxContainerRef.current, undefined, {
              className: "docx-preview-content",
              inWrapper: true,
              ignoreWidth: false,
              ignoreHeight: false,
              breakPages: true,
              renderHeaders: true,
              renderFooters: true,
              experimental: false,
            });
          }
        } catch (error) {
          console.error("Error loading DOCX:", error);
        }
      };

      loadDocument();
    }
  }, [isOpen, fileInfo.category, fileUrl]);

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
        return <PDFViewer fileUrl={fileUrl} />;

      case 'document':
        return (
          <div className="flex-1 flex flex-col bg-gray-100 min-h-0 relative">
            <div className="flex-1 overflow-auto w-full h-full bg-[#f3f4f6]">
               <div
                ref={docxContainerRef}
                className="w-full min-h-full p-4 sm:p-8 mx-auto"
              />
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="flex-1 flex flex-col bg-white min-h-0 overflow-hidden">
            <div className="flex-1 overflow-auto p-4 sm:p-8">
              <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap break-words">
                {textContent || "Loading..."}
              </pre>
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