import React, { forwardRef } from 'react';
import type { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
  color: string;
}

const Icon = ({ path, className = "w-3 h-3" }: { path: string, className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d={path} />
    </svg>
);

const CreativeTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data, color }, ref) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div ref={ref} className="bg-white text-[8px] leading-snug grid grid-cols-3" style={{ color }}>
      {/* Sidebar */}
      <div className="col-span-1 bg-slate-800 text-white p-6">
        {personalInfo.photoUrl && (
          <img src={personalInfo.photoUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-slate-500" />
        )}
        <div className="text-center mb-6">
            <h1 className="text-xl font-bold">{personalInfo.fullName}</h1>
            <p className="text-slate-300 text-xs">{experience[0]?.jobTitle || "Professional"}</p>
        </div>
        
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 border-b-2 border-slate-500 pb-1 mb-3">Contact</h2>
        <div className="space-y-2 text-xs text-slate-200">
            {personalInfo.email && <div className="flex items-center gap-2"><Icon path="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> <a href={`mailto:${personalInfo.email}`} className="break-all">{personalInfo.email}</a></div>}
            {personalInfo.phoneNumber && <div className="flex items-center gap-2"><Icon path="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /> {personalInfo.phoneNumber}</div>}
            {personalInfo.address && <div className="flex items-center gap-2"><Icon path="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM12 11a2 2 0 100-4 2 2 0 000 4z" /> {personalInfo.address}</div>}
            {personalInfo.linkedIn && <div className="flex items-center gap-2"><Icon path="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /> <a href={personalInfo.linkedIn} className="break-all">LinkedIn</a></div>}
        </div>

        {skills.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 border-b-2 border-slate-500 pb-1 mb-3">Skills</h2>
            <ul className="flex flex-wrap gap-1.5 text-xs">
                {skills.map((skill, index) => <li key={index} className="bg-slate-600 text-slate-100 rounded px-2 py-0.5">{skill}</li>)}
            </ul>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="col-span-2 p-6">
        {summary && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b-2 border-slate-300 pb-1 mb-2">Profile</h2>
            <p className="text-slate-600">{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mt-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b-2 border-slate-300 pb-1 mb-2">Experience</h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-base text-slate-800">{exp.jobTitle}</h3>
                    <p className="text-slate-500 italic text-xs">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <p className="font-semibold text-slate-600 mb-1">{exp.company} | {exp.location}</p>
                  <ul className="list-disc list-outside pl-3 space-y-1 text-slate-600">
                    {exp.responsibilities.map((resp, index) => resp && <li key={index}>{resp}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="mt-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b-2 border-slate-300 pb-1 mb-2">Education</h2>
            <div className="space-y-2">
              {education.map(edu => (
                <div key={edu.id}>
                  <h3 className="font-bold text-slate-800">{edu.institution}</h3>
                  <p className="text-slate-600">{edu.degree} in {edu.fieldOfStudy}</p>
                  <p className="text-slate-500 italic text-xs">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
});

export default CreativeTemplate;