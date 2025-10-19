import React, { forwardRef } from 'react';
import type { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
  color: string;
}

const MinimalistTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data, color }, ref) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div ref={ref} className="bg-white p-6 md:p-8 text-[8px] leading-snug" style={{ color }}>
      <div className="grid grid-cols-12 gap-x-6">
        {/* Left Column */}
        <div className="col-span-4 pr-6 border-r border-slate-200">
          <div className="flex flex-col items-center text-center">
            {personalInfo.photoUrl && (
              <img src={personalInfo.photoUrl} alt="Profile" className="w-20 h-20 rounded-full object-cover mb-4 ring-2 ring-slate-200" />
            )}
            <h1 className="text-xl font-bold text-slate-800">{personalInfo.fullName}</h1>
          </div>
          
          <div className="mt-6 space-y-4 text-xs">
            {personalInfo.email && <div className="flex items-center gap-2"><span className="font-bold">E:</span> <a href={`mailto:${personalInfo.email}`} className="text-blue-600 break-all">{personalInfo.email}</a></div>}
            {personalInfo.phoneNumber && <div className="flex items-center gap-2"><span className="font-bold">P:</span> {personalInfo.phoneNumber}</div>}
            {personalInfo.address && <div className="flex items-center gap-2"><span className="font-bold">A:</span> {personalInfo.address}</div>}
            {personalInfo.linkedIn && <div className="flex items-center gap-2"><span className="font-bold">L:</span> <a href={personalInfo.linkedIn} className="text-blue-600 break-all">LinkedIn</a></div>}
            {personalInfo.github && <div className="flex items-center gap-2"><span className="font-bold">G:</span> <a href={personalInfo.github} className="text-blue-600 break-all">GitHub</a></div>}
            {personalInfo.portfolio && <div className="flex items-center gap-2"><span className="font-bold">W:</span> <a href={personalInfo.portfolio} className="text-blue-600 break-all">Portfolio</a></div>}
          </div>

          {skills.length > 0 && (
            <div className="mt-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b-2 border-slate-300 pb-1 mb-2">Skills</h2>
              <ul className="flex flex-wrap gap-1.5 text-xs">
                {skills.map((skill, index) => (
                  <li key={index} className="bg-slate-200 text-slate-700 rounded-full px-2 py-0.5">{skill}</li>
                ))}
              </ul>
            </div>
          )}
          
          {education.length > 0 && (
            <div className="mt-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b-2 border-slate-300 pb-1 mb-2">Education</h2>
              <div className="space-y-3">
                {education.map(edu => (
                  <div key={edu.id} className="text-xs">
                    <h3 className="font-bold">{edu.institution}</h3>
                    <p className="text-slate-600">{edu.degree}</p>
                    <p className="text-slate-500">{edu.fieldOfStudy}</p>
                    <p className="text-slate-500 italic">{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Column */}
        <div className="col-span-8">
          {summary && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b-2 border-slate-300 pb-1 mb-2">Summary</h2>
              <p className="text-slate-600 text-xs">{summary}</p>
            </div>
          )}
          
          {experience.length > 0 && (
            <div className="mt-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b-2 border-slate-300 pb-1 mb-2">Experience</h2>
              <div className="space-y-4">
                {experience.map(exp => (
                  <div key={exp.id} className="text-xs">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-base">{exp.jobTitle}</h3>
                      <p className="text-slate-500 italic text-xs">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <div className="flex justify-between items-baseline mb-1">
                        <p className="font-semibold text-slate-600">{exp.company}</p>
                        <p className="text-slate-500">{exp.location}</p>
                    </div>
                    <ul className="list-disc list-outside pl-4 space-y-1 text-slate-600">
                      {exp.responsibilities.map((resp, index) => resp && <li key={index}>{resp}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default MinimalistTemplate;