import { EducationItem, ResearchProject, AchievementItem, SkillCategory, CertificateItem } from './types';

export const PERSONAL_INFO = {
  name: 'Nguyen Tan Hau',
  title: 'Applied Mathematics Researcher',
  subTitle: 'Specializing in Machine Learning, Optimization, and Data Analysis',
  email: 'tanhau7420@gmail.com',
  phone: '(+84) 332-987-619',
  location: 'Can Tho, Vietnam',
  github: 'https://github.com/NguynHau',
  researchGate: 'https://www.researchgate.net/profile/Tan-Hau-Nguyen?ev=hdr_xprf',
  objective: 'With a solid foundation in Applied Mathematics, I aim to pursue research in machine learning, focusing on its mathematical foundations and applications. At the same time, I develop expertise in Data Analysis and apply these methods to solve complex real-world problems. I am currently pursuing a Master’s degree to further strengthen my mathematical research capabilities.',
};

export const EDUCATION_HISTORY: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Master of Applied Mathematics',
    institution: 'Can Tho University, College of Natural Sciences',
    location: 'Can Tho, Vietnam',
    period: 'May 2026 – Present',
    description: 'Advanced coursework in functional analysis, optimization theory, machine learning foundations, and modern mathematical modeling.',
  },
  {
    id: 'edu-2',
    degree: 'Bachelor of Applied Mathematics',
    institution: 'Can Tho University, College of Natural Sciences',
    location: 'Can Tho, Vietnam',
    period: 'Sep 2022 – Feb 2026',
    gpa: '3.71/4.0 (Excellent)',
    thesisTitle: 'Gap Safe Screening Rules for Fast Training of Robust Support Vector Machines under Feature Noise',
    thesisLink: 'https://drive.google.com/file/d/1FTsgyybsdV6t-p85U1HoLVcbLpm9ZyLr/view?usp=sharing',
    transcriptEnglishLink: 'https://drive.google.com/file/d/1vpqlPNcT0PqSL2IoTsAiIBjYr-hFZYxX/view?usp=sharing',
    transcriptVietnameseLink: 'https://drive.google.com/file/d/1QKghqoaoujGIscl0zOaoKZvDqjnC893m/view?usp=sharing',
    description: 'Undergraduate thesis graded 9.7/10. Received rigorous training in calculus, linear algebra, numerical analysis, probability, and mathematical statistics.',
  },
  {
    id: 'edu-3',
    degree: 'Student Exchange Program',
    institution: 'Universiti Brunei Darussalam',
    location: 'Darussalam, Brunei',
    period: 'Jun 2025',
    description: 'Short-term academic exchange program focusing on international scientific collaboration, biodiversity preservation, and sustainable development.',
  },
];

