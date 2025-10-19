import React from 'react';
import { Button } from '../common/FormElements';

interface StepContainerProps {
  title: string;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  children: React.ReactNode;
}

const StepContainer: React.FC<StepContainerProps> = ({ title, onNext, onPrev, isFirstStep, isLastStep, children }) => {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">{title}</h2>
      <div>
        {children}
      </div>
      <div className="mt-8 pt-4 border-t flex justify-between">
        <Button onClick={onPrev} disabled={isFirstStep} variant="secondary">
          Previous
        </Button>
        <Button onClick={onNext}>
          {isLastStep ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default StepContainer;