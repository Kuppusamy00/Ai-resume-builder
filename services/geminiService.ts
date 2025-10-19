// FIX: Import 'Type' for defining response schemas.
import { GoogleGenAI, Type } from "@google/genai";
import type { ResumeData, AIReviewResult, AlteredResumeParts, ParsedResumeData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// FIX: Modified function to accept an optional config object for API calls.
const generateContentWithRetry = async (prompt: string, config?: object) => {
    let retries = 3;
    while (retries > 0) {
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                // FIX: Pass config to the generateContent call.
                ...(config && { config }),
            });
            return response.text;
        } catch (error) {
            console.error("Gemini API call failed, retrying...", error);
            retries--;
            if (retries === 0) throw error;
            await new Promise(res => setTimeout(res, 1000));
        }
    }
    throw new Error("Gemini API call failed after multiple retries");
};

export const parseResumeText = async (resumeText: string): Promise<ParsedResumeData> => {
    const prompt = `You are an expert resume parser. Analyze the following resume text and extract the information into a structured JSON object.
- Extract personal information: full name, email, phone, address, LinkedIn, GitHub, portfolio.
- Extract the professional summary.
- For each job experience, extract job title, company, location, start/end dates, and responsibilities.
- For each education entry, extract institution, degree, field of study, and graduation date.
- Compile a list of all skills.
- Output MUST be a valid JSON object. For dates, use 'YYYY-MM' format if possible.
- If information is missing, use an empty string "" or an empty array [].

Resume Text:
"""
${resumeText}
"""`;

    const responseText = await generateContentWithRetry(prompt, {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                personalInfo: {
                    type: Type.OBJECT,
                    properties: {
                        fullName: { type: Type.STRING },
                        email: { type: Type.STRING },
                        phoneNumber: { type: Type.STRING },
                        address: { type: Type.STRING },
                        linkedIn: { type: Type.STRING },
                        portfolio: { type: Type.STRING },
                        github: { type: Type.STRING },
                    },
                     required: ["fullName", "email", "phoneNumber", "address", "linkedIn", "portfolio", "github"]
                },
                summary: { type: Type.STRING },
                experience: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            jobTitle: { type: Type.STRING },
                            company: { type: Type.STRING },
                            location: { type: Type.STRING },
                            startDate: { type: Type.STRING },
                            endDate: { type: Type.STRING },
                            responsibilities: { type: Type.ARRAY, items: { type: Type.STRING } }
                        },
                        required: ["jobTitle", "company", "location", "startDate", "endDate", "responsibilities"]
                    }
                },
                education: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            institution: { type: Type.STRING },
                            degree: { type: Type.STRING },
                            fieldOfStudy: { type: Type.STRING },
                            graduationDate: { type: Type.STRING }
                        },
                        required: ["institution", "degree", "fieldOfStudy", "graduationDate"]
                    }
                },
                skills: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["personalInfo", "summary", "experience", "education", "skills"]
        }
    });

    try {
        return JSON.parse(responseText);
    } catch (e) {
        console.error("Failed to parse resume text JSON:", e);
        throw new Error("The AI returned an invalid format for the resume. Please check the file content and try again.");
    }
};


export const generateExperienceBulletPoints = async (jobTitle: string, company: string): Promise<string[]> => {
    // FIX: Simplified prompt by removing JSON format instructions.
    const prompt = `You are an expert resume writer. For a person with the job title "${jobTitle}" at "${company}", generate 3-5 concise, achievement-oriented resume bullet points. Use strong action verbs and focus on quantifiable results.`;

    // FIX: Use responseSchema to enforce JSON array output.
    const responseText = await generateContentWithRetry(prompt, {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
        }
    });
    try {
        // FIX: Directly parse the JSON response without cleaning.
        return JSON.parse(responseText);
    } catch (e) {
        console.error("Failed to parse bullet points JSON:", e);
        return [responseText]; // Fallback to raw text
    }
};

