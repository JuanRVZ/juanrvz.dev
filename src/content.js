// Confirmed personal content. Empty URLs and screenshot sources stay unpublished.
// Add verification URLs in certifications[].url and project URLs in projects[].repository.
export const profile = {
  "name": "Juan Ramón Vaz León",
  "role": "SAP ABAP Cloud & BTP Developer",
  "headline": "Backend development · PHP / Laravel · Python",
  "summary": "Backend development experience in PHP and Laravel, systems administration and API integrations. Now focused on SAP ABAP Cloud, RAP and SAP BTP.",
  "about": [
    "My background is in backend development with PHP and Laravel, including clinical software and legacy applications. I have also built API integrations and administered systems for local businesses.",
    "I now specialize in SAP ABAP Cloud, RAP and SAP BTP. My technical work connects CDS data models, business behavior and OData services with Fiori Elements interfaces.",
    "I value understanding systems end-to-end and writing maintainable software. I continue developing my Python skills alongside my SAP specialization."
  ],
  "location": "Andalusia, Spain",
  "email": "juan@juanrvz.dev",
  "phone": "+34 652 263 988",
  "linkedin": "https://www.linkedin.com/in/juan-ramon-vaz-leon/",
  "github": "https://github.com/JuanRVZ",
  "cv": "/cv/juan-ramon-vaz-leon-en.pdf",
  "availability": "Open to SAP ABAP Cloud / BTP opportunities",
  "workPreference": "Open to remote / hybrid opportunities"
};

export const experience = [
  {
    "company": "Mulhacen Soft",
    "role": "PHP Developer",
    "period": "Apr 2025 – Jul 2026",
    "description": "Developed PHP and Laravel software in the clinical and healthcare sector, working across newer applications and legacy codebases.",
    "achievements": [
      "Built application functionality with PHP and Laravel.",
      "Worked on existing legacy projects alongside newer development work.",
      "Developed familiarity with clinical and healthcare software through these projects."
    ]
  },
  {
    "company": "NAIRN TELECOM SL",
    "role": "Application Developer | Systems Administrator",
    "period": "Sep 2022 – Apr 2025",
    "description": "Developed web and mobile applications, process automation and system integrations alongside IT infrastructure administration.",
    "achievements": [
      "Built applications with PHP, Laravel, Node.js, Python, Java and Android, and integrated systems through APIs.",
      "Administered Windows infrastructure and Active Directory, including users, permissions and system maintenance.",
      "Managed technical incidents and support tickets with Jira and Asana."
    ]
  },
  {
    "company": "Agilia Center",
    "role": "Web Developer",
    "period": "Mar 2021 – Jul 2022",
    "description": "Developed e-commerce features and payment integrations, working with a client from requirements analysis through delivery.",
    "achievements": [
      "Implemented features with Symfony, CodeIgniter and Node.js, including integrations with multiple payment gateways.",
      "Coordinated requirements and delivery through daily client meetings.",
      "Handled incidents with Asana and YouTrack and improved platform performance and usability."
    ]
  },
  {
    "company": "ABACO S&M INTEGRALES SL",
    "role": "Systems Administrator",
    "period": "Nov 2020 – Mar 2021",
    "description": "Administered IT infrastructure for multiple local businesses, with hands-on support at client premises.",
    "achievements": [
      "Supervised systems and infrastructure across local companies.",
      "Diagnosed and repaired computer equipment during on-site support.",
      "Installed networks at client premises."
    ]
  }
];

