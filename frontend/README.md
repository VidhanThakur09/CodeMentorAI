# CodeMentorAI: AI-Powered Educational Chatbot

This is a full-stack web application designed to be an AI-powered educational chatbot. It assists users with learning by providing information based on course materials, such as video transcripts.

## ✨ Features

- **Interactive Chatbot:** An AI-powered assistant that answers user questions based on a specific course's content.
- **Course Selection:** Users can switch between different courses (e.g., Node.js, Python) to tailor the chatbot's knowledge.
- **Transcript Management:** Users can upload subtitle files (`.srt`) to feed the AI with new information, effectively "teaching" it new courses.
- **Persistent Data:** The chatbot and transcript data are stored to provide a continuous learning experience.
- **Responsive UI:** A user-friendly, responsive interface built with React and Tailwind CSS.
- **Theme Toggle:** A dark/light mode toggle for a personalized user experience.

---

## 📦 Project Structure

The project is a monorepo with separate directories for the frontend and backend.

```
/codementorai/
├── /backend/
│   ├── /tools/
│   │   ├── compare.js
│   │   ├── compare2.js
│   │   ├── correcter.js
│   │   ├── generateSimilarQuery.js
│   │   ├── retriver.js
│   │   ├── subtitleLoader.js
│   │   └── Response_genrator.js
│   ├── /persona/
│   │   └── persona.js
│   ├── index.js
│   └── package.json
└── /frontend/
    ├── /src/
    │   ├── /components/
    │   │   ├── ChatBot.tsx
    │   │   ├── CourseSelector.tsx
    │   │   ├── Footer.tsx
    │   │   ├── Header.tsx
    │   │   └── ThemeToggle.tsx
    │   ├── /pages/
    │   │   ├── Index.tsx
    │   │   ├── NotFound.tsx
    │   │   └── Transcripts.tsx
    │   ├── App.tsx
    │   └── main.tsx
    └── package.json
```

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 🛠️ Prerequisites

- **Node.js**: The backend server is built with Node.js.
- **npm**: The Node Package Manager is used to install dependencies.
- **A Qdrant instance**: The backend uses Qdrant as a vector database. You will need a running instance of Qdrant.
- **API Keys**: You need API keys for Google's Gemini/Generative AI and OpenAI. These should be configured in your environment variables.

### ⚙️ Backend Setup

1.  **Navigate to the backend directory:**
    ```sh
    cd backend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Create a `.env` file** in the `backend` directory with the following variables:
    ```env
    PORT=3000
    GEMINI_API_KEY=your_google_gemini_api_key
    QDRANT_URL=your_qdrant_url
    QDRANT_API_KEY=your_qdrant_api_key
    ```

4.  **Run the server:**
    ```sh
    node index.js
    ```
    The backend server will start at `http://localhost:3000`.

### 🎨 Frontend Setup

1.  **Navigate to the frontend directory:**
    ```sh
    cd ../frontend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the frontend application:**
    ```sh
    npm run dev
    ```
    The application will be available in your browser, typically at `http://localhost:5173`.

---

## 📝 Usage

Once both the frontend and backend are running, you can use the application:

1.  **Upload Transcripts:** Navigate to the "Transcripts" page and upload `.srt` files. These files will be processed by the backend and used to train the AI.
2.  **Select a Course:** On the "Chat" page, select a course (e.g., Node.js or Python) to change the context of the chatbot.
3.  **Start Chatting:** Ask questions related to the selected course content, and the AI will provide a response based on the uploaded transcripts.

---

## 🙏 Acknowledgements

- This project leverages the power of **[Google's Gemini API](https://ai.google.dev/)** for its generative AI capabilities.
- **[LangChain](https://www.langchain.com/)** provides the framework for orchestrating the AI models and data retrieval.
- **[Qdrant](https://qdrant.tech/)** serves as the vector database for efficient semantic search.
- The front end is styled with **[Tailwind CSS](https://tailwindcss.com/)** and uses **[shadcn/ui](https://ui.shadcn.com/)** for its components.
