export const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const validateVideoFile = (file) => {
  const maxSize = parseInt(import.meta.env.VITE_MAX_FILE_SIZE) || 100 * 1024 * 1024;
  const supportedFormats = import.meta.env.VITE_SUPPORTED_FORMATS?.split(',') || 
    ['video/mp4', 'video/webm', 'video/ogg'];

  if (!supportedFormats.includes(file.type)) {
    throw new Error('Invalid file type. Please upload a supported video format.');
  }

  if (file.size > maxSize) {
    throw new Error(`File size too large. Maximum size is ${formatFileSize(maxSize)}.`);
  }

  return true;
};