export const projects = [
  {
    "title": "Incident Management – SAP RAP",
    "type": "SAP / TRAINING PROJECT",
    "description": "An incident management application built with RAP, with an action to close incidents and an OData V4 service for the Fiori Elements interface.",
    "technologies": [
      "ABAP Cloud",
      "RAP",
      "CDS Views",
      "OData V4",
      "Fiori Elements"
    ],
    "details": [
      "Modeled incidents as a CDS root entity.",
      "Defined managed behavior with actions and validations.",
      "Implemented an action to close incidents.",
      "Exposed the application through a Service Definition and Service Binding."
    ],
    "repository": "",
    "url": "",
    "screenshot": {
      "src": "",
      "alt": "",
      "width": 1600,
      "height": 900
    }
  },
  {
    "title": "Pharmacy Management – ABAP OO",
    "type": "ABAP / TRAINING PROJECT",
    "description": "An object-oriented project modeling pharmacy products and operations through interfaces, inheritance and polymorphism.",
    "technologies": [
      "ABAP Objects",
      "Interfaces",
      "Polymorphism"
    ],
    "details": [
      "Modeled products and operations with classes, interfaces and inheritance.",
      "Used polymorphism to work with different product types.",
      "Processed internal tables with FILTER and REDUCE.",
      "Handled exceptions in application logic."
    ],
    "repository": "",
    "url": "",
    "screenshot": {
      "src": "",
      "alt": "",
      "width": 1600,
      "height": 900
    }
  },
  {
    "title": "Rock Paper Scissors – SAP RAP",
    "type": "SAP / TRAINING PROJECT",
    "description": "A RAP application with a custom Play action that runs game logic in the behavior implementation.",
    "technologies": [
      "RAP",
      "CDS",
      "Fiori Elements"
    ],
    "details": [
      "Defined a custom Play action in the Behavior Definition.",
      "Implemented the game logic in the behavior implementation.",
      "Configured the interface through a Metadata Extension.",
      "Exposed the application through a Service Binding."
    ],
    "repository": "",
    "url": "",
    "screenshot": {
      "src": "",
      "alt": "",
      "width": 1600,
      "height": 900
    }
  },
  {
    "title": "Python & Algorithms",
    "type": "PYTHON / PRACTICE",
    "description": "Programming exercises covering algorithms, data structures and file handling, with a focus on problem solving.",
    "technologies": [
      "Python",
      "Data structures",
      "Algorithms"
    ],
    "details": [
      "Practiced working with data structures.",
      "Implemented algorithms to solve programming exercises.",
      "Worked with file input and output."
    ],
    "repository": "",
    "url": "",
    "screenshot": {
      "src": "",
      "alt": "",
      "width": 1600,
      "height": 900
    }
  }
];

export const technologies = [
  {
    "category": "SAP development",
    "items": [
      "ABAP Cloud",
      "RAP",
      "CDS",
      "OData",
      "Fiori Elements",
      "ABAP Objects"
    ]
  },
  {
    "category": "SAP platform",
    "items": [
      "SAP BTP",
      "BTP administration",
      "Cloud Foundry",
      "SAP Build Work Zone"
    ]
  },
  {
    "category": "Backend",
    "items": [
      "PHP",
      "Laravel",
      "REST APIs",
      "SQL",
      "Python"
    ]
  },
  {
    "category": "Systems & tools",
    "items": [
      "Linux",
      "Git",
      "Docker",
      "Windows / Active Directory",
      "Networking",
      "Proxmox"
    ]
  }
];

export const certifications = [
  {
    "title": "SAP Certified Associate – Back-End Developer – ABAP Cloud",
    "organization": "SAP",
    "date": "",
    "url": ""
  },
  {
    "title": "SAP Certified Associate – SAP BTP Administrator",
    "organization": "SAP",
    "date": "",
    "url": ""
  }
];

export const education = [
  {
    "title": "Bachelor’s Degree in Computer Engineering",
    "organization": "Universitat Oberta de Catalunya (UOC)",
    "date": "2025 – IN PROGRESS",
    "url": ""
  },
  {
    "title": "Higher Technician in Web Application Development (DAW)",
    "organization": "IES La Arboleda",
    "description": "Official Spanish qualification — Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Web.",
    "date": "2019 – 2021",
    "url": ""
  },
  {
    "title": "Technician in Microcomputer Systems and Networks (SMR)",
    "organization": "IES La Marisma",
    "description": "Official Spanish qualification — Ciclo Formativo de Grado Medio en Sistemas Microinformáticos y Redes.",
    "date": "2014 – 2016",
    "url": ""
  }
];

export const additionalExperience = [
  {
    "company": "ServiSecuritas",
    "role": "Services Assistant",
    "period": "Jan 2018 - Sep 2018"
  },
  {
    "company": "Comercial Eléctrica Onubense S.A. (Ceosa)",
    "role": "Online Sales",
    "period": "Mar 2017 - Jun 2017"
  }
];

export const languages = [
  {
    "name": "Spanish",
    "level": "Native"
  },
  {
    "name": "English",
    "level": "B2 - Professional working proficiency"
  }
];
