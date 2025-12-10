"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  useUploadSyllabusMutation,
  useDeleteSyllabusMutation,
} from "@/features/group-details/api/groupDetailsApi";
import FileActionModal from "@/features/group-details/Tabs/components/FileViewer/FileActionModal";
import FilePreviewPopup from "@/features/group-details/Tabs/components/FileViewer/FilePreviewPopup";

interface SyllabusCardProps {
  cardStatus: "view" | "add";
  syllabusPath?: string | null;
  groupId: number;
  isTeacher: boolean;
}

function SyllabusCard({ cardStatus, syllabusPath, groupId, isTeacher }: SyllabusCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadSyllabus, { isLoading: isUploading }] = useUploadSyllabusMutation();
  const [deleteSyllabus, { isLoading: isDeleting }] = useDeleteSyllabusMutation();
  const [showActionModal, setShowActionModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    try {
      await uploadSyllabus({ groupId, file }).unwrap();
    } catch (error) {
      console.error("Failed to upload syllabus:", error);
      alert("Failed to upload syllabus. Please try again.");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this syllabus?")) {
      return;
    }

    try {
      await deleteSyllabus(groupId).unwrap();
    } catch (error) {
      console.error("Failed to delete syllabus:", error);
      alert("Failed to delete syllabus. Please try again.");
    }
  };

  const handleSyllabusClick = () => {
    setShowActionModal(true);
  };

  const handleDownload = () => {
    if (!syllabusPath) return;

    const link = document.createElement("a");
    link.href = syllabusPath;
    link.download = syllabusPath.split("/").pop() || "syllabus.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowActionModal(false);
  };

  const handlePreview = () => {
    setShowActionModal(false);
    setShowPreview(true);
  };

  const isLoading = isUploading || isDeleting;

  return (
    <>
      <div className="border border-gray-light w-full">
        {cardStatus === "view" && syllabusPath && (
          <div className="p-[24px] flex items-center justify-between w-full">
            <button
              onClick={handleSyllabusClick}
              className="w-full flex items-center gap-[12px]"
              disabled={isLoading}
            >
              <Image
                src={"/file-text.svg"}
                alt="file text"
                width={32}
                height={32}
                className="w-[32px] h-[32px]"
              />
              <p className="text-[20px]">Syllabus</p>
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
              accept="application/pdf"
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
              <span className="text-[20px]">{isLoading ? "Uploading..." : "Add"}</span>
            </button>
          </>
        )}
      </div>

      {/* File Action Modal */}
      {syllabusPath && (
        <>
          <FileActionModal
            isOpen={showActionModal}
            onClose={() => setShowActionModal(false)}
            onDownload={handleDownload}
            onPreview={handlePreview}
            fileName="Syllabus"
            contentType="application/pdf"
            isDownloading={false}
          />

          {/* File Preview Popup */}
          <FilePreviewPopup
            isOpen={showPreview}
            onClose={() => setShowPreview(false)}
            fileUrl={syllabusPath}
            fileName="Syllabus"
            contentType="application/pdf"
          />
        </>
      )}
    </>
  );
}

export default SyllabusCard;
