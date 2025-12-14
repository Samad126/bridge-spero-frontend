// Content type detection and handling utilities

export type FileCategory = 'video' | 'audio' | 'image' | 'pdf' | 'document' | 'text' | 'unsupported';

export interface FileTypeInfo {
  category: FileCategory;
  canStream: boolean;
  canPreview: boolean;
  icon: string;
  displayName: string;
}

// Map file extension to content type
export function getContentTypeFromPath(filePath: string): string {
  const extension = getFileExtension(filePath);

  // Video formats
  const videoFormats: Record<string, string> = {
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'ogg': 'video/ogg',
    'ogv': 'video/ogg',
    'avi': 'video/x-msvideo',
    'mov': 'video/quicktime',
    'wmv': 'video/x-ms-wmv',
    'flv': 'video/x-flv',
    'mkv': 'video/x-matroska',
    'm4v': 'video/x-m4v',
    '3gp': 'video/3gpp',
  };

  // Audio formats
  const audioFormats: Record<string, string> = {
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'ogg': 'audio/ogg',
    'oga': 'audio/ogg',
    'm4a': 'audio/mp4',
    'flac': 'audio/flac',
    'aac': 'audio/aac',
    'wma': 'audio/x-ms-wma',
  };

  // Image formats
  const imageFormats: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    'bmp': 'image/bmp',
    'ico': 'image/x-icon',
  };

  // Document formats
  const documentFormats: Record<string, string> = {
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  };

  // Text formats
  const textFormats: Record<string, string> = {
    'txt': 'text/plain',
    'csv': 'text/csv',
    'json': 'application/json',
    'xml': 'application/xml',
  };

  if (videoFormats[extension]) return videoFormats[extension];
  if (audioFormats[extension]) return audioFormats[extension];
  if (imageFormats[extension]) return imageFormats[extension];
  if (documentFormats[extension]) return documentFormats[extension];
  if (textFormats[extension]) return textFormats[extension];

  return 'application/octet-stream';
}

export function getFileTypeInfo(contentType: string): FileTypeInfo {
  const lowerType = contentType.toLowerCase();

  // Videos - can stream (all formats)
  if (lowerType.startsWith('video/')) {
    return {
      category: 'video',
      canStream: true,
      canPreview: true,
      icon: '/video.svg',
      displayName: 'Video',
    };
  }

  // Audio - can stream (all formats)
  if (lowerType.startsWith('audio/')) {
    return {
      category: 'audio',
      canStream: true,
      canPreview: true,
      icon: '/audio.svg',
      displayName: 'Audio',
    };
  }

  // Images - can preview (all formats)
  if (lowerType.startsWith('image/')) {
    return {
      category: 'image',
      canStream: true,
      canPreview: true,
      icon: '/image.svg',
      displayName: 'Image',
    };
  }

  // PDFs - can stream and preview
  if (lowerType === 'application/pdf') {
    return {
      category: 'pdf',
      canStream: true,
      canPreview: true,
      icon: '/file-text.svg',
      displayName: 'PDF',
    };
  }

  // Documents - can preview with docx-preview
  if (
    lowerType.includes('word') ||
    lowerType === 'application/msword' ||
    lowerType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    lowerType.includes('excel') ||
    lowerType === 'application/vnd.ms-excel' ||
    lowerType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    return {
      category: 'document',
      canStream: true,
      canPreview: true,
      icon: '/file-text.svg',
      displayName: 'Document',
    };
  }

  // Text files - can preview
  if (lowerType.startsWith('text/') || lowerType === 'application/json' || lowerType === 'application/xml') {
    return {
      category: 'text',
      canStream: true,
      canPreview: true,
      icon: '/file-text.svg',
      displayName: 'Text',
    };
  }

  // Unsupported
  return {
    category: 'unsupported',
    canStream: false,
    canPreview: false,
    icon: '/file-text.svg',
    displayName: 'File',
  };
}

export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
}
