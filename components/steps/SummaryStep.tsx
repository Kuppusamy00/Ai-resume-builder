import React, { useState } from 'react';
import type { ResumeData } from '../../types';
import { TextArea, Button, Input } from '../common/FormElements';
import StepContainer from './StepContainer';
import { generateSummary, proofreadText } from '../../services/geminiService';

interface SummaryStepProps {
  resumeData: ResumeData;
  updateData: (value: string) => void;
  updateTargetCompany: (value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({ resumeData, updateData, updateTargetCompany, onNext, onPrev }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isProofreading, setIsProofreading] = useState(false);

  const handleAIGenerate = async () => {
    setIsLoading(true);
    try {
      const summaryText = await generateSummary(resumeData);
      updateData(summaryText);
    } catch (error) {
      console.error("Failed to generate summary:", error);
      alert("Could not generate summary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProofread = async () => {
    if (!resumeData.summary.trim()) return;
    setIsProofreading(true);
    try {
        const correctedText = await proofreadText(resumeData.summary);
        updateData(correctedText);
    } catch (error) {
        console.error("Failed to proofread summary:", error);
        alert("Could not proofread summary. Please try again.");
    } finally {
        setIsProofreading(false);
    }
  };

  return (
    <StepContainer title="Professional Summary" onNext={onNext} onPrev={onPrev}>
      <div className="space-y-6">
        <div>
          <Input 
              label="Target Company (Optional)"
              id="targetCompany"
              name="targetCompany"
              value={resumeData.targetCompany || ''}
              onChange={(e) => updateTargetCompany(e.target.value)}
              placeholder="e.g., Google, Microsoft"
          />
          <p className="text-sm text-slate-500 mt-1">Providing a company name helps the AI tailor your summary.</p>
        </div>
        <TextArea
          label="Summary"
          id="summary"
          name="summary"
          value={resumeData.summary}
          onChange={(e) => updateData(e.target.value)}
          placeholder="Write a brief summary of your career and skills, or let AI generate one for you."
          rows={8}
        />
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button type="button" variant="ai" onClick={handleAIGenerate} disabled={isLoading || isProofreading}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            {isLoading ? 'Generating...' : `Generate with AI`}
            </Button>
            <Button type="button" variant="secondary" onClick={handleProofread} disabled={isProofreading || isLoading || !resumeData.summary.trim()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                {isProofreading ? 'Checking...' : 'Proofread'}
            </Button>
        </div>
      </div>
    </StepContainer>
  );
};

export default SummaryStep;