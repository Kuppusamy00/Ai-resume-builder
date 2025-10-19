import React, { useState } from 'react';
import type { ResumeData, AIReviewResult, AlteredResumeParts } from '../../types';
import { TextArea, Button } from '../common/FormElements';
import StepContainer from './StepContainer';
import { reviewAndOptimizeResume, alterResumeWithAIFeedback } from '../../services/geminiService';

interface ReviewStepProps {
  resumeData: ResumeData;
  updateResumeWithAI: (updates: AlteredResumeParts) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ resumeData, updateResumeWithAI, onNext, onPrev }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [reviewResult, setReviewResult] = useState<AIReviewResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAltering, setIsAltering] = useState(false);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      alert("Please paste a job description to analyze.");
      return;
    }
    setIsAnalyzing(true);
    setReviewResult(null);
    try {
      const result = await reviewAndOptimizeResume(resumeData, jobDescription);
      setReviewResult(result);
    } catch (error) {
      console.error("Failed to review resume:", error);
      alert("Could not analyze the resume. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAlterResume = async () => {
    if (!reviewResult) return;
    setIsAltering(true);
    try {
        const updatedParts = await alterResumeWithAIFeedback(resumeData, reviewResult);
        updateResumeWithAI(updatedParts);
        alert("Your resume has been updated with AI suggestions!");
    } catch (error) {
        console.error("Failed to alter resume:", error);
        alert("Could not apply AI suggestions. Please try again.");
    } finally {
        setIsAltering(false);
    }
  };

  return (
    <StepContainer title="Review & Optimize" onNext={onNext} onPrev={onPrev} isLastStep>
      <div className="space-y-6">
        <div>
          <TextArea
            label="Paste Job Description Here"
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={8}
            placeholder="Paste the full job description to get an analysis and match score."
          />
          <Button variant="ai" onClick={handleAnalyze} disabled={isAnalyzing || !jobDescription.trim()} className="mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            {isAnalyzing ? 'Analyzing...' : 'Analyze Against Job Description'}
          </Button>
        </div>

        {isAnalyzing && (
            <div className="text-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
                <p className="mt-4 text-slate-600">AI is analyzing your resume...</p>
            </div>
        )}

        {reviewResult && (
          <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
            <h3 className="text-xl font-bold text-slate-800">Analysis Results</h3>
            <div>
              <label className="font-semibold text-slate-700">Match Score</label>
              <div className="w-full bg-slate-200 rounded-full h-4 mt-1">
                <div
                  className="bg-green-500 h-4 rounded-full text-xs font-medium text-blue-100 text-center p-0.5 leading-none"
                  style={{ width: `${reviewResult.matchScore}%` }}
                >
                  {reviewResult.matchScore}%
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700">Strengths</h4>
              <p className="text-sm text-slate-600 whitespace-pre-wrap">{reviewResult.strengths}</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700">Suggestions for Improvement</h4>
              <p className="text-sm text-slate-600 whitespace-pre-wrap">{reviewResult.suggestions}</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700">Missing Keywords</h4>
              {reviewResult.missingKeywords.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-1">
                    {reviewResult.missingKeywords.map((keyword, index) => (
                        <span key={index} className="bg-yellow-200 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{keyword}</span>
                    ))}
                </div>
              ) : <p className="text-sm text-slate-500">No major keywords missing. Great job!</p>}
            </div>
            <div className="pt-4 mt-4 border-t text-center">
                <Button variant="ai" onClick={handleAlterResume} disabled={isAltering}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    {isAltering ? 'Applying Changes...' : 'Apply AI Suggestions'}
                </Button>
            </div>
          </div>
        )}
      </div>
    </StepContainer>
  );
};

export default ReviewStep;