import React, { forwardRef } from 'react';
import type { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
  color: string;
}

const SwissTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data, color }, ref) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div ref={ref} className="bg-white p-8 text-[8.5px] leading-snug" style={{ fontFamily: "'Inter', sans-serif", color }}>
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 mb-6">
            <h1 className="text-4xl font-bold text-slate-900">{personalInfo.fullName}</h1>
            <p className="text-lg text-slate-600">{experience[0]?.jobTitle || 'Professional'}</p>
        </div>

        {/* Left Column */}
        <div className="col-span-4">
            <section className="mb-4">
                <h2 className="font-bold text-slate-500 tracking-wider">CONTACT</h2>
                <div className="space-y-1 text-slate-700 mt-1">
                    <p>{personalInfo.phoneNumber}</p>
                    <p className="break-all">{personalInfo.email}</p>
                    <p>{personalInfo.address}</p>
                    <a href={personalInfo.linkedIn} className="text-slate-700 block">LinkedIn</a>
                </div>
            </section>
            
            {education.length > 0 && (
                <section className="mb-4">
                    <h2 className="font-bold text-slate-500 tracking-wider">EDUCATION</h2>
                    <div className="space-y-2 text-slate-700 mt-1">
                        {education.map(edu => (
                            <div key={edu.id}>
                                <h3 className="font-bold">{edu.degree}</h3>
                                <p>{edu.institution}</p>
                                <p>{edu.graduationDate}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {skills.length > 0 && (
                <section>
                    <h2 className="font-bold text-slate-500 tracking-wider">SKILLS</h2>
                    <ul className="text-slate-700 mt-1 space-y-0.5">
                        {skills.map((skill, index) => <li key={index}>{skill}</li>)}
                    </ul>
                </section>
            )}
        </div>
        
        {/* Right Column */}
        <div className="col-span-8">
            {summary && (
                <section className="mb-4">
                    <h2 className="font-bold text-slate-900 tracking-wider">SUMMARY</h2>
                    <p className="text-slate-700 mt-1">{summary}</p>
                </section>
            )}

            {experience.length > 0 && (
                <section>
                    <h2 className="font-bold text-slate-900 tracking-wider">EXPERIENCE</h2>
                    <div className="space-y-4 mt-1">
                        {experience.map(exp => (
                            <div key={exp.id}>
                                <div className="grid grid-cols-4 gap-x-2">
                                    <div className="col-span-1 text-slate-600">
                                        <p>{exp.startDate} –</p>
                                        <p>{exp.endDate}</p>
                                    </div>
                                    <div className="col-span-3">
                                        <h3 className="font-bold text-base text-slate-800">{exp.jobTitle}</h3>
                                        <p className="font-semibold text-slate-600 mb-1">{exp.company}, {exp.location}</p>
                                        <ul className="list-disc list-outside pl-3 space-y-1 text-slate-700">
                                            {exp.responsibilities.map((resp, index) => resp && <li key={index}>{resp}</li>)}
                                        </ul>
                                    </div>
                                </div>
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

export default SwissTemplate;