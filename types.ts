export interface PersonalInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  linkedIn: string;
  portfolio: string;
  photoUrl: string;
  github: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface Education {
  id:string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  graduationDate: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  summary: string;
  targetCompany?: string;
}

export interface AIReviewResult {
    matchScore: number;
    strengths: string;
    suggestions: string;
    missingKeywords: string[];
}

export interface AlteredResumeParts {
    summary: string;
    experience: Experience[];
}

// Type for the result of parsing a resume from text
export type ParsedResumeData = Omit<ResumeData, 'experience' | 'education' | 'personalInfo' | 'targetCompany'> & {
    personalInfo: Omit<PersonalInfo, 'photoUrl'>;
    experience: Omit<Experience, 'id'>[];
    education: Omit<Education, 'id'>[];
};