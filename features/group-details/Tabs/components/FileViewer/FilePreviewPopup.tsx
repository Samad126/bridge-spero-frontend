"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { getFileTypeInfo } from "@/features/group-details/Tabs/utils/fileTypeUtils";

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
  const fileInfo = getFileTypeInfo(contentType);

  useEffect(() => {
    // Pause media when closing
    if (!isOpen && mediaRef.current) {
      if ('pause' in mediaRef.current) {
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
            <img
              src={fileUrl}
              alt={fileName}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        );

      case 'pdf':
        return (
          <div className="flex-1 bg-gray-100">
            <iframe
              src={fileUrl}
              className="w-full h-full"
              title={fileName}
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
      <div className="relative bg-black max-w-[90vw] max-h-[90vh] w-full flex flex-col">
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
