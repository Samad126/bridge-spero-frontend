"use client";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { useEffect, useState } from "react";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface PDFViewerProps {
  fileUrl: string;
}

function PDFViewer({ fileUrl }: PDFViewerProps) {
  // Create default layout plugin instance for PDF viewer
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfData, setPdfData] = useState<Uint8Array | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchPDFWithStreaming = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(fileUrl, { credentials: "include" });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("Response body is not readable");
        }

        const contentLength = response.headers.get("Content-Length");
        const total = contentLength ? parseInt(contentLength, 10) : 0;

        let receivedLength = 0;
        const chunks: Uint8Array[] = [];

        // Stream the data in chunks
        while (true) {
          const { done, value } = await reader.read();

          if (done || isCancelled) break;

          chunks.push(value);
          receivedLength += value.length;

          // Optional: Update progress
          if (total > 0) {
            const progress = (receivedLength / total) * 100;
            console.log(`PDF Download Progress: ${progress.toFixed(2)}%`);
          }
        }

        if (!isCancelled) {
          // Combine all chunks into a single Uint8Array
          const allChunks = new Uint8Array(receivedLength);
          let position = 0;
          for (const chunk of chunks) {
            allChunks.set(chunk, position);
            position += chunk.length;
          }

          setPdfData(allChunks);
          setLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Error loading PDF:", err);
          setError(err instanceof Error ? err.message : "Failed to load PDF");
          setLoading(false);
        }
      }
    };

    fetchPDFWithStreaming();

    return () => {
      isCancelled = true;
    };
  }, [fileUrl]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading PDF...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-center text-red-600">
          <p>Error loading PDF: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-100 min-h-0 overflow-hidden">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <div className="flex-1 overflow-auto">
          {pdfData && (
            <Viewer
              fileUrl={pdfData}
              plugins={[defaultLayoutPluginInstance]}
            />
          )}
        </div>
      </Worker>
    </div>
  );
}

export default PDFViewer;
