import * as content from "./content.js";

const es = {
  "SAP ABAP Cloud & BTP Developer": "Desarrollador SAP ABAP Cloud & BTP",
  "Backend development · PHP / Laravel · Python": "Desarrollo backend · PHP / Laravel · Python",
  "Backend development experience in PHP and Laravel, systems administration and API integrations. Now focused on SAP ABAP Cloud, RAP and SAP BTP.": "Experiencia en desarrollo backend con PHP y Laravel, administración de sistemas e integraciones de API. Actualmente centrado en SAP ABAP Cloud, RAP y SAP BTP.",
  "Open to SAP ABAP Cloud / BTP opportunities": "Abierto a oportunidades SAP ABAP Cloud / BTP",
  "Open to remote / hybrid opportunities": "Disponible para trabajo remoto / híbrido",
  "My background is in backend development with PHP and Laravel, including clinical software and legacy applications. I have also built API integrations and administered systems for local businesses.": "Mi trayectoria se centra en el desarrollo backend con PHP y Laravel, incluyendo software clínico y aplicaciones legacy. También he desarrollado integraciones de API y administrado sistemas para empresas de la zona.",
  "I now specialize in SAP ABAP Cloud, RAP and SAP BTP. My technical work connects CDS data models, business behavior and OData services with Fiori Elements interfaces.": "Actualmente me especializo en SAP ABAP Cloud, RAP y SAP BTP. En mis proyectos técnicos conecto modelos de datos CDS, lógica de negocio y servicios OData con interfaces Fiori Elements.",
  "I value understanding systems end-to-end and writing maintainable software. I continue developing my Python skills alongside my SAP specialization.": "Me interesa comprender los sistemas de principio a fin y escribir software mantenible. Sigo desarrollando mis conocimientos de Python junto con mi especialización SAP.",
  "Andalusia, Spain": "Andalucía, España",
  "ANDALUSIA": "ANDALUCÍA",
  "Map of Europe with Andalusia marked": "Mapa de Europa con Andalucía señalada",
  "SAP DEVELOPMENT": "DESARROLLO SAP",
  "Languages": "Idiomas",
  "Verify credential": "Verificar certificación",
  "Interested in working together?": "¿Te interesa trabajar conmigo?",
  "Get in touch.": "Hablemos.",
  "SAP training projects and Python practice, with the implementation concepts used in each application.": "Proyectos de formación SAP y práctica de Python, con los conceptos de implementación utilizados en cada aplicación.",
  "SAP / TRAINING PROJECT": "SAP / PROYECTO FORMATIVO",
  "ABAP / TRAINING PROJECT": "ABAP / PROYECTO FORMATIVO",
  "PYTHON / PRACTICE": "PYTHON / PRÁCTICA",
  "Incident Management – SAP RAP": "Gestión de incidencias – SAP RAP",
  "Pharmacy Management – ABAP OO": "Gestión de farmacia – ABAP OO",
  "Rock Paper Scissors – SAP RAP": "Piedra, papel o tijera – SAP RAP",
  "Python & Algorithms": "Python y algoritmos",
  "An incident management application built with RAP, with an action to close incidents and an OData V4 service for the Fiori Elements interface.": "Aplicación de gestión de incidencias construida con RAP, con una acción para cerrar incidencias y un servicio OData V4 para la interfaz Fiori Elements.",
  "Modeled incidents as a CDS root entity.": "Modelado de incidencias como entidad raíz CDS.",
  "Defined managed behavior with actions and validations.": "Definición de managed behavior con acciones y validaciones.",
  "Implemented an action to close incidents.": "Implementación de una acción para cerrar incidencias.",
  "Exposed the application through a Service Definition and Service Binding.": "Exposición de la aplicación mediante Service Definition y Service Binding.",
  "An object-oriented project modeling pharmacy products and operations through interfaces, inheritance and polymorphism.": "Proyecto orientado a objetos que modela productos y operaciones de una farmacia mediante interfaces, herencia y polimorfismo.",
  "Modeled products and operations with classes, interfaces and inheritance.": "Modelado de productos y operaciones con clases, interfaces y herencia.",
  "Used polymorphism to work with different product types.": "Uso de polimorfismo para trabajar con distintos tipos de productos.",
  "Processed internal tables with FILTER and REDUCE.": "Procesamiento de tablas internas con FILTER y REDUCE.",
  "Handled exceptions in application logic.": "Gestión de excepciones en la lógica de la aplicación.",
  "A RAP application with a custom Play action that runs game logic in the behavior implementation.": "Aplicación RAP con una acción personalizada Play que ejecuta la lógica de la partida desde el behavior implementation.",
  "Defined a custom Play action in the Behavior Definition.": "Definición de la acción personalizada Play en el Behavior Definition.",
  "Implemented the game logic in the behavior implementation.": "Implementación de la lógica de la partida en el behavior implementation.",
  "Configured the interface through a Metadata Extension.": "Configuración de la interfaz mediante una Metadata Extension.",
  "Exposed the application through a Service Binding.": "Exposición de la aplicación mediante un Service Binding.",
  "Programming exercises covering algorithms, data structures and file handling, with a focus on problem solving.": "Ejercicios de programación sobre algoritmos, estructuras de datos y manejo de archivos, centrados en la resolución de problemas.",
  "Practiced working with data structures.": "Práctica con estructuras de datos.",
  "Implemented algorithms to solve programming exercises.": "Implementación de algoritmos para resolver ejercicios de programación.",
  "Worked with file input and output.": "Trabajo con lectura y escritura de archivos.",
  "Data structures": "Estructuras de datos",
  "Algorithms": "Algoritmos",
  "Interfaces": "Interfaces",
  "Polymorphism": "Polimorfismo",
  "SAP development": "Desarrollo SAP",
  "SAP platform": "Plataforma SAP",
  "Systems & tools": "Sistemas y herramientas",
  "Networking": "Redes",
  "Developed PHP and Laravel software in the clinical and healthcare sector, working across newer applications and legacy codebases.": "Desarrollé software con PHP y Laravel en el sector clínico y sanitario, trabajando tanto en aplicaciones recientes como en código legacy.",
  "Built application functionality with PHP and Laravel.": "Desarrollé funcionalidades de aplicaciones con PHP y Laravel.",
  "Worked on existing legacy projects alongside newer development work.": "Trabajé en proyectos legacy existentes junto con desarrollos más recientes.",
  "Developed familiarity with clinical and healthcare software through these projects.": "Adquirí experiencia en software clínico y sanitario a través de estos proyectos.",
  "Administered IT infrastructure for multiple local businesses, with hands-on support at client premises.": "Administré la infraestructura informática de varias empresas de la zona, con asistencia presencial en sus instalaciones.",
  "Supervised systems and infrastructure across local companies.": "Supervisé sistemas e infraestructura de empresas de la zona.",
  "Diagnosed and repaired computer equipment during on-site support.": "Diagnostiqué y reparé equipos informáticos durante las intervenciones presenciales.",
  "Installed networks at client premises.": "Realicé instalaciones de red en las dependencias de los clientes." ,
  "/cv/juan-ramon-vaz-leon-en.pdf": "/cv/juan-ramon-vaz-leon-es.pdf",
  "Services Assistant": "Auxiliar de servicios",
  "Online Sales": "Venta online",
  "Jan 2018 - Sep 2018": "Ene 2018 - Sep 2018",
  Spanish: "Español",
  English: "Inglés",
  Native: "Nativo",
  "B2 - Professional working proficiency": "B2 - Competencia profesional",
  Phone: "Teléfono",
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
