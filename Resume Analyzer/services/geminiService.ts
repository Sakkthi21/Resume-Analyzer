
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData } from '../types';

if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const resumeSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING, description: "Full name of the candidate." },
        email: { type: Type.STRING, description: "Email address." },
        phone: { type: Type.STRING, description: "Phone number." },
        linkedin_url: { type: Type.STRING, description: "URL to LinkedIn profile, if available." },
        portfolio_url: { type: Type.STRING, description: "URL to a personal portfolio or website, if available." },
        summary: { type: Type.STRING, description: "A brief professional summary from the resume." },
        work_experience: {
            type: Type.ARRAY,
            description: "List of work experiences.",
            items: {
                type: Type.OBJECT,
                properties: {
                    role: { type: Type.STRING },
                    company: { type: Type.STRING },
                    duration: { type: Type.STRING, description: "e.g., 'Jan 2020 - Present' or '3 years'" },
                    description: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ['role', 'company', 'duration', 'description']
            }
        },
        education: {
            type: Type.ARRAY,
            description: "List of educational qualifications.",
            items: {
                type: Type.OBJECT,
                properties: {
                    degree: { type: Type.STRING },
                    institution: { type: Type.STRING },
                    graduation_year: { type: Type.STRING, description: "Year of graduation or expected graduation." }
                },
                required: ['degree', 'institution', 'graduation_year']
            }
        },
        technical_skills: { type: Type.ARRAY, items: { type: Type.STRING } },
        soft_skills: { type: Type.ARRAY, items: { type: Type.STRING } },
        projects: {
            type: Type.ARRAY,
            description: "List of personal or professional projects mentioned.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    technologies: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ['name', 'description']
            }
        },
        certifications: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of certifications mentioned."},
        resume_rating: { type: Type.INTEGER, description: "Rate the overall quality and presentation of the resume on a scale of 1 to 10." },
        improvement_areas: { type: Type.STRING, description: "A detailed paragraph summarizing key areas for improvement, focusing on clarity, impact, and formatting." },
        upskill_suggestions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of specific technical or soft skills the candidate could learn to improve their profile for common job roles related to their experience." }
    },
    required: ['name', 'email', 'summary', 'work_experience', 'education', 'technical_skills', 'soft_skills', 'projects', 'certifications', 'resume_rating', 'improvement_areas', 'upskill_suggestions']
};

const systemInstruction = `You are an expert technical recruiter and career coach. Your task is to analyze the provided resume text and extract key information into a structured JSON format. You must adhere strictly to the provided JSON schema. If a section (like 'linkedin_url', 'projects', or 'certifications') is not found in the resume, you must return a null value for strings or an empty array for lists. Do not invent information. Your analysis for ratings and improvements should be critical, constructive, and actionable.`;

export const analyzeResume = async (resumeText: string): Promise<ResumeData> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{
                role: "user",
                parts: [{ text: `Here is the resume text:\n\n---\n\n${resumeText}` }]
            }],
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: resumeSchema,
                temperature: 0.2,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);

        // Basic validation
        if (!parsedData || typeof parsedData !== 'object') {
            throw new Error("Invalid JSON structure received from API.");
        }

        return parsedData as ResumeData;

    } catch (error) {
        console.error("Error analyzing resume with Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to analyze resume. The API returned an error: ${error.message}`);
        }
        throw new Error("An unknown error occurred during resume analysis.");
    }
};
