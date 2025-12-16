import { useState } from "react";

export interface FileItem {
  id: number;
  name: string;
  path?: string;
  contentType: string;
  createdAt?: string;
}

export function useFileViewer() {
  const [showActionModal, setShowActionModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [currentFile, setCurrentFile] = useState<FileItem | null>(null);

  const openFile = (file: FileItem) => {
    setCurrentFile(file);
    setShowActionModal(true);
  };

  const handleDownload = () => {
    if (!currentFile?.id) return;

    try {
      // Direct download using the streaming endpoint with download=true
      // This avoids loading the entire file into browser memory
      const link = document.createElement("a");
      link.href = `${process.env.NEXT_PUBLIC_API_URL}/resources/${currentFile.id}?download=true`;
      link.download =
        currentFile.name || currentFile.path?.split("/").pop() || "file";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download file:", error);
      alert("Failed to download file. Please try again.");
    } finally {
      setShowActionModal(false);
    }
  };

  const handlePreview = () => {
    setShowActionModal(false);
    setShowPreview(true);
  };

  const closeAll = () => {
    setShowActionModal(false);
    setShowPreview(false);
    setCurrentFile(null);
  };

  const getStreamUrl = () => {
    if (!currentFile?.id) return "";
    return `${process.env.NEXT_PUBLIC_API_URL}/resources/${currentFile.id}?download=false`;
  };

  return {
    showActionModal,
    showPreview,
    currentFile,
    openFile,
    handleDownload,
    handlePreview,
    closeAll,
    getStreamUrl,
    closeActionModal: () => setShowActionModal(false),
    closePreview: () => setShowPreview(false),
  };
}
