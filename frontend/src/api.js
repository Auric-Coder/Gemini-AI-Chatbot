import axios from 'axios';

/**
 * Axios instance configured for the chat API.
 * In development, Vite proxy forwards /api to the backend.
 * In production, update baseURL to your deployed backend URL.
 */
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

/**
 * Send a message to the Gemini AI backend.
 * @param {string} message - The user's message
 * @returns {Promise<string>} The AI's reply text
 */
export const sendMessage = async (message) => {
  try {
    const response = await api.post('/chat', { message });
    return response.data.reply;
  } catch (error) {
    // Extract meaningful error message
    if (error.response) {
      // Server responded with an error status
      throw new Error(
        error.response.data?.error || `Server error (${error.response.status})`
      );
    } else if (error.request) {
      // Request was made but no response received
      throw new Error(
        'Unable to reach the server. Please check your connection.'
      );
    } else {
      // Something else went wrong
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
};

export default api;
