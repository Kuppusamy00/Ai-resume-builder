import React, { forwardRef } from 'react';
import type { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
  color: string;
}

// FIX: Refactored the Section component to use a separate interface for its props, which can resolve subtle parsing errors.
interface SectionProps {
    title: string;
    children: React.ReactNode;
    iconPath: string;
}

const Section = ({ title, children, iconPath }: SectionProps) => (
    <section className="mb-4">
        <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d={iconPath} />
                </svg>
            </div>
            <h2 className="ml-2 text-base font-bold uppercase tracking-wider text-slate-800">{title}</h2>
        </div>
        {children}
    </section>
);


const InfographicTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data, color }, ref) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div ref={ref} className="bg-white text-[8px] leading-snug" style={{ color }}>
        <div className="grid grid-cols-12">
            <div className="col-span-4 bg-slate-200 p-6">
                <div className="text-center">
                    {personalInfo.photoUrl && (
                        <img src={personalInfo.photoUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border-4 border-white shadow-lg" />
                    )}
                    <h1 className="text-2xl font-bold text-slate-900">{personalInfo.fullName}</h1>
                    <p className="text-slate-700">{experience[0]?.jobTitle || 'Professional'}</p>
                </div>

                <div className="mt-6 border-t border-slate-300 pt-4">
                     {/* FIX: Explicitly pass children as a prop to resolve parsing issue. */}
                     <Section
                        title="Contact"
                        iconPath="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        children={
                            <div className="space-y-1 text-slate-600">
                               {personalInfo.email && <p>{personalInfo.email}</p>}
                               {personalInfo.phoneNumber && <p>{personalInfo.phoneNumber}</p>}
                               {personalInfo.address && <p>{personalInfo.address}</p>}
                               {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="text-blue-600">LinkedIn</a>}
                            </div>
                        }
                    />

                     {skills.length > 0 && (
                        // FIX: Explicitly pass children as a prop to resolve parsing issue.
                        <Section
                            title="Skills"
                            iconPath="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V4m0 16v-2M8 8l1.414-1.414M14.586 14.586L16 16m-7.029-2.971L6 14.586M16 8l-1.414-1.414M6 9.414L7.414 8"
                            children={
                                <ul className="flex flex-wrap gap-1.5">
                                    {skills.map((skill, index) => <li key={index} className="bg-white text-slate-700 rounded-full px-2 py-0.5 text-xs">{skill}</li>)}
                                </ul>
                            }
                        />
                    )}
                </div>
            </div>

            <div className="col-span-8 p-6">
                {summary && (
                    // FIX: Explicitly pass children as a prop to resolve parsing issue.
                    <Section
                        title="Summary"
                        iconPath="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        children={<p className="text-slate-600">{summary}</p>}
                    />
                )}

                {experience.length > 0 && (
                    // FIX: Explicitly pass children as a prop to resolve parsing issue.
                    <Section
                        title="Experience"
                        iconPath="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        children={
                            <div className="space-y-3">
                                {experience.map(exp => (
                                    <div key={exp.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-base text-slate-800">{exp.jobTitle}</h3>
                                        <p className="text-slate-500 text-xs">{exp.startDate} - {exp.endDate}</p>
                                    </div>
                                    <p className="font-semibold text-slate-600 mb-1">{exp.company}</p>
                                    <ul className="list-disc list-outside pl-3 space-y-1 text-slate-600">
                                        {exp.responsibilities.map((resp, i) => resp && <li key={i}>{resp}</li>)}
                                    </ul>
                                    </div>
                                ))}
                            </div>
                        }
                    />
                )}
                
                 {education.length > 0 && (
                    // FIX: Explicitly pass children as a prop to resolve parsing issue.
                    <Section
                        title="Education"
                        iconPath="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        children={
                            <div className="space-y-2">
                                {education.map(edu => (
                                    <div key={edu.id}>
                                    <h3 className="font-bold">{edu.degree} - {edu.institution}</h3>
                                    <p className="text-slate-500">{edu.graduationDate}</p>
                                    </div>
                                ))}
                            </div>
                        }
                    />
                )}
            </div>
        </div>
    </div>
  );
});

export default InfographicTemplate;
