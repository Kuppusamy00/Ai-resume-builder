import React, { forwardRef } from 'react';
import type { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
  color: string;
}

const ProfessionalTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data, color }, ref) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div ref={ref} className="bg-white p-8 text-[9px] leading-relaxed" style={{ color }}>
      {/* Header */}
      <header className="text-center mb-6 border-b-2 border-slate-400 pb-4">
        <h1 className="text-3xl font-bold tracking-wider text-slate-800">{personalInfo.fullName}</h1>
        <div className="flex justify-center items-center gap-x-4 gap-y-1 text-xs mt-2 text-slate-600 flex-wrap">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phoneNumber && <span>| {personalInfo.phoneNumber}</span>}
          {personalInfo.address && <span>| {personalInfo.address}</span>}
        </div>
        <div className="flex justify-center items-center gap-x-4 gap-y-1 text-xs mt-1 text-blue-600 flex-wrap">
           {personalInfo.linkedIn && <a href={personalInfo.linkedIn}>LinkedIn</a>}
           {personalInfo.github && <a href={personalInfo.github}>GitHub</a>}
           {personalInfo.portfolio && <a href={personalInfo.portfolio}>Portfolio</a>}
        </div>
      </header>

      <main>
        {/* Summary */}
        {summary && (
          <section className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 border-b border-slate-300 pb-1 mb-2">Summary</h2>
            <p className="text-slate-700">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 border-b border-slate-300 pb-1 mb-2">Experience</h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-base">{exp.jobTitle}</h3>
                    <p className="text-slate-500 font-semibold">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <div className="flex justify-between items-baseline mb-1">
                      <p className="font-semibold text-slate-600">{exp.company}</p>
                      <p className="text-slate-500">{exp.location}</p>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700">
                    {exp.responsibilities.map((resp, index) => resp && <li key={index}>{resp}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Education */}
        {education.length > 0 && (
          <section className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 border-b border-slate-300 pb-1 mb-2">Education</h2>
            <div className="space-y-2">
              {education.map(edu => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-base">{edu.institution}</h3>
                    <p className="text-slate-600">{edu.degree}, {edu.fieldOfStudy}</p>
                  </div>
                  <p className="text-slate-500 font-semibold">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 border-b border-slate-300 pb-1 mb-2">Skills</h2>
            <p className="text-slate-700">{skills.join(' • ')}</p>
          </section>
        )}
      </main>
    </div>
  );
});

export default ProfessionalTemplate;