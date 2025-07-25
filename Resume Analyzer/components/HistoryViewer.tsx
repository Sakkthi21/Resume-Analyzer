import React, { useState } from 'react';
import { HistoricalResume, ResumeData } from '../types';
import ResumeDetails from './ResumeDetails';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';

interface HistoryViewerProps {
  history: HistoricalResume[];
}

const HistoryViewer: React.FC<HistoryViewerProps> = ({ history }) => {
  const [selectedResume, setSelectedResume] = useState<ResumeData | null>(null);

  if (history.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-gray-800/50 rounded-xl border border-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 4v16" />
        </svg>
        <h3 className="mt-4 text-xl font-semibold text-white">No History Yet</h3>
        <p className="mt-1 text-gray-400">
          Analyze a resume on the first tab to see its history here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">File Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Candidate</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Rating</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Date Analyzed</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Details</span></th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/70 divide-y divide-gray-700">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-gray-700/50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white truncate max-w-xs" title={item.fileName}>{item.fileName || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.analysis.name || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.analysis.resume_rating >= 8 ? 'bg-green-800 text-green-200' : item.analysis.resume_rating >= 5 ? 'bg-yellow-800 text-yellow-200' : 'bg-red-800 text-red-200'}`}>
                      {item.analysis.resume_rating}/10
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.uploadedAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button onClick={() => setSelectedResume(item.analysis)} size="sm">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedResume && (
        <Modal isOpen={!!selectedResume} onClose={() => setSelectedResume(null)} title={`Analysis for ${selectedResume.name || 'Resume'}`}>
            <ResumeDetails data={selectedResume} />
        </Modal>
      )}
    </>
  );
};

export default HistoryViewer;