export const generateSummary = async (resumeData: ResumeData): Promise<string> => {
    const companyTailoring = resumeData.targetCompany
        ? ` IMPORTANT: Tailor this summary for a role at "${resumeData.targetCompany}". Emphasize skills and experiences relevant to this company's industry and potential values.`
        : '';

    const prompt = `You are a professional career coach. Based on the following resume data, write a compelling and professional summary of 2-4 sentences. Tailor it to highlight the key strengths and experiences.${companyTailoring}

    Resume Data:
    ${JSON.stringify({ experience: resumeData.experience, skills: resumeData.skills })}

    Generate only the summary text.`;

    return await generateContentWithRetry(prompt);
};

export const reviewAndOptimizeResume = async (resumeData: ResumeData, jobDescription: string): Promise<AIReviewResult> => {
    // FIX: Simplified prompt by removing JSON format instructions.
    const prompt = `You are an expert AI resume analyzer. Analyze the provided resume against the job description.
    1. Calculate a 'matchScore' from 0 to 100.
    2. Identify key strengths.
    3. Provide actionable suggestions for improvement.
    4. List important keywords from the job description that are missing in the resume.

    Resume Content:
    ${JSON.stringify(resumeData)}

    Job Description:
    ${jobDescription}`;

    // FIX: Use responseSchema to enforce structured JSON object output.
    const responseText = await generateContentWithRetry(prompt, {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                matchScore: { type: Type.NUMBER },
                strengths: { type: Type.STRING },
                suggestions: { type: Type.STRING },
                missingKeywords: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                }
            },
            required: ["matchScore", "strengths", "suggestions", "missingKeywords"]
        }
    });
    try {
        // FIX: Directly parse the JSON response without cleaning.
        return JSON.parse(responseText);
    } catch (e) {
        console.error("Failed to parse review JSON:", e);
        // Fallback to a structured error
        return {
            matchScore: 0,
            strengths: "Could not parse AI response.",
            suggestions: "There was an error analyzing the resume. Please check the console for details.",
            missingKeywords: []
        };
    }
};

export const alterResumeWithAIFeedback = async (resumeData: ResumeData, reviewResult: AIReviewResult): Promise<AlteredResumeParts> => {
    // FIX: Simplified prompt by removing JSON format instructions.
    const prompt = `You are an expert resume editor. You will be given a resume and an analysis with suggestions and missing keywords.
    Your task is to rewrite the resume's 'summary' and the 'responsibilities' for each 'experience' entry to incorporate the feedback.
    - Seamlessly integrate the missing keywords.
    - Apply the suggestions to strengthen the content.
    - Maintain a professional tone and focus on achievements and metrics.
    - Keep the original structure of the experience objects (id, jobTitle, etc.), only modifying the 'responsibilities' array.

    Original Resume:
    ${JSON.stringify({ summary: resumeData.summary, experience: resumeData.experience })}

    Analysis and Feedback:
    ${JSON.stringify(reviewResult)}`;

    // FIX: Use responseSchema to enforce structured JSON object output.
    const responseText = await generateContentWithRetry(prompt, {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING },
                experience: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.STRING },
                            jobTitle: { type: Type.STRING },
                            company: { type: Type.STRING },
                            location: { type: Type.STRING },
                            startDate: { type: Type.STRING },
                            endDate: { type: Type.STRING },
                            responsibilities: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING }
                            }
                        },
                        required: ["id", "jobTitle", "company", "location", "startDate", "endDate", "responsibilities"]
                    }
                }
            },
            required: ["summary", "experience"]
        }
    });
    try {
        // FIX: Directly parse the JSON response without cleaning.
        return JSON.parse(responseText);
    } catch (e) {
        console.error("Failed to parse altered resume JSON:", e);
        throw new Error("The AI returned an invalid format. Please try again.");
    }
};

export const proofreadText = async (text: string): Promise<string> => {
    if (!text || text.trim().length === 0) {
        return text;
    }
    const prompt = `Correct any spelling and grammar mistakes in the following text. Return only the corrected text, maintaining the original meaning and tone.

Original Text:
"${text}"

Corrected Text:`;

    const responseText = await generateContentWithRetry(prompt);
    // Return the cleaned response, trimming any potential extra whitespace or quotes.
    return responseText.trim().replace(/^"|"$/g, '');
};