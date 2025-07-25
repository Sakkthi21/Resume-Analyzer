import React, { useState, useCallback, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { analyzeResume } from '../services/geminiService';
import { ResumeData } from '../types';
import ResumeDetails from './ResumeDetails';
import { Button } from './ui/Button';
import { Spinner } from './ui/Spinner';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://esm.sh/pdfjs-dist@4.4.168/build/pdf.worker.mjs`;

interface ResumeAnalyzerProps {
  onAnalysisComplete: (analysis: ResumeData, fileName: string) => void;
}

const ResumeAnalyzer: React.FC<ResumeAnalyzerProps> = ({ onAnalysisComplete }) => {
  const [resumeText, setResumeText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file.');
        return;
      }
      setSelectedFile(file);
      setResumeText('');
      setError(null);
      setAnalysisResult(null);
    }
  };

  const parsePdf = useCallback(async (file: File) => {
    setIsParsing(true);
    setError(null);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      const numPages = pdf.numPages;
      let fullText = '';
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map((item: { str: string }) => item.str).join(' ') + '\n';
      }
      setResumeText(fullText);
    } catch (err) {
      setError(err instanceof Error ? `Failed to parse PDF: ${err.message}` : 'An unknown error occurred during PDF parsing.');
      setSelectedFile(null);
    } finally {
      setIsParsing(false);
    }
  }, []);

  useEffect(() => {
    if (selectedFile) {
      parsePdf(selectedFile);
    }
  }, [selectedFile, parsePdf]);
  
  const handleAnalyze = useCallback(async () => {
    if (!selectedFile) {
      setError('No file selected.');
      return;
    }
    if (!resumeText.trim()) {
      setError('Could not extract text from PDF. The file might be empty or corrupted.');
      return;
    }
    if (!process.env.API_KEY) {
      setError('API_KEY is not configured. Please set the environment variable.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeResume(resumeText);
      setAnalysisResult(result);
      onAnalysisComplete(result, selectedFile.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [resumeText, onAnalysisComplete, selectedFile]);

  const clearFile = () => {
    setSelectedFile(null);
    setResumeText('');
    setError(null);
    setAnalysisResult(null);
    const input = document.getElementById('resume-upload') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-indigo-300">Upload Your Resume</h2>
        
        {!selectedFile && !isParsing && (
          <div className="flex items-center justify-center w-full">
            <label htmlFor="resume-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700/50 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">PDF document only</p>
              </div>
              <input id="resume-upload" type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} disabled={isLoading || isParsing} />
            </label>
          </div>
        )}

        {isParsing && (
          <div className="flex flex-col items-center justify-center w-full h-48">
            <Spinner />
            <p className="mt-4 text-gray-300">Parsing PDF...</p>
          </div>
        )}

        {selectedFile && !isParsing && (
          <div className="p-4 bg-gray-900 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" /></svg>
                <span className="text-sm font-medium text-gray-200 truncate" title={selectedFile.name}>{selectedFile.name}</span>
              </div>
              <button onClick={clearFile} disabled={isLoading} className="text-gray-400 hover:text-white disabled:opacity-50 text-2xl leading-none flex-shrink-0 ml-2">&times;</button>
            </div>
            {resumeText && <p className="text-xs text-green-400 mt-2">✓ PDF parsed successfully. Ready to analyze.</p>}
            {!resumeText && error && <p className="text-xs text-red-400 mt-2">{error}</p>}
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <Button onClick={handleAnalyze} disabled={isLoading || isParsing || !resumeText.trim()}>
            {isLoading ? (
              <>
                <Spinner />
                Analyzing...
              </>
            ) : (
              'Analyze Resume'
            )}
          </Button>
        </div>
      </div>

      {error && !analysisResult && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {analysisResult && (
        <div className="mt-8 animate-fade-in">
           <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-400">Analysis Results</h2>
           <ResumeDetails data={analysisResult} />
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;