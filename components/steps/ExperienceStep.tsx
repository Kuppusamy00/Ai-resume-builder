import React, { useState } from 'react';
import type { Experience } from '../../types';
import { Input, Button } from '../common/FormElements';
import StepContainer from './StepContainer';
import { generateExperienceBulletPoints, proofreadText } from '../../services/geminiService';

interface ExperienceStepProps {
  data: Experience[];
  updateData: (data: Experience[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ExperienceStep: React.FC<ExperienceStepProps> = ({ data, updateData, onNext, onPrev }) => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [proofreadLoadingStates, setProofreadLoadingStates] = useState<Record<string, boolean>>({});

  const handleChange = (index: number, field: keyof Omit<Experience, 'id' | 'responsibilities'>, value: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    updateData(newData);
  };

  const handleResponsibilityChange = (expIndex: number, respIndex: number, value: string) => {
    const newData = data.map((exp, i) => {
      if (i === expIndex) {
        const newResponsibilities = exp.responsibilities.map((resp, j) => (j === respIndex ? value : resp));
        return { ...exp, responsibilities: newResponsibilities };
      }
      return exp;
    });
    updateData(newData);
  };
  
  const handleProofreadResponsibility = async (expIndex: number, respIndex: number) => {
    const key = `${expIndex}-${respIndex}`;
    const originalText = data[expIndex].responsibilities[respIndex];
    if (!originalText.trim()) return;

    setProofreadLoadingStates(prev => ({ ...prev, [key]: true }));
    try {
        const correctedText = await proofreadText(originalText);
        handleResponsibilityChange(expIndex, respIndex, correctedText);
    } catch (error) {
        console.error("Failed to proofread responsibility:", error);
        alert("Could not proofread the text. Please try again.");
    } finally {
        setProofreadLoadingStates(prev => ({ ...prev, [key]: false }));
    }
  };

  const addResponsibility = (expIndex: number) => {
    const newData = data.map((exp, i) => {
        if (i === expIndex) {
            return { ...exp, responsibilities: [...exp.responsibilities, ''] };
        }
        return exp;
    });
    updateData(newData);
  };
  
  const removeResponsibility = (expIndex: number, respIndex: number) => {
    const newData = data.map((exp, i) => {
      if (i === expIndex) {
        return {
          ...exp,
          responsibilities: exp.responsibilities.filter((_, j) => j !== respIndex),
        };
      }
      return exp;
    });
    updateData(newData);
  };

  const addExperience = () => {
    updateData([
      ...data,
      { id: crypto.randomUUID(), jobTitle: '', company: '', location: '', startDate: '', endDate: '', responsibilities: [''] }
    ]);
  };

  const removeExperience = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    updateData(newData);
  };
  
  const handleAIGenerate = async (index: number) => {
      const experience = data[index];
      if(!experience.jobTitle || !experience.company) {
          alert("Please fill in Job Title and Company before generating.");
          return;
      }
      setLoadingStates(prev => ({ ...prev, [experience.id]: true }));
      try {
        const bulletPoints = await generateExperienceBulletPoints(experience.jobTitle, experience.company);
        const newData = data.map((exp, i) => {
            if (i === index) {
                return { ...exp, responsibilities: bulletPoints };
            }
            return exp;
        });
        updateData(newData);
      } catch(error) {
          console.error("Failed to generate bullet points:", error);
          alert("Could not generate bullet points. Please try again.");
      } finally {
        setLoadingStates(prev => ({ ...prev, [experience.id]: false }));
      }
  };

  return (
    <StepContainer title="Work Experience" onNext={onNext} onPrev={onPrev}>
      <div className="space-y-6">
        {data.map((exp, index) => (
          <div key={exp.id} className="p-4 border border-slate-200 rounded-lg space-y-4 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Job Title" value={exp.jobTitle} onChange={(e) => handleChange(index, 'jobTitle', e.target.value)} />
              <Input label="Company" value={exp.company} onChange={(e) => handleChange(index, 'company', e.target.value)} />
              <Input label="Location" value={exp.location} onChange={(e) => handleChange(index, 'location', e.target.value)} />
              <Input label="Start Date" type="month" value={exp.startDate} onChange={(e) => handleChange(index, 'startDate', e.target.value)} />
              <Input label="End Date" type="month" value={exp.endDate} onChange={(e) => handleChange(index, 'endDate', e.target.value)} />
            </div>
             <div>
                <h4 className="text-sm font-medium text-slate-700 mb-2">Responsibilities / Achievements</h4>
                <div className="space-y-2">
                {exp.responsibilities.map((resp, respIndex) => {
                    const proofreadKey = `${index}-${respIndex}`;
                    const isProofreading = proofreadLoadingStates[proofreadKey];
                    return (
                    <div key={respIndex} className="flex items-center gap-2">
                        <Input wrapperClassName="flex-grow" aria-label={`Responsibility ${respIndex + 1}`} value={resp} onChange={(e) => handleResponsibilityChange(index, respIndex, e.target.value)} />
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => handleProofreadResponsibility(index, respIndex)}
                            disabled={isProofreading || !resp.trim()}
                            className="px-2 py-1 text-xs h-8 mt-1 flex-shrink-0"
                            title="Proofread with AI"
                        >
                            {isProofreading ? '...' : 'AI Check'}
                        </Button>
                        <Button type="button" variant="danger" onClick={() => removeResponsibility(index, respIndex)} className="px-2 py-1 text-xs h-8 mt-1 flex-shrink-0">X</Button>
                    </div>
                )})}
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-3">
                  <Button type="button" variant="secondary" onClick={() => addResponsibility(index)}>Add Responsibility</Button>
                  <Button type="button" variant="ai" onClick={() => handleAIGenerate(index)} disabled={loadingStates[exp.id]}>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 6.586V4a1 1 0 00-1-1zM3 10a1 1 0 011-1h2.586l-1.293-1.293a1 1 0 111.414-1.414l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L6.586 11H4a1 1 0 01-1-1zm14 0a1 1 0 00-1-1h-2.586l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 101.414-1.414L13.414 11H16a1 1 0 001-1zM10 17a1 1 0 011-1v-2.586l1.293 1.293a1 1 0 101.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L9 13.414V16a1 1 0 011-1z" clipRule="evenodd" /></svg>
                    {loadingStates[exp.id] ? 'Generating...' : 'Generate with AI'}
                  </Button>
                </div>
            </div>
            <Button type="button" variant="danger" onClick={() => removeExperience(index)} className="absolute top-2 right-2 px-2 py-1 text-xs">Remove</Button>
          </div>
        ))}
        <Button type="button" onClick={addExperience} variant="secondary">Add Experience</Button>
      </div>
    </StepContainer>
  );
};

export default ExperienceStep;