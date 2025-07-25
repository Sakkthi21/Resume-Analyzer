
import React from 'react';
import { ResumeData, WorkExperience, Education, Project } from '../types';
import { Card } from './ui/Card';
import { Tag } from './ui/Tag';

interface ResumeDetailsProps {
  data: ResumeData;
}

const Section: React.FC<{ title: string; children: React.ReactNode, icon?: React.ReactNode }> = ({ title, children, icon }) => (
  <Card>
    <h3 className="flex items-center gap-2 text-lg font-semibold text-indigo-300 mb-3 border-b border-gray-700 pb-2">
      {icon}
      {title}
    </h3>
    {children}
  </Card>
);

const RatingCircle: React.FC<{ rating: number }> = ({ rating }) => {
    const percentage = rating * 10;
    const circumference = 2 * Math.PI * 52;
    const offset = circumference - (percentage / 100) * circumference;
    
    let colorClass = 'text-green-400';
    if (rating < 5) colorClass = 'text-red-400';
    else if (rating < 8) colorClass = 'text-yellow-400';

    return (
        <div className="relative flex items-center justify-center h-32 w-32">
            <svg className="transform -rotate-90" width="120" height="120" viewBox="0 0 120 120">
                <circle className="text-gray-700" strokeWidth="8" stroke="currentColor" fill="transparent" r="52" cx="60" cy="60" />
                <circle
                    className={`${colorClass} transition-all duration-1000 ease-out`}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"
                />
            </svg>
            <span className="absolute text-2xl font-bold text-white">{rating}<span className="text-sm">/10</span></span>
        </div>
    );
};

const ResumeDetails: React.FC<ResumeDetailsProps> = ({ data }) => {
  return (
    <div className="space-y-6">
        {/* Contact & Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <Card>
                    <h2 className="text-2xl font-bold text-white">{data.name || 'N/A'}</h2>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-gray-400 text-sm">
                        {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-indigo-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>{data.email}</a>}
                        {data.phone && <span className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>{data.phone}</span>}
                        {data.linkedin_url && <a href={data.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-indigo-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>LinkedIn</a>}
                        {data.portfolio_url && <a href={data.portfolio_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-indigo-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0l-1.5-1.5a2 2 0 112.828-2.828l1.5 1.5l3-3z" clipRule="evenodd" /><path fillRule="evenodd" d="M6.414 11.414a2 2 0 010 2.828l-3 3a2 2 0 01-2.828-2.828l3-3a2 2 0 012.828 0z" clipRule="evenodd" /></svg>Portfolio</a>}
                    </div>
                    {data.summary && <p className="mt-4 text-gray-300 text-sm leading-relaxed">{data.summary}</p>}
                </Card>
            </div>
             <Card className="flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold text-indigo-300 mb-2">Overall Rating</h3>
                <RatingCircle rating={data.resume_rating} />
            </Card>
        </div>

        {/* AI Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Section title="Areas for Improvement" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>}>
                <p className="text-sm text-gray-300 leading-relaxed">{data.improvement_areas}</p>
            </Section>
            <Section title="Upskill Suggestions" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v1H5V4zM5 8h10a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1V9a1 1 0 011-1z" /></svg>}>
                <div className="flex flex-wrap gap-2">
                    {data.upskill_suggestions.map((skill, i) => <Tag key={i} text={skill} />)}
                </div>
            </Section>
        </div>

        {/* Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Section title="Technical Skills">
                <div className="flex flex-wrap gap-2">
                    {data.technical_skills.map((skill, i) => <Tag key={i} text={skill} />)}
                </div>
            </Section>
            <Section title="Soft Skills">
                 <div className="flex flex-wrap gap-2">
                    {data.soft_skills.map((skill, i) => <Tag key={i} text={skill} color="blue" />)}
                </div>
            </Section>
        </div>
        
        {/* Work Experience */}
        {data.work_experience?.length > 0 && <Section title="Work Experience">
            <div className="space-y-4">
            {data.work_experience.map((exp: WorkExperience, i: number) => (
                <div key={i} className="text-sm">
                    <h4 className="font-bold text-white">{exp.role} @ {exp.company}</h4>
                    <p className="text-xs text-gray-400 mb-1">{exp.duration}</p>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                        {exp.description.map((d, j) => <li key={j}>{d}</li>)}
                    </ul>
                </div>
            ))}
            </div>
        </Section>}

        {/* Education */}
        {data.education?.length > 0 && <Section title="Education">
             <div className="space-y-3">
                {data.education.map((edu: Education, i: number) => (
                    <div key={i} className="text-sm">
                        <h4 className="font-bold text-white">{edu.degree}</h4>
                        <p className="text-gray-400">{edu.institution} - {edu.graduation_year}</p>
                    </div>
                ))}
            </div>
        </Section>}

        {/* Projects */}
        {data.projects?.length > 0 && <Section title="Projects">
             <div className="space-y-4">
                {data.projects.map((proj: Project, i: number) => (
                    <div key={i} className="text-sm">
                        <h4 className="font-bold text-white">{proj.name}</h4>
                        <p className="text-gray-300 my-1">{proj.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {proj.technologies?.map((tech, j) => <Tag key={j} text={tech} />)}
                        </div>
                    </div>
                ))}
            </div>
        </Section>}

        {/* Certifications */}
        {data.certifications?.length > 0 && <Section title="Certifications">
             <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                {data.certifications.map((cert: string, i: number) => (
                    <li key={i}>{cert}</li>
                ))}
            </ul>
        </Section>}
    </div>
  );
};

export default ResumeDetails;
