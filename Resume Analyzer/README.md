# AI Resume Analyzer

An application that uses AI to analyze resumes, extract key information, and provide feedback for improvement. Users can upload a PDF resume and receive a detailed, structured analysis powered by the Google Gemini API. Past analyses can be reviewed in a history viewer.

## Features

-   **PDF Resume Upload:** Simple drag-and-drop or file selection interface for uploading resumes.
-   **AI-Powered Analysis:** Leverages the Google Gemini API with a structured JSON schema for accurate and consistent data extraction.
-   **Comprehensive Data Extraction:** Pulls key details including:
    -   Contact Information (Name, Email, Phone, LinkedIn)
    -   Professional Summary
    -   Work Experience
    -   Education
    -   Technical and Soft Skills
    -   Projects & Certifications
-   **Actionable Feedback:**
    -   **Overall Rating:** A score from 1-10 to quickly assess the resume's quality.
    -   **Improvement Areas:** Constructive feedback on clarity, impact, and formatting.
    -   **Upskill Suggestions:** AI-generated recommendations for skills to enhance the candidate's profile.
-   **History Viewer:** Keeps a session-based history of all analyzed resumes, allowing for easy comparison and review.
-   **Modern & Responsive UI:** Built with React and Tailwind CSS for a clean, intuitive, and responsive user experience on all devices.

## Tech Stack

-   **Frontend:** React, TypeScript
-   **Styling:** Tailwind CSS
-   **AI Model:** Google Gemini API (`@google/genai`)
-   **PDF Parsing:** PDF.js (`pdfjs-dist`)
-   **Module Loading:** ES Modules with `importmap`

## How it Works

1.  **Upload:** The user uploads a resume in PDF format.
2.  **Parse:** The application uses the `pdf.js` library directly in the browser to parse the PDF file and extract its raw text content.
3.  **Analyze:** The extracted text is sent to the Google Gemini API. A detailed system instruction primes the model to act as an expert recruiter, and a strict `responseSchema` is provided to ensure the output is a structured JSON object.
4.  **Display:** The frontend receives the JSON data from the API and renders it into a detailed, easy-to-read analysis view with distinct sections for different resume components and AI feedback.
5.  **History:** The completed analysis is added to the application's state, making it available for viewing in the "History" tab for the duration of the user's session.

## Getting Started

This project is a static web application that communicates directly with the Google Gemini API from the client-side.

### Prerequisites

-   A modern web browser that supports ES Modules and `importmap`.
-   A local web server to serve the project files.

### Configuration

1.  **API Key:** The application requires a Google Gemini API key to function.
    -   This key must be provided to the application as an environment variable named `API_KEY`.
    -   The execution environment is responsible for making this variable accessible to the client-side JavaScript. The code expects to read it from `process.env.API_KEY`.

### Running the Application

1.  Place all project files (`index.html`, `index.tsx`, `components/`, etc.) in a single directory.
2.  Serve this directory with a local HTTP server. For example, if you have Python installed, you can run the following command from the project directory:
    ```bash
    # For Python 3
    python -m http.server
    ```
3.  Open your web browser and navigate to the address provided by the server (e.g., `http://localhost:8000`).
4.  The application should now be running.

## File Structure

```
.
├── README.md               # This file
├── index.html              # Main HTML entry point with importmap
├── index.tsx               # React application root
├── App.tsx                 # Main app component, handles tabbing
├── metadata.json           # Project metadata
├── types.ts                # TypeScript type definitions for the data
│
├── components/
│   ├── ResumeAnalyzer.tsx    # Handles file upload, parsing, and analysis triggering
│   ├── HistoryViewer.tsx     # Displays the list of past analyses
│   ├── ResumeDetails.tsx     # Renders the detailed analysis view
│   └── ui/                   # Reusable UI components (Button, Card, Modal, etc.)
│
└── services/
    └── geminiService.ts      # Logic for communicating with the Gemini API
```