export const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: 'research-1',
    title: 'Gap Safe Screening Rules for Fast Training of Robust Support Vector Machines under Feature Noise',
    authors: 'Nguyen Tan Hau (First Author)',
    status: 'Under Review',
    year: '2026',
    pdfLink: 'https://drive.google.com/file/d/1Hr_HS2js9r8kj59ZnZsw81_MhkHg_8jg/view?usp=sharing',
    description: 'Developed a novel mathematical screening framework for robust support vector machines (R-SVM) under bounded feature uncertainty. By proving safe duality gap rules, we dynamically eliminate inactive training coordinates before solving, yielding massive training acceleration and computing savings.',
    contributions: [
      'Mathematical Formulation & Safe screening proofs',
      'Dual coordinate optimization algorithm design & implementation',
      'Comparative benchmarking on high-dimensional datasets',
      'Writing and formatting the research manuscript',
    ],
    keywords: ['Robust SVM', 'Feature Noise', 'Safe Screening Rules', 'Duality Gap', 'Nonsmooth Optimization'],
  },
  {
    id: 'research-2',
    title: 'Regularity of Collections of Set-Valued Mappings',
    authors: 'Co-author',
    status: 'Accepted',
    year: '2025',
    period: 'Jul 2025 – Dec 2025',
    pdfLink: 'https://drive.google.com/file/d/1TGoMVdPAfn9pevYwV4SNwLtAOy0aCZo8/view?usp=sharing',
    description: 'University-level Student Scientific Research Project. Investigated modern regularity and transversality properties of set-valued mappings. Established geometric and metric characterizations for convex-valued mappings using tools from variational analysis and nonsmooth optimization.',
    contributions: [
      'Studied metric regularity and coderivative bounds',
      'Investigated intersection formulas for normal cones',
      'Drafted technical proofs and academic reports in LaTeX',
    ],
    keywords: ['Set-Valued Mappings', 'Metric Regularity', 'Variational Analysis', 'Nonsmooth Optimization'],
  },
  {
    id: 'research-3',
    title: 'Solving Risk-Return Tradeoff Model with Galois Connection',
    authors: 'Co-author',
    status: 'Under Review',
    year: '2025',
    pdfLink: 'https://drive.google.com/file/d/1pB4SkXS5nD2aWeobBj1XnQsYBPrhxOAH/view?usp=sharing',
    description: 'Explored a modern portfolio optimization risk-return tradeoff model solved via the algebraic structures of Galois Connections. Proved theoretical linkages between lattice theory, ordered sets, and Pareto frontier computations.',
    contributions: [
      'Formulated risk-return constraints using Galois order morphisms',
      'Validated numerical results on historical market data using Python',
      'Co-authored research proofs and final draft',
    ],
    keywords: ['Risk-Return Tradeoff', 'Galois Connection', 'Lattice Theory', 'Portfolio Optimization'],
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'Academic Merit Scholarship',
    issuer: 'Can Tho University',
    period: '2022–2023; 2024–2025',
    description: 'Awarded multiple semesters for achieving top-ranking academic performance in Applied Mathematics.',
  },
  {
    id: 'ach-2',
    title: 'Student Exchange Scholarship',
    issuer: 'Can Tho University & Universiti Brunei Darussalam',
    period: 'Jun 2025',
    description: 'Fully-funded grant to represent Can Tho University at the Student Exchange Program in Brunei.',
  },
  {
    id: 'ach-3',
    title: 'University Student Scientific Research Grant',
    issuer: 'Can Tho University',
    period: '2025',
    description: 'Secured competitive university funding for the research project on regularity of set-valued mappings.',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'skills-lang',
    name: 'Programming Languages',
    skills: ['Python', 'R', 'C/C++', 'SQL', 'MATLAB'],
  },
  {
    id: 'skills-ds',
    name: 'Mathematical & Data Science',
    skills: ['Machine Learning', 'Statistical Analysis', 'Time Series Forecasting (ARIMA)', 'Nonsmooth Optimization', 'Variational Analysis'],
  },
  {
    id: 'skills-tools',
    name: 'Visualization & Tools',
    skills: ['Power BI', 'Google Colab', 'VS Code', 'SPSS', 'Git & GitHub'],
  },
  {
    id: 'skills-writing',
    name: 'Scientific Writing',
    skills: ['LaTeX', 'Typst', 'Markdown'],
  },
  {
    id: 'skills-human-lang',
    name: 'Languages',
    skills: ['Vietnamese (Native)', 'English (B2 CEFR Certified)'],
  },
];

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert-1',
    title: 'Machine Learning: Mathematical Foundations and Practical Applications',
    issuer: 'Can Tho University',
    date: 'Apr 2024',
  },
  {
    id: 'cert-2',
    title: 'Winter School on Quantum Computation',
    issuer: 'Vietnam Institute for Advanced Study in Mathematics (VIASM) & HCMUT - VNU',
    date: 'Dec 2025',
  },
  {
    id: 'cert-3',
    title: 'English B2 CEFR Certificate',
    issuer: 'British Council',
    date: '2025',
    link: 'https://credentials.britishcouncil.org/c399fc67-bbce-45f3-a42a-8ac40b25ca13?key=c77986e6be1a050a5b83137a9815a697c769a48cc664e8f5c5dfca35f55993e1#acc.KN7QShCF',
  },
  {
    id: 'cert-4',
    title: '"Student with 5 Good Criteria" (Sinh viên 5 tốt) - University Level',
    issuer: 'Can Tho University',
    date: '2024–2025',
  },
  {
    id: 'cert-5',
    title: '"Student with 5 Good Criteria" (Sinh viên 5 tốt) - College Level',
    issuer: 'College of Natural Sciences, CTU',
    date: '2023–2024; 2024–2025',
  },
  {
    id: 'cert-6',
    title: 'Green Stewardship: Preserving Biodiversity and Advancing Sustainable Development',
    issuer: 'Universiti Brunei Darussalam',
    date: 'Jun 2025',
  },
  {
    id: 'cert-7',
    title: 'Future Ocean Changemakers Youth Forum',
    issuer: 'Ocean Exploration and Science Network',
    date: 'Jun 2025',
  },
];
