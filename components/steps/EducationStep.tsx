
import React from 'react';
import type { Education } from '../../types';
import { Input, Button } from '../common/FormElements';
import StepContainer from './StepContainer';

interface EducationStepProps {
  data: Education[];
  updateData: (data: Education[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

const EducationStep: React.FC<EducationStepProps> = ({ data, updateData, onNext, onPrev }) => {
  const handleChange = (index: number, field: keyof Omit<Education, 'id'>, value: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    updateData(newData);
  };

  const addEducation = () => {
    updateData([
      ...data,
      { id: crypto.randomUUID(), institution: '', degree: '', fieldOfStudy: '', graduationDate: '' }
    ]);
  };

  const removeEducation = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    updateData(newData);
  };

  return (
    <StepContainer title="Education" onNext={onNext} onPrev={onPrev}>
      <div className="space-y-6">
        {data.map((edu, index) => (
          <div key={edu.id} className="p-4 border rounded-lg space-y-4 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Institution" value={edu.institution} onChange={(e) => handleChange(index, 'institution', e.target.value)} />
              <Input label="Degree" value={edu.degree} onChange={(e) => handleChange(index, 'degree', e.target.value)} />
              <Input label="Field of Study" value={edu.fieldOfStudy} onChange={(e) => handleChange(index, 'fieldOfStudy', e.target.value)} />
              <Input label="Graduation Date" type="month" value={edu.graduationDate} onChange={(e) => handleChange(index, 'graduationDate', e.target.value)} />
            </div>
            <Button type="button" variant="danger" onClick={() => removeEducation(index)} className="absolute top-2 right-2 px-2 py-1 text-xs">Remove</Button>
          </div>
        ))}
        <Button type="button" onClick={addEducation} variant="secondary">Add Education</Button>
      </div>
    </StepContainer>
  );
};

export default EducationStep;
