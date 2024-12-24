import React, { createContext, useContext, useState } from 'react';

const TranscriptionContext = createContext();

export const TranscriptionProvider = ({ children }) => {
  const [transcriptions, setTranscriptions] = useState([]);
  const [currentTranscription, setCurrentTranscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const value = {
    transcriptions,
    setTranscriptions,
    currentTranscription,
    setCurrentTranscription,
    loading,
    setLoading,
    error,
    setError,
  };

  return (
    <TranscriptionContext.Provider value={value}>
      {children}
    </TranscriptionContext.Provider>
  );
};

export const useTranscription = () => {
  const context = useContext(TranscriptionContext);
  if (!context) {
    throw new Error('useTranscription must be used within a TranscriptionProvider');
  }
  return context;
};
