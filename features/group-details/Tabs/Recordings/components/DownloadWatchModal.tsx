"use client";

import Image from "next/image";

interface DownloadWatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  onWatch: () => void;
  recordingName: string;
  isDownloading: boolean;
}

function DownloadWatchModal({
  isOpen,
  onClose,
  onDownload,
  onWatch,
  recordingName,
  isDownloading,
}: DownloadWatchModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white p-[32px] max-w-[500px] w-full mx-[16px] border border-gray-light">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-[16px] right-[16px]"
        >
          <Image src="/close.svg" alt="close" width={22} height={22} />
        </button>

        {/* Content */}
        <div className="flex flex-col gap-[24px]">
          <h2 className="text-[24px] font-medium">
            Choose an option
          </h2>

          <p className="text-[16px] text-gray-600">
            How would you like to view: {recordingName}?
          </p>

          <div className="flex flex-col gap-[12px]">
            {/* Watch in Browser button */}
            <button
              onClick={onWatch}
              className="w-full border border-gray-light p-[16px] flex items-center gap-[12px] hover:bg-gray-50 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5v14l11-7L8 5z" fill="currentColor"/>
              </svg>
              <span className="text-[18px]">Watch in Browser</span>
            </button>

            {/* Download button */}
            <button
              onClick={onDownload}
              disabled={isDownloading}
              className="w-full border border-gray-light p-[16px] flex items-center gap-[12px] hover:bg-gray-50 transition-colors"
            >
              <Image src="/download.svg" alt="download" width={24} height={24} />
              <span className="text-[18px]">
                {isDownloading ? "Downloading..." : "Download Video"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadWatchModal;
