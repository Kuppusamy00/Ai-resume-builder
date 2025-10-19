import React, { forwardRef } from 'react';
import type { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
  color: string;
}

const TechnicalTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data, color }, ref) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div ref={ref} className="bg-white p-8 text-[8.5px] leading-relaxed" style={{ fontFamily: "'Source Code Pro', monospace", color }}>
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tighter">{personalInfo.fullName}</h1>
        <div className="flex justify-center items-center gap-x-3 text-xs mt-2 text-slate-600 flex-wrap">
          {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="text-blue-600">{personalInfo.email}</a>}
          {personalInfo.phoneNumber && <span>| {personalInfo.phoneNumber}</span>}
          {personalInfo.address && <span>| {personalInfo.address}</span>}
        </div>
        <div className="flex justify-center items-center gap-x-3 text-xs mt-1 text-blue-600 flex-wrap">
           {personalInfo.linkedIn && <a href={personalInfo.linkedIn}>LinkedIn</a>}
           {personalInfo.github && <span>| <a href={personalInfo.github}>GitHub</a></span>}
           {personalInfo.portfolio && <span>| <a href={personalInfo.portfolio}>Portfolio</a></span>}
        </div>
      </header>

      <main className="space-y-5">
        {summary && (
          <section>
            <h2 className="text-sm font-bold text-slate-700">// SUMMARY</h2>
            <p className="text-slate-700 mt-1 border-l-2 border-slate-300 pl-2">{summary}</p>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-slate-700">// SKILLS</h2>
            <p className="text-slate-700 mt-1 border-l-2 border-slate-300 pl-2">{skills.join(' | ')}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-slate-700">// EXPERIENCE</h2>
            <div className="space-y-4 mt-1">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-base text-slate-800">{exp.jobTitle} @ {exp.company}</h3>
                    <p className="text-slate-500 font-semibold">{exp.startDate} – {exp.endDate}</p>
                  </div>
                  <p className="text-slate-500 text-xs mb-1">{exp.location}</p>
                  <ul className="space-y-1 text-slate-700">
                    {exp.responsibilities.map((resp, index) => resp && (
                        <li key={index} className="flex items-start">
                            <span className="text-slate-500 mr-2 text-xs mt-0.5">&gt;</span>
                            <span>{resp}</span>
                        </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {education.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-slate-700">// EDUCATION</h2>
            <div className="space-y-2 mt-1">
              {education.map(edu => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-base text-slate-800">{edu.institution}</h3>
                    <p className="text-slate-600">{edu.degree}, {edu.fieldOfStudy}</p>
                  </div>
                  <p className="text-slate-500 font-semibold">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
});

export default TechnicalTemplate;