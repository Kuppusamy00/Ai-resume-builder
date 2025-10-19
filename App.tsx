import React, { useState, useRef } from 'react';
import type { ResumeData, PersonalInfo, Experience, Education, AlteredResumeParts } from './types';
import { parseResumeText } from './services/geminiService';
import PersonalInfoStep from './components/steps/PersonalInfoStep';
import ExperienceStep from './components/steps/ExperienceStep';
import EducationStep from './components/steps/EducationStep';
import SkillsStep from './components/steps/SkillsStep';
import SummaryStep from './components/steps/SummaryStep';
import ReviewStep from './components/steps/ReviewStep';
import StepIndicator from './components/StepIndicator';
import ResumePreview from './components/ResumePreview';
import { Button } from './components/common/FormElements';

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    linkedIn: '',
    portfolio: '',
    photoUrl: '',
    github: '',
  },
  experience: [
    { id: crypto.randomUUID(), jobTitle: '', company: '', location: '', startDate: '', endDate: '', responsibilities: [''] },
  ],
  education: [
    { id: crypto.randomUUID(), institution: '', degree: '', fieldOfStudy: '', graduationDate: '' },
  ],
  skills: [],
  summary: '',
  targetCompany: '',
};

const demoData: ResumeData = {
  personalInfo: {
    fullName: "Jane Smith",
    email: "jane.smith@email.com",
    phoneNumber: "123-456-7890",
    address: "New York, NY",
    linkedIn: "https://linkedin.com/in/jane-smith",
    portfolio: "https://janesmith.dev",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    github: "https://github.com/jane-smith",
  },
  experience: [
    {
      id: "exp1",
      jobTitle: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      location: "Mountain View, CA",
      startDate: "2021-01",
      endDate: "Present",
      responsibilities: [
        "Led a team of 5 engineers to develop a new scalable microservices architecture, improving system reliability by 30%.",
        "Engineered a real-time data processing pipeline using Kafka and Spark, reducing data latency from 15 minutes to under 10 seconds.",
        "Collaborated with product managers to define feature requirements and deliverables for a flagship SaaS product."
      ]
    },
    {
      id: "exp2",
      jobTitle: "Software Engineer",
      company: "Innovate Co.",
      location: "Palo Alto, CA",
      startDate: "2018-06",
      endDate: "2020-12",
      responsibilities: [
        "Developed and maintained RESTful APIs for the company's core web application using Node.js and Express.",
        "Implemented a new user authentication system with OAuth 2.0, enhancing security and user experience.",
        "Wrote unit and integration tests, achieving 95% code coverage and significantly reducing production bugs."
      ]
    }
  ],
  education: [
    {
      id: "edu1",
      institution: "State University",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      graduationDate: "2018-05"
    }
  ],
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "SQL", "NoSQL"],
  summary: "Results-driven Senior Software Engineer with 5+ years of experience in designing, developing, and deploying scalable and high-performance applications. Proficient in cloud computing, microservices architecture, and agile methodologies. Seeking to leverage expertise in building robust software solutions to contribute to a dynamic engineering team."
};

const stepLabels = [
    'Personal Info',
    'Experience',
    'Education',
    'Skills',
    'Summary',
    'Review',
];

const TEMPLATES = [
  { id: 'minimalist', name: 'Minimalist' },
  { id: 'modern', name: 'Modern' },
  { id: 'professional', name: 'Professional' },
  { id: 'creative', name: 'Creative' },
  { id: 'technical', name: 'Technical' },
  { id: 'corporate', name: 'Corporate' },
  { id: 'academic', name: 'Academic' },
  { id: 'elegant', name: 'Elegant' },
  { id: 'bold', name: 'Bold' },
  { id: 'compact', name: 'Compact' },
  { id: 'swiss', name: 'Swiss' },
  { id: 'timeline', name: 'Timeline' },
  { id: 'infographic', name: 'Infographic' },
];

