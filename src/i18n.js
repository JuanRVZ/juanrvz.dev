import * as content from "./content.js";

const es = {
  "Software Developer": "Desarrollador de software",
  "Backend development experience, now focused on SAP ABAP Cloud and SAP BTP. Building on a background in web applications, integrations and systems administration.":
    "Experiencia en desarrollo backend, ahora centrado en SAP ABAP Cloud y SAP BTP. Con una base en aplicaciones web, integraciones y administración de sistemas.",
  "I’m a software developer focused on backend development and enterprise software. My current specialization is SAP ABAP Cloud and SAP BTP.":
    "Soy desarrollador de software, centrado en backend y software empresarial. Mi especialización actual es SAP ABAP Cloud y SAP BTP.",
  "I enjoy understanding how systems work end-to-end and building reliable software. Alongside my SAP work, I’m developing my Python skills and studying AI Engineering to expand my technical depth.":
    "Me gusta entender cómo funcionan los sistemas de principio a fin y construir software fiable. Además de mi trabajo con SAP, sigo desarrollando mis conocimientos de Python y estudiando ingeniería de IA para profundizar en mi formación técnica.",
  "Seville, Spain": "Sevilla, España",
  "PHP Developer": "Desarrollador PHP",
  "Apr 2025 – Jul 2026": "Abr 2025 – Jul 2026",
  "Worked on software projects in the clinical and healthcare sector, combining Laravel and PHP development with work on existing legacy applications.":
    "Trabajé en proyectos de software del ámbito clínico y sanitario, combinando desarrollo con Laravel y PHP con trabajo sobre aplicaciones legacy.",
  "Developed applications using Laravel and PHP within a clinical and healthcare context.":
    "Desarrollé aplicaciones con Laravel y PHP en el ámbito clínico y sanitario.",
  "Worked with legacy projects, building familiarity with existing codebases alongside more recent development work.":
    "Trabajé con proyectos legacy, familiarizándome con bases de código existentes junto con desarrollos más recientes.",
  "Gained experience in the clinical and healthcare domain through the software projects I worked on.":
    "Adquirí experiencia en el sector clínico y sanitario a través de los proyectos de software en los que participé.",
  "Application Developer | Systems Administrator":
    "Desarrollador de aplicaciones | Administrador de sistemas",
  "Sep 2022 – Apr 2025": "Sep 2022 – Abr 2025",
  "Developed web and mobile applications, process automation and system integrations alongside IT infrastructure administration.":
    "Desarrollé aplicaciones web y móviles, automatizaciones e integraciones de sistemas, junto con tareas de administración de infraestructura informática.",
  "Built applications with PHP, Laravel, Node.js, Python, Java and Android, and integrated systems through APIs.":
    "Desarrollé aplicaciones con PHP, Laravel, Node.js, Python, Java y Android, e integré sistemas mediante APIs.",
  "Administered Windows infrastructure and Active Directory, including users, permissions and system maintenance.":
    "Administré infraestructura Windows y Active Directory, incluyendo usuarios, permisos y mantenimiento de sistemas.",
  "Managed technical incidents and support tickets with Jira and Asana.":
    "Gestioné incidencias técnicas y solicitudes de soporte con Jira y Asana.",
  "Web Developer": "Desarrollador web",
  "Developed e-commerce features and payment integrations, working with a client from requirements analysis through delivery.":
    "Desarrollé funcionalidades de comercio electrónico e integraciones de pago, trabajando con el cliente desde el análisis de requisitos hasta la entrega.",
  "Implemented features with Symfony, CodeIgniter and Node.js, including integrations with multiple payment gateways.":
    "Implementé funcionalidades con Symfony, CodeIgniter y Node.js, incluyendo integraciones con distintas pasarelas de pago.",
  "Coordinated requirements and delivery through daily client meetings.":
    "Coordiné requisitos y entregas mediante reuniones diarias con el cliente.",
  "Handled incidents with Asana and YouTrack and improved platform performance and usability.":
    "Gestioné incidencias con Asana y YouTrack y realicé mejoras de rendimiento y usabilidad en la plataforma.",
  "Systems Administrator": "Administrador de sistemas",
  "Supervised IT infrastructure for multiple local businesses, combining systems administration with on-site technical support.":
    "Supervisé la infraestructura informática de varias empresas de la zona, combinando administración de sistemas y atención técnica presencial.",
  "Oversaw IT infrastructure across multiple companies in the local area.":
    "Supervisé la infraestructura informática de múltiples empresas de la zona.",
  "Provided on-site support and repaired computer equipment.":
    "Presté atención técnica in situ y reparé equipos informáticos.",
  "Carried out network installations at client premises.":
    "Realicé instalaciones de red en las dependencias de los clientes.",
  "SAP RAP applications": "Aplicaciones SAP RAP",
  "TRAINING / SAP": "FORMACIÓN / SAP",
  "CRUD and business-action applications developed during training, using CDS, behavior definitions, service bindings and Fiori Elements.":
    "Aplicaciones CRUD y de acciones de negocio desarrolladas durante mi formación, utilizando CDS, definiciones de comportamiento, service bindings y Fiori Elements.",
  "Practice connecting data models, backend behavior and an application interface.":
    "Práctica de conexión entre modelos de datos, comportamiento backend e interfaz de aplicación.",
  "Object-oriented ABAP": "ABAP orientado a objetos",
  "EXERCISES / BACKEND": "EJERCICIOS / BACKEND",
  "Object-oriented ABAP exercises and backend logic, developed as part of my technical training.":
    "Ejercicios de ABAP orientado a objetos y lógica backend realizados como parte de mi formación técnica.",
  "Python & algorithms": "Python y algoritmos",
  "PRACTICE / PYTHON": "PRÁCTICA / PYTHON",
  "Python exercises and algorithm practice as I continue developing my programming and problem-solving skills.":
    "Ejercicios de Python y práctica de algoritmos para seguir desarrollando mis habilidades de programación y resolución de problemas.",
  Algorithms: "Algoritmos",
  "SAP development": "Desarrollo SAP",
  "SAP platform": "Plataforma SAP",
  "Backend & web": "Backend y web",
  "Tools & infrastructure": "Herramientas e infraestructura",
  "Behavior definitions": "Definiciones de comportamiento",
  "Service definitions & bindings": "Definiciones y enlaces de servicios",
  "Metadata extensions": "Extensiones de metadatos",
  "BTP administration": "Administración de BTP",
  "Bachelor’s Degree in Computer Engineering":
    "Grado en Ingeniería Informática",
  "2025 – IN PROGRESS": "2025 – EN CURSO",
  "Higher Technician in Web Application Development (DAW)":
    "Técnico Superior en Desarrollo de Aplicaciones Web (DAW)",
  "Official Spanish qualification — Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Web.":
    "Titulación oficial — Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Web.",
  "Technician in Microcomputer Systems and Networks (SMR)":
    "Técnico en Sistemas Microinformáticos y Redes (SMR)",
  "Official Spanish qualification — Ciclo Formativo de Grado Medio en Sistemas Microinformáticos y Redes.":
    "Titulación oficial — Ciclo Formativo de Grado Medio en Sistemas Microinformáticos y Redes.",
  About: "Sobre mí",
  Experience: "Experiencia",
  Projects: "Proyectos",
  Technologies: "Tecnologías",
  Certifications: "Certificaciones",
  Education: "Formación",
  Contact: "Contacto",
  "Skip to content": "Saltar al contenido",
  "Main navigation": "Navegación principal",
  "Mobile navigation": "Navegación móvil",
  "Back to home": "Volver al inicio",
  "Let’s talk": "Hablemos",
  Close: "Cerrar",
  Menu: "Menú",
  "Explore my work": "Ver mis proyectos",
  "Download CV": "Descargar CV",
  "Coming soon": "Próximamente",
  "PERSONAL SPACE": "ESPACIO PERSONAL",
  PERSPECTIVE: "PERSPECTIVA",
  "SAP CERTIFIED": "CERTIFICACIONES SAP",
  "GET TO KNOW ME": "CONOCE MI PERFIL",
  "Behind the code.": "Detrás del código.",
  "CURRENT LEARNING FOCUS": "FORMACIÓN ACTUAL",
  "Python & AI Engineering": "Python e ingeniería de IA",
  "Connect on LinkedIn": "Conecta en LinkedIn",
  "Selected work": "Proyectos destacados",
  "A selection of training applications and programming practice. These are learning projects, with individual repositories to follow.":
    "Una selección de aplicaciones de formación y ejercicios de programación. Son proyectos de aprendizaje; sus repositorios individuales estarán disponibles próximamente.",
  "Live project": "Ver proyecto",
  "Source code": "Código fuente",
  "Repository link coming soon": "Enlace al repositorio próximamente",
  "View credential": "Ver credencial",
  "Good conversations": "Las buenas conversaciones",
  "start with": "empiezan con un",
  "hello.": "hola.",
  "Have a role or a project in mind?": "¿Tienes una propuesta o un proyecto?",
  "Let’s talk about how I could contribute.":
    "Hablemos de cómo podría contribuir.",
  "Email me": "Escríbeme",
  "Back to top": "Volver arriba",
  "BASED IN": "UBICACIÓN",
  SEVILLE: "SEVILLA",
  "Map of Europe with Seville marked": "Mapa de Europa con Sevilla señalada",
  System: "Sistema",
  Light: "Claro",
  Dark: "Oscuro",
  Theme: "Tema",
  "Change theme": "Cambiar tema",
};
export const translate = (language, text) =>
  language === "es" ? (es[text] ?? text) : text;
function localize(value, language) {
  if (typeof value === "string") return translate(language, value);
  if (Array.isArray(value))
    return value.map((item) => localize(item, language));
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        localize(item, language),
      ]),
    );
  return value;
}
export const localizedContent = { en: content, es: localize(content, "es") };
