# Resume Analyzer

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
-   **Modern & Responsive UI:** Built with React and TypeScript for a clean, intuitive, and responsive user experience on all devices.

## Tech Stack

-   **Frontend:** React, TypeScript
-   **Styling:** Tailwind CSS
-   **AI Model:** Google Gemini API (`@google/genai`)
-   **PDF Parsing:** PDF.js (`pdfjs-dist`)
-   **Deployment:** GitHub Actions & GitHub Pages

## How it Works

1.  **Upload:** The user uploads a resume in PDF format.
2.  **Parse:** The application uses the `pdf.js` library directly in the browser to parse the PDF file and extract its raw text content.
3.  **Analyze:** The extracted text is sent to the Google Gemini API. A detailed system instruction primes the model to act as an expert recruiter, and a strict `responseSchema` is provided to ensure the output is a structured JSON object.
4.  **Display:** The frontend receives the JSON data from the API and renders it into a detailed, easy-to-read analysis view with distinct sections for different resume components and AI feedback.
5.  **History:** The completed analysis is added to the application's state, making it available for viewing in the "History" tab for the duration of the user's session.

## Deployment to GitHub Pages

This project is configured for automated deployment to GitHub Pages using GitHub Actions.

### 1. Push to a GitHub Repository

-   Create a new repository on GitHub.
-   Add all your project files (`index.html`, `App.tsx`, etc.) and the `.github/workflows/deploy.yml` file to the repository.
-   Push your code to the `main` branch.

### 2. Configure Repository Secret

-   **CRITICAL:** The application will not work without the API key. You must store it as a secret in your GitHub repository.
-   In your GitHub repository, go to `Settings` > `Secrets and variables` > `Actions`.
-   Click `New repository secret`.
-   Create a secret with the following details:
    -   **Name:** `API_KEY`
    -   **Value:** `Your_Google_Gemini_API_Key`
-   The GitHub Actions workflow is configured to securely access this secret and make it available to the application at deployment time.

### 3. Enable GitHub Pages

1.  Once you push your code and the secret is set, the Action will automatically run. It will create a new branch called `gh-pages` with the deployable version of your site.
2.  In your GitHub repository, go to `Settings` > `Pages`.
3.  Under "Build and deployment", set the **Source** to **Deploy from a branch**.
4.  Under "Branch", select `gh-pages` as the source branch and `/ (root)` for the folder.
5.  Click `Save`.

Your application will be live at the provided GitHub Pages URL (e.g., `https://<your-username>.github.io/<your-repo-name>/`) within a few minutes. Any subsequent pushes to the `main` branch will automatically trigger a new deployment.

## File Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions workflow for deployment
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
