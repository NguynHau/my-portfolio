export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpa?: string;
  thesisTitle?: string;
  thesisLink?: string;
  transcriptEnglishLink?: string;
  transcriptVietnameseLink?: string;
  description?: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  authors: string;
  status: 'Under Review' | 'Accepted' | 'Published';
  year: string;
  period?: string;
  pdfLink: string;
  journal?: string;
  contributions: string[];
  description: string;
  keywords: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  period: string;
  description?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
}
