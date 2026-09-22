// Confirmed personal content. See CONTENT.md for collection schemas.
export const profile = {
  name: "Juan Ramón Vaz León",
  role: "Software Developer",
  headline: "SAP ABAP Cloud & BTP · Backend · Python",
  summary:
    "Backend development experience, now focused on SAP ABAP Cloud and SAP BTP. Building on a background in web applications, integrations and systems administration.",
  about: [
    "I’m a software developer focused on backend development and enterprise software. My current specialization is SAP ABAP Cloud and SAP BTP.",
    "I enjoy understanding how systems work end-to-end and building reliable software. Alongside my SAP work, I’m developing my Python skills and studying AI Engineering to expand my technical depth.",
  ],
  location: "Seville, Spain",
  email: "juan@juanrvz.dev",
  linkedin:
    "https://www.linkedin.com/in/juan-ramon-vaz-leon/",
  github: "https://github.com/JuanRVZ",
  cv: "",
};
// Employment and education verified against the supplied LinkedIn profile PDF.
export const experience = [
  {
    company: "Mulhacen Soft",
    role: "PHP Developer",
    period: "Apr 2025 – Jul 2026",
    description:
      "Worked on software projects in the clinical and healthcare sector, combining Laravel and PHP development with work on existing legacy applications.",
    achievements: [
      "Developed applications using Laravel and PHP within a clinical and healthcare context.",
      "Worked with legacy projects, building familiarity with existing codebases alongside more recent development work.",
      "Gained experience in the clinical and healthcare domain through the software projects I worked on.",
    ],
  },
  {
    company: "NAIRN TELECOM SL",
    role: "Application Developer | Systems Administrator",
    period: "Sep 2022 – Apr 2025",
    description:
      "Developed web and mobile applications, process automation and system integrations alongside IT infrastructure administration.",
    achievements: [
      "Built applications with PHP, Laravel, Node.js, Python, Java and Android, and integrated systems through APIs.",
      "Administered Windows infrastructure and Active Directory, including users, permissions and system maintenance.",
      "Managed technical incidents and support tickets with Jira and Asana.",
    ],
  },
  {
    company: "Agilia Center",
    role: "Web Developer",
    period: "Mar 2021 – Jul 2022",
    description:
      "Developed e-commerce features and payment integrations, working with a client from requirements analysis through delivery.",
    achievements: [
      "Implemented features with Symfony, CodeIgniter and Node.js, including integrations with multiple payment gateways.",
      "Coordinated requirements and delivery through daily client meetings.",
      "Handled incidents with Asana and YouTrack and improved platform performance and usability.",
    ],
  },
  {
    company: "ABACO S&M INTEGRALES SL",
    role: "Systems Administrator",
    period: "Nov 2020 – Mar 2021",
    description:
      "Supervised IT infrastructure for multiple local businesses, combining systems administration with on-site technical support.",
    achievements: [
      "Oversaw IT infrastructure across multiple companies in the local area.",
      "Provided on-site support and repaired computer equipment.",
      "Carried out network installations at client premises.",
    ],
  },
];
// Descriptive categories of training work, not invented product names.
export const projects = [
  {
    title: "SAP RAP applications",
    type: "TRAINING / SAP",
    description:
      "CRUD and business-action applications developed during training, using CDS, behavior definitions, service bindings and Fiori Elements.",
    contribution:
      "Practice connecting data models, backend behavior and an application interface.",
    technologies: ["ABAP Cloud", "RAP", "CDS", "Fiori Elements"],
    url: "",
    repository: "",
  },
  {
    title: "Object-oriented ABAP",
    type: "EXERCISES / BACKEND",
    description:
      "Object-oriented ABAP exercises and backend logic, developed as part of my technical training.",
    technologies: ["ABAP", "ABAP Objects", "Open SQL"],
    url: "",
    repository: "",
  },
  {
    title: "Python & algorithms",
    type: "PRACTICE / PYTHON",
    description:
      "Python exercises and algorithm practice as I continue developing my programming and problem-solving skills.",
    technologies: ["Python", "Algorithms"],
    url: "",
    repository: "",
  },
];
export const technologies = [
  {
    category: "SAP development",
    items: [
      "ABAP / ABAP Cloud",
      "ABAP Objects",
      "Open SQL",
      "CDS",
      "RAP",
      "Behavior definitions",
      "Service definitions & bindings",
      "Metadata extensions",
    ],
  },
  {
    category: "SAP platform",
    items: [
      "SAP BTP",
      "BTP administration",
      "Cloud Foundry",
      "SAP Build Work Zone",
    ],
  },
  {
    category: "Backend & web",
    items: [
      "Python",
      "PHP",
      "Laravel",
      "SQL",
      "REST APIs",
      "HTML / CSS / JavaScript",
    ],
  },
  {
    category: "Tools & infrastructure",
    items: ["Git", "GitHub", "Docker", "Linux", "Proxmox"],
  },
];
export const certifications = [
  {
    title: "SAP Certified – Back-End Developer – ABAP Cloud",
    organization: "SAP",
    date: "",
    url: "",
  },
  {
    title: "SAP Certified – SAP BTP Administrator",
    organization: "SAP",
    date: "",
    url: "",
  },
];
export const education = [
  {
    title: "Bachelor’s Degree in Computer Engineering",
    organization: "Universitat Oberta de Catalunya (UOC)",
    date: "2025 – IN PROGRESS",
    url: "",
  },
  {
    title: "Higher Technician in Web Application Development (DAW)",
    organization: "IES La Arboleda",
    description:
      "Official Spanish qualification — Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Web.",
    date: "2019 – 2021",
    url: "",
  },
  {
    title: "Technician in Microcomputer Systems and Networks (SMR)",
    organization: "IES La Marisma",
    description:
      "Official Spanish qualification — Ciclo Formativo de Grado Medio en Sistemas Microinformáticos y Redes.",
    date: "2014 – 2016",
    url: "",
  },
];
