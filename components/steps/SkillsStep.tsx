
import React from 'react';
import { TextArea } from '../common/FormElements';
import StepContainer from './StepContainer';

interface SkillsStepProps {
  data: string[];
  updateData: (data: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

const SkillsStep: React.FC<SkillsStepProps> = ({ data, updateData, onNext, onPrev }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
    updateData(skills);
  };

  return (
    <StepContainer title="Skills" onNext={onNext} onPrev={onPrev}>
      <div className="space-y-4">
        <TextArea
          label="Skills"
          id="skills"
          name="skills"
          value={data.join(', ')}
          onChange={handleChange}
          placeholder="Enter skills separated by commas, e.g., React, TypeScript, Node.js"
          rows={6}
        />
        <p className="text-sm text-slate-500">Separate each skill with a comma.</p>
      </div>
    </StepContainer>
  );
};

export default SkillsStep;
