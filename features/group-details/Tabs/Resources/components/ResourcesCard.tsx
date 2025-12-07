"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useUploadResourceMutation, useDeleteResourceMutation } from "@/features/group-details/api/groupDetailsApi";
import { ResourceItem } from "@/features/group-details/types/groupDetailsTypes";

interface ResourcesCardProps {
  cardStatus: "view" | "add";
  resource?: ResourceItem;
  groupId: number;
  isTeacher: boolean;
}

function ResourcesCard({
  cardStatus,
  resource,
  groupId,
  isTeacher,
}: ResourcesCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resourceName, setResourceName] = useState("");
  const [uploadResource, { isLoading: isUploading }] =
    useUploadResourceMutation();
  const [deleteResource, { isLoading: isDeleting }] =
    useDeleteResourceMutation();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
      resourceName,
    });

    try {
      const result = await uploadResource({
        groupId,
        file: selectedFile,
        name: resourceName.trim() || undefined,
      }).unwrap();

      console.log("Upload successful:", result);

      setIsAddMode(false);
      setSelectedFile(null);
      setResourceName("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Failed to upload resource:", error);
      alert("Failed to upload resource. Please try again.");
    }
  };

  const handleCancelUpload = () => {
    setIsAddMode(false);
    setSelectedFile(null);
    setResourceName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDownload = () => {
    if (!resource?.path) return;

    const link = document.createElement("a");
    link.href = resource.path;
    link.download =
      resource.name || resource.path.split("/").pop() || "resource";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async () => {
    if (!resource?.id) return;

    if (!confirm("Are you sure you want to delete this resource?")) {
      return;
    }

    try {
      await deleteResource({
        groupId,
        resourceId: resource.id,
      }).unwrap();

      console.log("Delete successful");
    } catch (error) {
      console.error("Failed to delete resource:", error);
      alert("Failed to delete resource. Please try again.");
    }
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

  if (cardStatus === "add" && isTeacher && isAddMode) {
    return (
      <div className="border border-gray-light p-[24px]">
        <div className="flex flex-col gap-[16px]">
          <div className="flex items-center gap-[12px]">
            <input
              type="text"
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
              placeholder="Resource name (optional)"
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

          <div className="flex items-center gap-[12px]">
            <input
              ref={fileInputRef}
              type="file"
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
    <div className="border border-gray-light flex items-center w-full">
      {cardStatus === "view" && resource && (
        <div className="p-[24px] flex items-center justify-between w-full">
          <button
            onClick={handleDownload}
            className="flex items-center gap-[12px]"
            disabled={isLoading}
          >
            <Image
              src={"/file-text.svg"}
              alt="file text"
              width={32}
              height={32}
              className="w-[32px] h-[32px]"
            />
            <div className="flex flex-col items-start">
              <p className="text-[20px]">
                {resource.name || formatDate(resource.createdAt)}
              </p>
              {resource.name && (
                <span className="text-[14px] text-gray-500">
                  {formatDate(resource.createdAt)}
                </span>
              )}
            </div>
          </button>
          {isTeacher && (
            <button
              onClick={handleDelete}
              className="disabled:opacity-50"
              disabled={isLoading}
            >
              <Image src={"/trash-2.svg"} alt="delete" width={22} height={22} />
            </button>
          )}
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
  );
}
export default ResourcesCard;
