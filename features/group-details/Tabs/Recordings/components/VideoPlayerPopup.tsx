"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface VideoPlayerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  recordingName: string;
}

function VideoPlayerPopup({
  isOpen,
  onClose,
  videoUrl,
  recordingName,
}: VideoPlayerPopupProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Pause video when closing
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Popup */}
      <div className="relative bg-black max-w-[90vw] max-h-[90vh] w-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-[16px] bg-gray-900 border-b border-gray-700">
          <h3 className="text-white text-[18px] truncate flex-1 mr-[16px]">
            {recordingName}
          </h3>
          <button
            onClick={onClose}
            className="shrink-0 hover:opacity-75 transition-opacity"
          >
            <Image src="/close.svg" alt="close" width={24} height={24} className="invert" />
          </button>
        </div>

        {/* Video Player */}
        <div className="flex-1 flex items-center justify-center bg-black">
          <video
            ref={videoRef}
            controls
            autoPlay
            className="w-full h-full max-h-[calc(90vh-60px)]"
            src={videoUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayerPopup;
