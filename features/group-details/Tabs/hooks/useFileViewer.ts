import { useState } from "react";
import { useLazyGetResourceDownloadQuery } from "@/features/group-details/api/groupDetailsApi";

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
  const [triggerDownload, { isLoading: isDownloading }] =
    useLazyGetResourceDownloadQuery();

  const openFile = (file: FileItem) => {
    setCurrentFile(file);
    setShowActionModal(true);
  };

  const handleDownload = async () => {
    if (!currentFile?.id) return;

    try {
      // Use RTK Query to fetch the file blob with authentication
      const blob = await triggerDownload(currentFile.id).unwrap();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download =
        currentFile.name || currentFile.path?.split("/").pop() || "file";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
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
    return `/api/resources/${currentFile.id}?download=false`;
  };

  return {
    showActionModal,
    showPreview,
    currentFile,
    isDownloading,
    openFile,
    handleDownload,
    handlePreview,
    closeAll,
    getStreamUrl,
    closeActionModal: () => setShowActionModal(false),
    closePreview: () => setShowPreview(false),
  };
}
