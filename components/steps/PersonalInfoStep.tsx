import React from 'react';
import type { PersonalInfo } from '../../types';
import { Input, Button } from '../common/FormElements';
import StepContainer from './StepContainer';

interface PersonalInfoStepProps {
  data: PersonalInfo;
  updateData: (field: keyof PersonalInfo, value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ data, updateData, onNext, onPrev }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData(e.target.name as keyof PersonalInfo, e.target.value);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateData('photoUrl', event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <StepContainer title="Personal Information" onNext={onNext} onPrev={onPrev} isFirstStep>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-4 pb-4 border-b border-slate-200">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden ring-2 ring-offset-2 ring-slate-200 flex-shrink-0">
            {data.photoUrl ? (
              <img src={data.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-12 h-12 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </div>
          <div className="flex-grow text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3">
                <label htmlFor="photoUpload" className="cursor-pointer bg-slate-200 text-slate-800 hover:bg-slate-300 font-semibold px-4 py-2 rounded-md text-sm transition-colors duration-200 whitespace-nowrap">
                  Upload Photo
                </label>
                <input
                  type="file"
                  id="photoUpload"
                  name="photoUrl"
                  className="hidden"
                  accept="image/png, image/jpeg"
                  onChange={handlePhotoChange}
                />
                {data.photoUrl && (
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => updateData('photoUrl', '')}
                    className="px-4 py-2 text-sm"
                  >
                    Remove
                  </Button>
                )}
            </div>
            <p className="text-xs text-slate-500 mt-2">Recommended: Square image (e.g., 200x200px).</p>
          </div>
        </div>

        <Input label="Full Name" id="fullName" name="fullName" value={data.fullName} onChange={handleChange} placeholder="e.g., Jane Doe" />
        <Input label="Email" id="email" name="email" type="email" value={data.email} onChange={handleChange} placeholder="e.g., jane.doe@example.com" />
        <Input label="Phone Number" id="phoneNumber" name="phoneNumber" value={data.phoneNumber} onChange={handleChange} placeholder="e.g., (123) 456-7890" />
        <Input label="Address" id="address" name="address" value={data.address} onChange={handleChange} placeholder="e.g., City, State" />
        <Input label="LinkedIn Profile URL" id="linkedIn" name="linkedIn" value={data.linkedIn} onChange={handleChange} placeholder="https://linkedin.com/in/..." />
        <Input label="GitHub Profile URL" id="github" name="github" value={data.github} onChange={handleChange} placeholder="https://github.com/..." />
        <Input label="Portfolio/Website URL" id="portfolio" name="portfolio" value={data.portfolio} onChange={handleChange} placeholder="https://your-portfolio.com" />
      </div>
    </StepContainer>
  );
};

export default PersonalInfoStep;