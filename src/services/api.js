import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const uploadVideo = async (formData, onProgress) => {
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgress(percentCompleted);
    },
  });
  return response.data;
};

export const getTranscriptions = async () => {
  const response = await api.get('/transcriptions');
  return response.data;
};

export const deleteTranscription = async (id) => {
  const response = await api.delete(`/transcriptions/${id}`);
  return response.data;
};

export const getTranscriptionDetails = async (id) => {
  const response = await api.get(`/transcriptions/${id}`);
  return response.data;
};

export default api;
