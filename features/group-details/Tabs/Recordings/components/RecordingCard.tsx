"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  useUploadRecordingMutation,
  useDeleteRecordingMutation,
} from "@/features/group-details/api/groupDetailsApi";
import { RecordingItem } from "@/features/group-details/types/groupDetailsTypes";

interface RecordingCardProps {
  cardStatus: "view" | "add";
  recording?: RecordingItem;
  groupId: number;
  isTeacher: boolean;
}

function RecordingCard({ cardStatus, recording, groupId, isTeacher }: RecordingCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showNameInput, setShowNameInput] = useState(false);
  const [recordingName, setRecordingName] = useState("");
  const [uploadRecording, { isLoading: isUploading }] = useUploadRecordingMutation();
  const [deleteRecording, { isLoading: isDeleting }] = useDeleteRecordingMutation();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show name input dialog
    setShowNameInput(true);
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    try {
      await uploadRecording({
        groupId,
        file,
        name: recordingName.trim() || undefined
      }).unwrap();

      // Reset state
      setShowNameInput(false);
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
    setShowNameInput(false);
    setRecordingName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = async () => {
    if (!recording) return;

    if (!confirm("Are you sure you want to delete this recording?")) {
      return;
    }

    try {
      await deleteRecording({ groupId, recordingId: recording.id }).unwrap();
    } catch (error) {
      console.error("Failed to delete recording:", error);
      alert("Failed to delete recording. Please try again.");
    }
  };

  const handleDownload = () => {
    if (!recording?.path) return;

    const link = document.createElement("a");
    link.href = recording.path;
    link.download = recording.name || recording.path.split("/").pop() || "recording";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const isLoading = isUploading || isDeleting;

  if (showNameInput) {
    return (
      <div className="border border-gray-light p-[24px]">
        <div className="flex flex-col gap-[12px]">
          <input
            type="text"
            value={recordingName}
            onChange={(e) => setRecordingName(e.target.value)}
            placeholder="Recording name (optional)"
            className="border-b border-secondary outline-0 text-[16px] p-[8px]"
            disabled={isLoading}
          />
          <div className="flex gap-[12px] justify-end">
            <button
              onClick={handleCancelUpload}
              className="px-[16px] py-[8px] border border-gray-light disabled:opacity-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              className="px-[16px] py-[8px] bg-secondary text-white disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-light w-full">
      {cardStatus === "view" && recording && (
        <div className="p-[24px] flex items-center justify-between w-full">
          <button
            onClick={handleDownload}
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
              <p className="text-[20px]">{recording.name || formatDate(recording.createdAt)}</p>
              {recording.name && (
                <span className="text-[14px] text-gray-500">{formatDate(recording.createdAt)}</span>
              )}
            </div>
          </button>
          {isTeacher && (
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="disabled:opacity-50"
            >
              <Image src={"/trash-2.svg"} alt="delete" width={22} height={22} />
            </button>
          )}
        </div>
      )}
      {cardStatus === "add" && isTeacher && (
        <>
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
            className="p-[24px] flex gap-[12px] w-full h-full items-center disabled:opacity-50"
            disabled={isLoading}
          >
            <Image src={"/plus.svg"} alt="plus" width={22} height={22} />
            <span className="text-[20px]">Add</span>
          </button>
        </>
      )}
    </div>
  );
}

export default RecordingCard;
