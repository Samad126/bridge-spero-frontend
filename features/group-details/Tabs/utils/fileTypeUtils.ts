// Content type detection and handling utilities

export type FileCategory = 'video' | 'audio' | 'image' | 'pdf' | 'document' | 'unsupported';

export interface FileTypeInfo {
  category: FileCategory;
  canStream: boolean;
  canPreview: boolean;
  icon: string;
  displayName: string;
}

export function getFileTypeInfo(contentType: string): FileTypeInfo {
  const lowerType = contentType.toLowerCase();

  // Videos - can stream
  if (lowerType.startsWith('video/')) {
    return {
      category: 'video',
      canStream: true,
      canPreview: true,
      icon: '/video.svg',
      displayName: 'Video',
    };
  }

  // Audio - can stream
  if (lowerType.startsWith('audio/')) {
    return {
      category: 'audio',
      canStream: true,
      canPreview: true,
      icon: '/audio.svg',
      displayName: 'Audio',
    };
  }

  // Images - can preview
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
    lowerType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return {
      category: 'document',
      canStream: true,
      canPreview: true,
      icon: '/file-text.svg',
      displayName: 'Document',
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
