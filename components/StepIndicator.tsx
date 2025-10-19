import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full px-4 sm:px-0">
      <div className="flex items-start">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center text-center w-12 sm:w-20">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300
                    ${isCompleted ? 'bg-purple-600 text-white' : ''}
                    ${isCurrent ? 'bg-indigo-600 text-white ring-4 ring-indigo-200' : ''}
                    ${!isCompleted && !isCurrent ? 'bg-slate-200 text-slate-500' : ''}
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                <p className={`mt-2 text-xs font-medium transition-colors duration-300 ${isCurrent ? 'text-indigo-600' : 'text-slate-500'} hidden sm:block`}>
                  {label}
                </p>
              </div>
              {stepNumber < steps.length && (
                <div className={`flex-1 h-1 mt-5 rounded transition-colors duration-300
                  ${isCompleted ? 'bg-purple-600' : 'bg-slate-200'}
                `}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;