import React, { forwardRef } from 'react';
import type { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
  color: string;
}

const TimelineTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data, color }, ref) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div ref={ref} className="bg-white p-8 text-[9px] leading-relaxed" style={{ color }}>
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">{personalInfo.fullName}</h1>
        <p className="text-lg text-slate-600">{experience[0]?.jobTitle || 'Professional'}</p>
        <div className="flex justify-center items-center gap-x-4 text-xs mt-2 text-slate-500 flex-wrap">
          <span>{personalInfo.phoneNumber}</span>
          <span className="text-slate-300">|</span>
          <a href={`mailto:${personalInfo.email}`} className="text-blue-600">{personalInfo.email}</a>
          <span className="text-slate-300">|</span>
          <a href={personalInfo.linkedIn} className="text-blue-600">LinkedIn</a>
        </div>
      </header>
      
      <main>
        {summary && (
          <section className="mb-6 text-center">
            <p className="text-slate-700">{summary}</p>
          </section>
        )}
        
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 text-center mb-4">Career Timeline</h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 w-0.5 h-full bg-slate-300 -translate-x-1/2"></div>
              
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <div key={exp.id} className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                    <div className="w-1/2 px-4">
                      <div className={`p-3 bg-slate-100 rounded-lg shadow-sm ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                        <h3 className="font-bold text-base text-slate-800">{exp.jobTitle}</h3>
                        <p className="font-semibold text-slate-600">{exp.company}</p>
                        <ul className={`list-disc list-outside space-y-1 text-slate-700 mt-1 ${index % 2 === 0 ? 'pl-4' : 'pr-4 text-right'}`}>
                           {exp.responsibilities.map((resp, i) => resp && <li key={i}>{resp}</li>)}
                        </ul>
                      </div>
                    </div>
                    {/* Dot and Date */}
                    <div className="w-12 h-12 rounded-full bg-slate-800 text-white flex-shrink-0 flex flex-col items-center justify-center text-center z-10 leading-tight">
                        <p className="text-[7px]">{exp.startDate}</p>
                        <p className="text-[7px]">to</p>
                        <p className="text-[7px]">{exp.endDate}</p>
                    </div>
                     <div className="w-1/2 px-4"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-x-8">
            {education.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 text-center mb-2">Education</h2>
                <div className="space-y-2 text-center">
                  {education.map(edu => (
                    <div key={edu.id}>
                      <h3 className="font-bold">{edu.institution}</h3>
                      <p className="text-slate-600">{edu.degree}, {edu.fieldOfStudy}</p>
                      <p className="text-slate-500">{edu.graduationDate}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {skills.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 text-center mb-2">Skills</h2>
                <p className="text-slate-700 text-center">{skills.join(' • ')}</p>
              </section>
            )}
        </div>
      </main>
    </div>
  );
});

export default TimelineTemplate;