const FONTS = [
  'Inter', 'Roboto', 'Lato', 'Montserrat', 'Open Sans', 'Merriweather', 'Playfair Display', 'Source Sans Pro', 'Poppins', 'Lora'
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [template, setTemplate] = useState(TEMPLATES[0].id);
  const [font, setFont] = useState(FONTS[0]);
  const [color, setColor] = useState('#334155');

  const totalSteps = 6;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const updateExperience = (experienceData: Experience[]) => {
    setResumeData(prev => ({ ...prev, experience: experienceData }));
  };

  const updateEducation = (educationData: Education[]) => {
    setResumeData(prev => ({ ...prev, education: educationData }));
  };

  const updateSkills = (skillsData: string[]) => {
    setResumeData(prev => ({ ...prev, skills: skillsData }));
  };

  const updateSummary = (summary: string) => {
    setResumeData(prev => ({ ...prev, summary }));
  };
  
  const updateTargetCompany = (company: string) => {
      setResumeData(prev => ({ ...prev, targetCompany: company}));
  };

  const updateResumeWithAI = (updates: AlteredResumeParts) => {
    setResumeData(prev => ({
      ...prev,
      summary: updates.summary,
      // FIX: Ensure experience array maintains its shape by merging responsibilities
      experience: prev.experience.map(exp => {
          const updatedExp = updates.experience.find(u => u.id === exp.id);
          return updatedExp ? { ...exp, responsibilities: updatedExp.responsibilities } : exp;
      }),
    }));
  };

  const loadDemoData = () => {
    setResumeData(demoData);
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    try {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const arrayBuffer = e.target?.result as ArrayBuffer;
            if (!arrayBuffer) {
                alert("Could not read file content.");
                setIsParsing(false);
                return;
            }

            try {
                // @ts-ignore - pdfjsLib is loaded from a CDN in index.html
                const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                let fullText = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map((item: any) => item.str).join(' ');
                    fullText += pageText + '\n';
                }

                if (!fullText.trim()) {
                    alert("Could not extract text from the PDF. Please ensure it's a text-based PDF and not an image.");
                    setIsParsing(false);
                    return;
                }

                const parsedData = await parseResumeText(fullText);
                const completeData: ResumeData = {
                    ...initialResumeData, // Start with a clean slate
                    ...parsedData,
                    personalInfo: {
                        ...initialResumeData.personalInfo,
                        ...parsedData.personalInfo,
                    },
                    experience: parsedData.experience.map(exp => ({ ...exp, id: crypto.randomUUID() })),
                    education: parsedData.education.map(edu => ({ ...edu, id: crypto.randomUUID() })),
                };
                setResumeData(completeData);
                setCurrentStep(1); // Go to first step for review
                alert("Resume parsed successfully!");
            } catch (parseError) {
                console.error("Failed to parse resume:", parseError);
                let errorMessage = "Error parsing resume. Please ensure it is a valid, text-based PDF.";
                if (parseError instanceof Error) {
                    errorMessage += ` Details: ${parseError.message}`;
                }
                alert(errorMessage);
            } finally {
                setIsParsing(false);
            }
        };
        reader.readAsArrayBuffer(file);
    } catch (error) {
        console.error("Failed to read file:", error);
        alert("Could not read the selected file.");
        setIsParsing(false);
    }
    
    // Reset file input value to allow re-uploading the same file
    event.target.value = '';
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep data={resumeData.personalInfo} updateData={updatePersonalInfo} onNext={nextStep} onPrev={prevStep} />;
      case 2:
        return <ExperienceStep data={resumeData.experience} updateData={updateExperience} onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <EducationStep data={resumeData.education} updateData={updateEducation} onNext={nextStep} onPrev={prevStep} />;
      case 4:
        return <SkillsStep data={resumeData.skills} updateData={updateSkills} onNext={nextStep} onPrev={prevStep} />;
      case 5:
        return <SummaryStep resumeData={resumeData} updateData={updateSummary} updateTargetCompany={updateTargetCompany} onNext={nextStep} onPrev={prevStep} />;
      case 6:
        return <ReviewStep resumeData={resumeData} updateResumeWithAI={updateResumeWithAI} onNext={() => alert("Resume building complete!")} onPrev={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-100 text-slate-800 font-sans p-4 md:p-8">
      <header className="text-center mb-8 max-w-screen-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-700 text-transparent bg-clip-text">
          AI Resume Builder
        </h1>
        <p className="text-slate-500 mt-2">Create a professional resume with the help of Gemini AI</p>
        <div className="mt-6 flex justify-center items-center flex-wrap gap-x-6 gap-y-4">
            <button
                onClick={handleUploadClick}
                disabled={isParsing}
                className="bg-purple-600 text-white hover:bg-purple-700 font-semibold px-3 py-1.5 text-sm rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-wait"
            >
                {isParsing ? 'Parsing PDF...' : 'Upload PDF Resume'}
            </button>
             <button
                onClick={loadDemoData}
                disabled={isParsing}
                className="bg-indigo-600 text-white hover:bg-indigo-700 font-semibold px-3 py-1.5 text-sm rounded-md transition-colors duration-200 disabled:opacity-50"
            >
                Load Demo Data
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="application/pdf"
            />
            <div className="hidden sm:block border-l border-slate-300 h-6"></div>
            <div className="flex items-center gap-2">
                <label htmlFor="template-select" className="text-sm font-medium text-slate-600">Template:</label>
                <select id="template-select" value={template} onChange={(e) => setTemplate(e.target.value)} className="bg-white border-slate-300 text-slate-900 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-sm py-1.5 px-2">
                    {TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="font-select" className="text-sm font-medium text-slate-600">Font:</label>
                <select id="font-select" value={font} onChange={(e) => setFont(e.target.value)} className="bg-white border-slate-300 text-slate-900 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-sm py-1.5 px-2">
                    {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="font-color-picker" className="text-sm font-medium text-slate-600">Color:</label>
                <input
                    id="font-color-picker"
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-8 h-8 p-0.5 bg-white border border-slate-300 rounded-md cursor-pointer"
                    title="Select Font Color"
                />
            </div>
        </div>
        <div className="mt-10">
          <StepIndicator currentStep={currentStep} steps={stepLabels} />
        </div>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-xl mx-auto md:items-start">
        <div className="bg-white rounded-xl shadow-2xl">
          {renderStep()}
        </div>
        <div className="md:sticky md:top-8">
          <ResumePreview resumeData={resumeData} template={template} font={font} color={color} />
        </div>
      </main>
      <footer className="text-center mt-12 py-4 max-w-screen-xl mx-auto">
        <p className="text-sm text-slate-500">
          Powered by Google Gemini AI
        </p>
      </footer>
    </div>
  );
}

export default App;