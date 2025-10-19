import React, { forwardRef } from 'react';
import type { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
  color: string;
}

const ElegantTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data, color }, ref) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div ref={ref} className="bg-white p-8 text-[8px] leading-snug" style={{ fontFamily: "'Playfair Display', serif", color }}>
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-widest text-slate-800 uppercase">{personalInfo.fullName}</h1>
        <p className="text-sm text-slate-500 mt-1 tracking-[.25em] uppercase">{experience[0]?.jobTitle || 'Professional'}</p>
      </header>

      <div className="grid grid-cols-12 gap-x-8">
        {/* Main Column */}
        <div className="col-span-8">
          {summary && (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-[.2em] text-slate-700 pb-1 mb-2">About Me</h2>
              <div className="w-10 h-px bg-slate-300 mb-2"></div>
              <p className="text-slate-600 text-[9px] leading-relaxed">{summary}</p>
            </section>
          )}
          
          {experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-[.2em] text-slate-700 pb-1 mb-2">Experience</h2>
              <div className="w-10 h-px bg-slate-300 mb-3"></div>
              <div className="space-y-4">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <h3 className="font-bold text-base text-slate-800">{exp.jobTitle}</h3>
                    <p className="font-semibold text-slate-600 mb-1">{exp.company} / {exp.startDate} - {exp.endDate}</p>
                    <ul className="list-none pl-2 space-y-1 text-slate-600 text-[9px]">
                      {exp.responsibilities.map((resp, index) => resp && <li key={index} className="before:content-['\2013'] before:mr-2">{resp}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="col-span-4 border-l-2 border-slate-200 pl-6">
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-[.2em] text-slate-700 pb-1 mb-2">Contact</h2>
            <div className="w-10 h-px bg-slate-300 mb-3"></div>
            <div className="space-y-2 text-xs text-slate-600">
              {personalInfo.email && <p>{personalInfo.email}</p>}
              {personalInfo.phoneNumber && <p>{personalInfo.phoneNumber}</p>}
              {personalInfo.address && <p>{personalInfo.address}</p>}
              {personalInfo.linkedIn && <p><a href={personalInfo.linkedIn} className="text-slate-600">LinkedIn</a></p>}
              {personalInfo.portfolio && <p><a href={personalInfo.portfolio} className="text-slate-600">Portfolio</a></p>}
            </div>
          </section>

          {skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-[.2em] text-slate-700 pb-1 mb-2">Skills</h2>
              <div className="w-10 h-px bg-slate-300 mb-3"></div>
              <ul className="text-xs space-y-1 text-slate-600">
                {skills.map((skill, index) => <li key={index}>{skill}</li>)}
              </ul>
            </section>
          )}
          
          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[.2em] text-slate-700 pb-1 mb-2">Education</h2>
              <div className="w-10 h-px bg-slate-300 mb-3"></div>
              <div className="space-y-3 text-xs">
                {education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-slate-800">{edu.degree}</h3>
                    <p className="text-slate-600">{edu.institution}</p>
                    <p className="text-slate-500">{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
});

export default ElegantTemplate;