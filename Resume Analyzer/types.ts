
export interface WorkExperience {
  role: string;
  company: string;
  duration: string;
  description: string[];
}

export interface Education {
  degree: string;
  institution: string;
  graduation_year: string;
}

export interface Project {
    name: string;
    description: string;
    technologies: string[];
}

export interface ResumeData {
  name: string | null;
  email: string | null;
  phone: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  summary: string | null;
  work_experience: WorkExperience[];
  education: Education[];
  technical_skills: string[];
  soft_skills: string[];
  projects: Project[];
  certifications: string[];
  resume_rating: number;
  improvement_areas: string;
  upskill_suggestions: string[];
}

export interface HistoricalResume {
    id: string;
    fileName: string;
    uploadedAt: string;
    analysis: ResumeData;
}
