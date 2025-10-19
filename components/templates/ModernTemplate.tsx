import React, { forwardRef } from 'react';
import type { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
  color: string;
}

const ModernTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data, color }, ref) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div ref={ref} className="bg-white text-[9px] leading-snug" style={{ color }}>
      {/* Header */}
      <header className="bg-slate-800 text-white p-8 text-center">
        {personalInfo.photoUrl && (
          <img src={personalInfo.photoUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-4 mx-auto ring-4 ring-slate-500" />
        )}
        <h1 className="text-3xl font-bold tracking-wider">{personalInfo.fullName}</h1>
        <p className="text-lg text-slate-300 mt-1">
          {experience[0]?.jobTitle || 'Professional'}
        </p>
      </header>
      
      <div className="p-8 grid grid-cols-12 gap-x-8">
        {/* Left Column */}
        <aside className="col-span-4">
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 border-b-2 border-slate-300 pb-1 mb-3">Contact</h2>
            <div className="space-y-2 text-xs">
              {personalInfo.email && <div><strong className="text-slate-600">Email:</strong><br /><a href={`mailto:${personalInfo.email}`} className="text-blue-600 break-all">{personalInfo.email}</a></div>}
              {personalInfo.phoneNumber && <div><strong className="text-slate-600">Phone:</strong><br />{personalInfo.phoneNumber}</div>}
              {personalInfo.address && <div><strong className="text-slate-600">Location:</strong><br />{personalInfo.address}</div>}
              {personalInfo.linkedIn && <div><strong className="text-slate-600">LinkedIn:</strong><br /><a href={personalInfo.linkedIn} className="text-blue-600 break-all">View Profile</a></div>}
              {personalInfo.github && <div><strong className="text-slate-600">GitHub:</strong><br /><a href={personalInfo.github} className="text-blue-600 break-all">View Profile</a></div>}
              {personalInfo.portfolio && <div><strong className="text-slate-600">Portfolio:</strong><br /><a href={personalInfo.portfolio} className="text-blue-600 break-all">View Site</a></div>}
            </div>
          </section>
          
          {skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 border-b-2 border-slate-300 pb-1 mb-3">Skills</h2>
              <ul className="space-y-1 text-xs list-disc list-inside">
                {skills.map((skill, index) => <li key={index}>{skill}</li>)}
              </ul>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 border-b-2 border-slate-300 pb-1 mb-3">Education</h2>
              <div className="space-y-3">
                {education.map(edu => (
                  <div key={edu.id} className="text-xs">
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-slate-600">{edu.institution}</p>
                    <p className="text-slate-500 italic">{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Right Column */}
        <main className="col-span-8">
          {summary && (
            <section className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 border-b-2 border-slate-300 pb-1 mb-3">Profile</h2>
              <p className="text-slate-700 text-xs">{summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 border-b-2 border-slate-300 pb-1 mb-3">Experience</h2>
              <div className="space-y-4">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-base">{exp.jobTitle}</h3>
                       <p className="text-slate-500 italic text-xs">{exp.startDate} - {exp.endDate}</p>
                    </div>
                     <p className="font-semibold text-slate-600 mb-1">{exp.company} | {exp.location}</p>
                    <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700 text-xs">
                      {exp.responsibilities.map((resp, index) => resp && <li key={index}>{resp}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
});

export default ModernTemplate;