"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  useUploadRecordingMutation,
  useLazyGetResourceDownloadQuery
} from "@/features/group-details/api/groupDetailsApi";
import { RecordingItem } from "@/features/group-details/types/groupDetailsTypes";
import DownloadWatchModal from "./DownloadWatchModal";
import VideoPlayerPopup from "./VideoPlayerPopup";

interface RecordingCardProps {
  cardStatus: "view" | "add";
  recording?: RecordingItem;
  groupId: number;
  isTeacher: boolean;
}

function RecordingCard({
  cardStatus,
  recording,
  groupId,
  isTeacher,
}: RecordingCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [recordingName, setRecordingName] = useState("");
  const [uploadRecording, { isLoading: isUploading }] =
    useUploadRecordingMutation();
  const [triggerDownload, { isLoading: isDownloading }] =
    useLazyGetResourceDownloadQuery();
  const [showModal, setShowModal] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Store the file in state
    setSelectedFile(file);
  };

  const handleAddClick = () => {
    setIsAddMode(true);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      alert("No file selected. Please try again.");
      return;
    }

    console.log("Starting upload:", {
      groupId,
      fileName: selectedFile.name,
      recordingName,
    });

    try {
      const result = await uploadRecording({
        groupId,
        file: selectedFile,
        name: recordingName.trim() || undefined,
      }).unwrap();

      console.log("Upload successful:", result);

      // Reset state
      setIsAddMode(false);
      setSelectedFile(null);
      setRecordingName("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Failed to upload recording:", error);
      alert("Failed to upload recording. Please try again.");
    }
  };

  const handleCancelUpload = () => {
    setIsAddMode(false);
    setSelectedFile(null);
    setRecordingName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRecordingClick = () => {
    setShowModal(true);
  };

  const handleDownload = async () => {
    if (!recording?.id) return;

    try {
      // Use RTK Query to fetch the file blob with authentication
      const blob = await triggerDownload(recording.id).unwrap();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = recording.name || recording.path.split("/").pop() || "recording";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download recording:", error);
      alert("Failed to download recording. Please try again.");
    } finally {
      setShowModal(false);
    }
  };

  const handleWatch = () => {
    setShowModal(false);
    setShowVideoPlayer(true);
  };

  const getStreamUrl = () => {
    if (!recording?.id) return "";
    return `/api/resources/${recording.id}?download=false`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const isLoading = isUploading || isDownloading;

  // Add mode with input form
  if (cardStatus === "add" && isTeacher && isAddMode) {
    return (
      <div className="border border-gray-light p-[24px]">
        <div className="flex flex-col gap-[16px]">
          {/* Name Input Row */}
          <div className="flex items-center gap-[12px]">
            <input
              type="text"
              value={recordingName}
              onChange={(e) => setRecordingName(e.target.value)}
              placeholder="Recording name (optional)"
              className="w-full flex-1 border-b border-secondary outline-0 text-[16px] p-[8px]"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={handleUpload}
              className="disabled:opacity-50"
              disabled={isLoading || !selectedFile}
            >
              <Image src={"/check.svg"} alt="confirm" width={22} height={22} />
            </button>
          </div>

          {/* File Input Row */}
          <div className="flex items-center gap-[12px]">
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*,audio/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isLoading}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 border border-gray-light p-[12px] text-left disabled:opacity-50"
              disabled={isLoading}
            >
              <span className="text-[16px]">
                {selectedFile ? selectedFile.name : "Choose file..."}
              </span>
            </button>
            <button
              type="button"
              onClick={handleCancelUpload}
              className="disabled:opacity-50"
              disabled={isLoading}
            >
              <Image src={"/close.svg"} alt="cancel" width={22} height={22} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="border border-gray-light flex items-center w-full">
        {cardStatus === "view" && recording && (
          <div className="p-[24px] flex items-center justify-between w-full">
            <button
              onClick={handleRecordingClick}
              className="w-full flex items-center gap-[12px]"
              disabled={isLoading}
            >
              <Image
                src={"/download.svg"}
                alt="download"
                width={32}
                height={32}
                className="w-[32px] h-[32px]"
              />
              <div className="flex flex-col items-start">
                <p className="text-[20px]">
                  {recording.name || formatDate(recording.createdAt)}
                </p>
                {recording.name && (
                  <span className="text-[14px] text-gray-500">
                    {formatDate(recording.createdAt)}
                  </span>
                )}
              </div>
            </button>
          </div>
        )}
        {cardStatus === "add" && isTeacher && !isAddMode && (
          <button
            onClick={handleAddClick}
            className="p-[24px] flex gap-[12px] w-full h-full items-center disabled:opacity-50"
            disabled={isLoading}
          >
            <Image src={"/plus.svg"} alt="plus" width={22} height={22} />
            <span className="text-[20px]">Add</span>
          </button>
        )}
      </div>

      {/* Download/Watch Modal */}
      {recording && (
        <>
          <DownloadWatchModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onDownload={handleDownload}
            onWatch={handleWatch}
            recordingName={recording.name || formatDate(recording.createdAt)}
            isDownloading={isDownloading}
          />

          {/* Video Player Popup */}
          <VideoPlayerPopup
            isOpen={showVideoPlayer}
            onClose={() => setShowVideoPlayer(false)}
            videoUrl={getStreamUrl()}
            recordingName={recording.name || formatDate(recording.createdAt)}
          />
        </>
      )}
    </>
  );
}

export default RecordingCard;
