"use client";

import Image from "next/image";
import { getFileTypeInfo } from "@/features/group-details/Tabs/utils/fileTypeUtils";

interface FileActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  onPreview: () => void;
  fileName: string;
  contentType: string;
  // isDownloading: boolean;
}

function FileActionModal({
  isOpen,
  onClose,
  onDownload,
  onPreview,
  fileName,
  contentType,
  // isDownloading,
}: FileActionModalProps) {
  if (!isOpen) return null;

  const fileInfo = getFileTypeInfo(contentType);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white p-[32px] max-w-[500px] w-full mx-[16px] border border-gray-light">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-[16px] right-[16px]">
          <Image src="/close.svg" alt="close" width={22} height={22} />
        </button>

        {/* Content */}
        <div className="flex flex-col gap-[24px]">
          <h2 className="text-[24px] font-medium">Choose an option</h2>

          <p className="text-[16px] text-gray-600">
            How would you like to open: {fileName}?
          </p>

          <div className="flex flex-col gap-[12px]">
            {/* Preview in Browser button - only if supported */}
            {fileInfo.canPreview ? (
              <button
                onClick={onPreview}
                className="w-full border border-gray-light p-[16px] flex items-center gap-[12px] hover:bg-gray-50 transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span className="text-[18px]">Open in Browser</span>
              </button>
            ) : (
              <div className="w-full border border-gray-200 bg-gray-50 p-[16px] flex items-center gap-[12px] text-gray-500">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span className="text-[16px]">
                  Cannot preview this file in browser
                </span>
              </div>
            )}

            {/* Download button */}
            <button
              onClick={onDownload}
              // disabled={isDownloading}
              className="w-full border border-gray-light p-[16px] flex items-center gap-[12px] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Image src="/download.svg" alt="download" width={24} height={24} />
              <span className="text-[18px]">
                Download {fileInfo.displayName}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileActionModal;
