import React, { forwardRef } from 'react';
import type { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
  color: string;
}

const CorporateTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data, color }, ref) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div ref={ref} className="bg-white p-8 text-[9px] leading-relaxed" style={{ fontFamily: "'Merriweather', serif", color }}>
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-normal text-slate-900">{personalInfo.fullName}</h1>
        <p className="text-sm text-slate-600 mt-1">{experience[0]?.jobTitle || 'Professional'}</p>
        <div className="flex justify-center items-center gap-x-4 text-xs mt-3 text-slate-600 flex-wrap">
          <span>{personalInfo.address}</span>
          <span>&bull;</span>
          <span>{personalInfo.phoneNumber}</span>
          <span>&bull;</span>
          <a href={`mailto:${personalInfo.email}`} className="text-slate-600 hover:text-slate-900">{personalInfo.email}</a>
          <span>&bull;</span>
          <a href={personalInfo.linkedIn} className="text-slate-600 hover:text-slate-900">LinkedIn</a>
        </div>
      </header>

      <main>
        {summary && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b-2 border-slate-800 pb-1 mb-2">Summary</h2>
            <p className="text-slate-700">{summary}</p>
          </section>
        )}
        
        {experience.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b-2 border-slate-800 pb-1 mb-2">Professional Experience</h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-base text-slate-900">{exp.company}</h3>
                    <p className="text-slate-600 font-semibold">{exp.location}</p>
                  </div>
                  <div className="flex justify-between items-baseline mb-1 italic">
                      <p className="font-semibold text-slate-700">{exp.jobTitle}</p>
                      <p className="text-slate-600">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700">
                    {exp.responsibilities.map((resp, index) => resp && <li key={index}>{resp}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b-2 border-slate-800 pb-1 mb-2">Education</h2>
            <div className="space-y-2">
              {education.map(edu => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-base text-slate-900">{edu.degree}, {edu.fieldOfStudy}</h3>
                    <p className="text-slate-700 italic">{edu.institution}</p>
                  </div>
                  <p className="text-slate-600 font-semibold">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b-2 border-slate-800 pb-1 mb-2">Core Competencies</h2>
            <p className="text-slate-700 text-center">{skills.join('  •  ')}</p>
          </section>
        )}
      </main>
    </div>
  );
});

export default CorporateTemplate;