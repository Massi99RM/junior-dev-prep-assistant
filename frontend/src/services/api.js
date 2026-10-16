import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

export const getTopics = async () => {
  const response = await api.get('/api/topics');
  return response.data;
};

export const sendMessage = async (message, conversationHistory = []) => {
  const response = await api.post('/api/chat', {
    message,
    conversation_history: conversationHistory,
  });
  return response.data;
};

export const getConfig = async () => {
  const response = await api.get('/api/config');
  return response.data;
};