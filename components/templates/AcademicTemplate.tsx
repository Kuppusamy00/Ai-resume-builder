import React, { forwardRef } from 'react';
import type { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
  color: string;
}

const AcademicTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data, color }, ref) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div ref={ref} className="bg-white p-8 text-[9px] leading-relaxed" style={{ fontFamily: "'Lora', serif", color }}>
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">{personalInfo.fullName}</h1>
        <div className="text-xs mt-2 text-slate-600">
          <span>{personalInfo.address} | </span>
          <a href={`mailto:${personalInfo.email}`} className="text-blue-700">{personalInfo.email}</a>
          <span> | {personalInfo.phoneNumber}</span>
        </div>
      </header>

      <main className="space-y-5">
        {summary && (
          <section>
            <p className="text-slate-700 italic text-center">{summary}</p>
          </section>
        )}
        
        {education.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-800 border-b border-slate-400 pb-1 mb-2">Education</h2>
            <div className="space-y-2">
              {education.map(edu => (
                <div key={edu.id}>
                  <p><span className="font-bold">{edu.degree}</span>, {edu.graduationDate}</p>
                  <p className="italic">{edu.institution}, {edu.fieldOfStudy}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-800 border-b border-slate-400 pb-1 mb-2">Professional Appointments</h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-base text-slate-900">{exp.jobTitle}</h3>
                    <p className="text-slate-600">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <p className="italic mb-1">{exp.company}, {exp.location}</p>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700">
                    {exp.responsibilities.map((resp, index) => resp && <li key={index}>{resp}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-800 border-b border-slate-400 pb-1 mb-2">Areas of Expertise</h2>
            <p className="text-slate-700">{skills.join(', ')}</p>
          </section>
        )}
      </main>
    </div>
  );
});

export default AcademicTemplate;