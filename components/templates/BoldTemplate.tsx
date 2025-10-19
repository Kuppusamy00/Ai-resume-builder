import React, { forwardRef } from 'react';
import type { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
  color: string;
}

const BoldTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data, color }, ref) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div ref={ref} className="bg-white text-[9px] leading-snug grid grid-cols-12" style={{ color }}>
      {/* Sidebar */}
      <div className="col-span-4 bg-slate-900 text-white p-6">
        <div className="text-left">
            <h1 className="text-3xl font-extrabold tracking-tighter">{personalInfo.fullName.split(' ')[0]}</h1>
            <h1 className="text-3xl font-extrabold tracking-tighter">{personalInfo.fullName.split(' ').slice(1).join(' ')}</h1>
            <p className="text-slate-400 text-sm mt-2 border-t-2 border-slate-600 pt-2">{experience[0]?.jobTitle || 'Professional'}</p>
        </div>
        
        <div className="mt-8 space-y-6 text-xs text-slate-300">
            <section>
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">CONTACT</h2>
                <div className="space-y-1">
                    {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
                    {personalInfo.phoneNumber && <p>{personalInfo.phoneNumber}</p>}
                    {personalInfo.address && <p>{personalInfo.address}</p>}
                    {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="break-all block hover:text-white">LinkedIn Profile</a>}
                </div>
            </section>

            {skills.length > 0 && (
                <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">SKILLS</h2>
                    <ul className="list-disc list-inside space-y-1">
                        {skills.map((skill, index) => <li key={index}>{skill}</li>)}
                    </ul>
                </section>
            )}

            {education.length > 0 && (
                <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">EDUCATION</h2>
                    <div className="space-y-3">
                        {education.map(edu => (
                        <div key={edu.id}>
                            <h3 className="font-bold text-white">{edu.degree}</h3>
                            <p className="text-slate-300">{edu.institution}</p>
                            <p className="text-slate-400 text-xs">{edu.graduationDate}</p>
                        </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-8 p-8">
        {summary && (
          <section>
            <h2 className="text-lg font-extrabold uppercase tracking-wider text-slate-800">SUMMARY</h2>
            <div className="w-12 h-0.5 bg-slate-800 my-2"></div>
            <p className="text-slate-600">{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mt-6">
            <h2 className="text-lg font-extrabold uppercase tracking-wider text-slate-800">EXPERIENCE</h2>
            <div className="w-12 h-0.5 bg-slate-800 my-2"></div>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-base text-slate-900">{exp.jobTitle}</h3>
                    <p className="text-slate-500 italic text-xs">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <p className="font-semibold text-slate-600 mb-1">{exp.company} / {exp.location}</p>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-slate-600">
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

export default BoldTemplate;