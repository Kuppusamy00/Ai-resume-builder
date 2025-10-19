import React, { forwardRef } from 'react';
import type { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
  color: string;
}

const CompactTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data, color }, ref) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div ref={ref} className="bg-white p-6 text-[7.5px] leading-snug grid grid-cols-12 gap-x-4" style={{ color }}>
      {/* Left Column */}
      <div className="col-span-4">
        <div className="text-left mb-4">
          <h1 className="text-xl font-bold text-slate-800">{personalInfo.fullName}</h1>
          <p className="text-slate-600 text-[8px]">{experience[0]?.jobTitle || 'Professional'}</p>
        </div>
        
        <section className="mb-3">
          <h2 className="text-[9px] font-bold uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-0.5 mb-1">Contact</h2>
          <div className="space-y-0.5 text-slate-600">
            {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
            {personalInfo.phoneNumber && <p>{personalInfo.phoneNumber}</p>}
            {personalInfo.address && <p>{personalInfo.address}</p>}
            {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="text-blue-600 break-all">LinkedIn</a>}
            {personalInfo.github && <a href={personalInfo.github} className="text-blue-600 break-all">GitHub</a>}
          </div>
        </section>

        {skills.length > 0 && (
          <section className="mb-3">
            <h2 className="text-[9px] font-bold uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-0.5 mb-1">Skills</h2>
            <ul className="list-disc list-inside space-y-0.5">
              {skills.map((skill, index) => <li key={index}>{skill}</li>)}
            </ul>
          </section>
        )}
        
        {education.length > 0 && (
          <section>
            <h2 className="text-[9px] font-bold uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-0.5 mb-1">Education</h2>
            <div className="space-y-2">
              {education.map(edu => (
                <div key={edu.id}>
                  <h3 className="font-bold text-[8px]">{edu.degree}</h3>
                  <p className="text-slate-600">{edu.institution}</p>
                  <p className="text-slate-500">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      
      {/* Right Column */}
      <div className="col-span-8 border-l border-slate-200 pl-4">
        {summary && (
          <section className="mb-3">
            <h2 className="text-[9px] font-bold uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-0.5 mb-1">Summary</h2>
            <p className="text-slate-600">{summary}</p>
          </section>
        )}
        
        {experience.length > 0 && (
          <section>
            <h2 className="text-[9px] font-bold uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-0.5 mb-1">Experience</h2>
            <div className="space-y-3">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-[9px]">{exp.jobTitle}</h3>
                    <p className="text-slate-500">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <p className="font-semibold text-slate-600 mb-0.5">{exp.company}, {exp.location}</p>
                  <ul className="list-disc list-outside pl-3 space-y-0.5 text-slate-600">
                    {exp.responsibilities.map((resp, index) => resp && <li key={index}>{resp}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
});

export default CompactTemplate;