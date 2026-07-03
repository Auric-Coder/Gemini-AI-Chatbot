import express from 'express';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

// Initialize the Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * POST /api/chat
 * Receives a user message and returns a Gemini AI response.
 *
 * Request body:  { "message": "User prompt" }
 * Response body: { "reply": "Gemini response" }
 */
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Validate request body
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid request. Please provide a non-empty "message" field.',
      });
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set in environment variables.');
      return res.status(500).json({
        error: 'Server configuration error. API key is not configured.',
      });
    }

    // Call Gemini API using the latest stable Flash model
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: message.trim(),
    });

    const reply = response.text;

    // Validate we got a response
    if (!reply) {
      return res.status(500).json({
        error: 'Received an empty response from Gemini. Please try again.',
      });
    }

    res.json({ reply });
  } catch (error) {
    console.error('Error calling Gemini API:', error.message);

    // Handle specific error types
    if (error.status === 429) {
      return res.status(429).json({
        error: 'Rate limit exceeded. Please wait a moment and try again.',
      });
    }

    if (error.status === 403) {
      return res.status(403).json({
        error: 'Access denied. Please check your API key permissions.',
      });
    }

    res.status(500).json({
      error: 'Failed to get a response from Gemini. Please try again later.',
    });
  }
});

export default router;
