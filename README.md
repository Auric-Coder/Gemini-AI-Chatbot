# 🤖 Gemini Chat — AI Chatbot

A modern, full-stack AI chatbot web application powered by **Google Gemini**. Built with React, Tailwind CSS, and Express.js, featuring a sleek ChatGPT-inspired interface with dark mode, markdown rendering, and code syntax highlighting.

![Gemini Chat Preview](https://via.placeholder.com/800x450?text=Gemini+Chat+Preview)

---

## ✨ Features

### Core
- 💬 **Real-time AI Chat** — Powered by Google Gemini 2.0 Flash
- 🎨 **Dark & Light Mode** — Toggle with smooth transitions
- 📝 **Markdown Rendering** — Full support for headings, lists, tables, links, and more
- 💻 **Code Syntax Highlighting** — Beautiful code blocks with language detection
- 📋 **Copy Responses** — One-click copy for any AI message or code block
- 💾 **Chat Persistence** — Messages saved to localStorage across sessions
- 📱 **Responsive Design** — Works beautifully on desktop, tablet, and mobile

### UI/UX
- 🌟 **Welcome Screen** — Suggested prompts to get started
- ⌨️ **Smart Input** — Enter to send, Shift+Enter for new lines
- ⏳ **Typing Indicator** — Animated "thinking" animation
- 🗑️ **Clear Chat** — Confirmation dialog to prevent accidents
- 🔔 **Toast Notifications** — Success and error feedback
- ✨ **Glassmorphism Design** — Modern, premium aesthetic
- 🎭 **Smooth Animations** — Polished transitions throughout

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 6, Tailwind CSS v4 |
| **Backend** | Node.js, Express 5 |
| **AI** | Google Gemini (`@google/genai` SDK) |
| **Markdown** | react-markdown, remark-gfm |
| **Syntax Highlighting** | react-syntax-highlighter (Prism) |
| **HTTP Client** | Axios |
| **Icons** | Lucide React |
| **Notifications** | react-hot-toast |
| **Font** | Inter (Google Fonts) |

---

## 📁 Project Structure

```
gemini-chatbot/
│
├── backend/
│   ├── server.js           # Express server entry point
│   ├── package.json
│   ├── .env.example        # Environment variables template
│   └── routes/
│       └── chat.js         # POST /api/chat endpoint
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Top navigation bar
│   │   │   ├── ChatContainer.jsx   # Scrollable message area
│   │   │   ├── ChatMessage.jsx     # Individual message bubble
│   │   │   ├── MessageInput.jsx    # Text input + send button
│   │   │   ├── LoadingIndicator.jsx# Typing animation
│   │   │   ├── WelcomeScreen.jsx   # Empty state with suggestions
│   │   │   ├── CodeBlock.jsx       # Syntax-highlighted code
│   │   │   └── ConfirmDialog.jsx   # Confirmation modal
│   │   ├── api.js           # Axios API client
│   │   ├── App.jsx          # Root component
│   │   ├── main.jsx         # React entry point
│   │   └── index.css        # Global styles & design system
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ ([download](https://nodejs.org/))
- **npm** v9+
- **Google Gemini API Key** ([get one here](https://aistudio.google.com/apikey))

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/gemini-chatbot.git
cd gemini-chatbot
```

### 2. Setup the Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create your environment file
cp .env.example .env

# Edit .env and add your Gemini API key
# GEMINI_API_KEY=your_actual_api_key_here

# Start the backend server
npm run dev
```

The backend will start on `http://localhost:5000`.

### 3. Setup the Frontend

```bash
# Open a new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:5173`.

### 4. Open the App

Navigate to `http://localhost:5173` in your browser and start chatting with Gemini! 🎉

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | ✅ Yes |
| `PORT` | Server port (default: 5000) | ❌ No |

> ⚠️ **Important:** Never commit your `.env` file. The API key stays on the server and is never exposed to the frontend.

---

## 🌐 Deployment

### Frontend → Vercel

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Set the **Root Directory** to `frontend`
4. Set **Build Command** to `npm run build`
5. Set **Output Directory** to `dist`
6. Update the API base URL in `src/api.js` to point to your deployed backend

### Backend → Render

1. Create a new **Web Service** on [Render](https://render.com)
2. Set the **Root Directory** to `backend`
3. Set **Build Command** to `npm install`
4. Set **Start Command** to `npm start`
5. Add `GEMINI_API_KEY` as an environment variable
6. Update CORS settings in `server.js` to allow your Vercel domain

### Production CORS Configuration

Update `backend/server.js` for production:

```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.vercel.app'
}));
```

---

## 📸 Screenshots

| Dark Mode | Light Mode |
|-----------|------------|
| ![Dark Mode](https://via.placeholder.com/400x300?text=Dark+Mode) | ![Light Mode](https://via.placeholder.com/400x300?text=Light+Mode) |

| Mobile View | Code Highlighting |
|-------------|-------------------|
| ![Mobile](https://via.placeholder.com/200x400?text=Mobile) | ![Code](https://via.placeholder.com/400x300?text=Code+Blocks) |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Google Gemini](https://ai.google.dev/) — AI model powering the chatbot
- [React](https://react.dev/) — UI library
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Vite](https://vite.dev/) — Build tool
- [Lucide](https://lucide.dev/) — Beautiful icons

---

<p align="center">
  Made with ❤️ and Gemini AI
</p>
