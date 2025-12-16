"use client";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface PDFViewerProps {
  fileUrl: string;
}

function PDFViewer({ fileUrl }: PDFViewerProps) {
  // Create default layout plugin instance for PDF viewer
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="flex-1 flex flex-col bg-gray-100 min-h-0 overflow-hidden">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <div className="flex-1 overflow-auto">
          <Viewer
            fileUrl={fileUrl}
            httpHeaders={{
              credentials: 'include',
            }}
            withCredentials={true}
            plugins={[defaultLayoutPluginInstance]}
          />
        </div>
      </Worker>
    </div>
  );
}

export default PDFViewer;
