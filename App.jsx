import { useEffect, useRef, useState } from "react";
import LocationMap from "./src/LocationMap.jsx";
import Portrait from "./src/Portrait.jsx";
import usePreferences from "./src/usePreferences.js";
import { initScroll, spotlight } from "./src/scroll.js";
import { localizedContent, translate } from "./src/i18n.js";
import { experience as sourceExperience } from "./src/content.js";

const MONTHS = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");

// Whole years between the earliest and latest month named in the experience periods.
function yearsOfExperience(items) {
  const stamps = items.flatMap(({ period }) =>
    [...period.matchAll(/([A-Z][a-z]{2}) (\d{4})/g)].map(
      ([, month, year]) => Number(year) * 12 + MONTHS.indexOf(month),
    ),
  );
  if (stamps.length < 2) return 0;
  return Math.floor((Math.max(...stamps) - Math.min(...stamps)) / 12);
}

// The RAP stack, bottom layer first. Copy mirrors the project details in content.js.
const stackLayers = [
  {
    id: "cds",
    tag: "CDS",
    title: "Data model",
    text: "Business objects modeled as CDS root entities.",
  },
  {
    id: "rap",
    tag: "RAP",
    title: "Behavior",
    text: "Managed behavior definitions with actions and validations.",
  },
  {
    id: "odata",
    tag: "OData V4",
    title: "Service",
    text: "Applications exposed through a Service Definition and Service Binding.",
  },
  {
    id: "fiori",
    tag: "Fiori Elements",
    title: "Interface",
    text: "Fiori Elements interfaces configured through Metadata Extensions.",
  },
];

const plateMotifs = {
  cds: "M40 62h120v88H40zM40 84h120M40 106h120M40 128h120M84 62v88",
  rap: "M70 105 130 76M70 105l60 29M60 105m-11 0a11 11 0 1 0 22 0a11 11 0 1 0-22 0M141 72m-11 0a11 11 0 1 0 22 0a11 11 0 1 0-22 0M141 138m-11 0a11 11 0 1 0 22 0a11 11 0 1 0-22 0",
  odata: "M48 88h104m-13-11 13 11-13 11M152 124H48m13-11-13 11 13 11",
  fiori: "M40 56h120v98H40zM40 78h120M56 98h56M56 116h88M56 134h72M52 67h.1M62 67h.1",
};

function Arrow({ diagonal = false, down = false }) {
  const path = down
    ? "M12 4v16m-6-6 6 6 6-6"
    : diagonal
      ? "M6 18 18 6M6 6h12v12"
      : "M4 12h16m-6-6 6 6-6 6";
  return (
    <svg
      className="arrow"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
function ThemeIcon({ theme }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {theme === "light" ? (
        <path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8" />
      ) : (
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      )}
    </svg>
  );
}
function Link({ href, children, className = "", download }) {
  return (
    <a href={href} className={className} download={download}>
      {children}
      <Arrow diagonal={!download} down={download} />
    </a>
  );
}
function SectionHead({ id, number, title, children }) {
  return (
    <header className="section-head" data-reveal>
      <p className="eyebrow section-number">
        <span className="accent">{number}</span>
        <span className="rule" aria-hidden="true" />
      </p>
      <h2 id={`${id}-title`} className="display">
        {title}
      </h2>
      {children}
    </header>
  );
}
function Tags({ items, label }) {
  return (
    <ul className="tags" aria-label={label}>
      {items.map((item) => (
        <li className="tag" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
// Each word carries its index so CSS can light the sentence up as --p advances.
function Words({ text }) {
  const words = text.split(" ");
  return (
    <span className="words" style={{ "--n": words.length }}>
      {words.map((word, index) => (
        <span className="word" key={index} style={{ "--i": index }}>
          {word}{" "}
        </span>
      ))}
    </span>
  );
}

export default function App() {
  const { language, theme, changeLanguage, changeTheme } = usePreferences();
  const t = (text) => translate(language, text);
  const {
    profile,
    experience,
    projects,
    technologies,
    certifications,
    education,
    languages,
  } = localizedContent[language];

  const sections = [
    ["sobre-mi", "About"],
    ...(experience.length ? [["experiencia", "Experience"]] : []),
    ["enfoque", "SAP focus"],
    ["certificaciones", "Certifications"],
    ["proyectos", "Projects"],
    ["tecnologias", "Technologies"],
    ["formacion", "Education"],
    ["contacto", "Contact"],
  ];
  const number = (id) =>
    String(sections.findIndex(([section]) => section === id) + 1).padStart(2, "0");
  const headerLinks = sections.filter(([id]) =>
    ["sobre-mi", "experiencia", "certificaciones", "proyectos"].includes(id),
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButton = useRef(null);

  useEffect(() => initScroll(), [language]);
  useEffect(() => {
    // The section crossing the middle of the viewport is the current one.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const element of document.querySelectorAll("main > section[id]"))
      observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function closeMenu(event) {
    setMenuOpen(false);
    const target = document.getElementById(event.currentTarget.hash.slice(1));
    if (target) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  }
  const themeName = t({ light: "Light", dark: "Dark" }[theme]);
  const years = yearsOfExperience(sourceExperience);
  const stats = [
    ...(years ? [[`${years}+`, "Years of professional experience"]] : []),
    [certifications.length, "SAP Certified Associate credentials"],
    ...(experience.length ? [[experience.length, "Technical roles"]] : []),
  ];

  return (
    <>
      <a className="skip-link" href="#contenido">
        {t("Skip to content")}
      </a>
      <header
        className="site-header"
        data-open={menuOpen || undefined}
        onKeyDown={(event) => {
          if (event.key === "Escape" && menuOpen) {
            setMenuOpen(false);
            menuButton.current?.focus();
          }
        }}
      >
        <div className="shell header-inner">
          <a className="wordmark" href="#inicio" aria-label={t("Back to home")}>
            juanrvz<span className="accent">.dev</span>
          </a>
          <nav className="desktop-nav" aria-label={t("Main navigation")}>
            {headerLinks.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
              >
                {t(label)}
              </a>
            ))}
          </nav>
          <div className="header-tools">
            <button
              className="tool-button"
              onClick={changeLanguage}
              aria-label={
                language === "en" ? "Cambiar a español" : "Switch to English"
              }
            >
              <span lang={language === "en" ? "es" : "en"}>
                {language === "en" ? "ES" : "EN"}
              </span>
            </button>
            <button
              className="tool-button"
              onClick={changeTheme}
              aria-label={`${t("Change theme")}: ${themeName}`}
              title={`${t("Theme")}: ${themeName}`}
            >
              <ThemeIcon theme={theme} />
            </button>
            <a className="header-contact" href="#contacto">
              {t("Let’s talk")}
              <Arrow diagonal />
            </a>
            <button
              ref={menuButton}
              className="tool-button menu-button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {t(menuOpen ? "Close" : "Menu")}
            </button>
          </div>
        </div>
        <span className="scroll-progress" aria-hidden="true" />
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label={t("Mobile navigation")}
          hidden={!menuOpen}
        >
          <div className="shell">
            {sections.map(([id, label]) => (
              <a href={`#${id}`} key={id} onClick={closeMenu}>
                <span className="eyebrow accent">{number(id)}</span>
                {t(label)}
                <Arrow />
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main id="contenido" tabIndex={-1}>
        <section
          id="inicio"
          className="hero"
          data-scroll="exit"
          aria-labelledby="hero-title"
        >
          <div className="shell hero-layout">
            <div className="hero-inner">
              <p className="hero-status">
                <span className="status-dot" aria-hidden="true" />
                {profile.availability}
              </p>
              <h1 id="hero-title" className="hero-title">
                <span className="line">
                  <span>Juan Ramón</span>
                </span>{" "}
                <span className="line">
                  <span>Vaz León</span>
                </span>
              </h1>
              <p className="hero-role">{profile.role}</p>
              <p className="hero-specialty">{profile.headline}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contacto">
                  {t("Contact")}
                  <Arrow />
                </a>
                {profile.cv && (
                  <Link className="button" href={profile.cv} download>
                    {t("Download CV")}
                  </Link>
                )}
                {profile.linkedin && (
                  <Link className="text-link" href={profile.linkedin}>
                    LinkedIn
                  </Link>
                )}
                {profile.github && (
                  <Link className="text-link" href={profile.github}>
                    GitHub
                  </Link>
                )}
              </div>
            </div>
            <Portrait src="/juan-ramon-vaz-leon.jpg" alt={profile.name} />
          </div>
          <div className="shell hero-foot">
            <a href="#certificaciones">
              <span className="eyebrow accent">{t("SAP CERTIFIED")}</span>
              <span>ABAP Cloud · BTP Administrator</span>
            </a>
            {profile.location && (
              <p>
                <span className="eyebrow">{t("BASED IN")}</span>
                <span>{profile.location}</span>
              </p>
            )}
            <a href="#sobre-mi" className="hero-scroll">
              <span className="eyebrow">{t("GET TO KNOW ME")}</span>
              <Arrow down />
            </a>
          </div>
        </section>

        <section id="sobre-mi" aria-labelledby="sobre-mi-title">
          <div className="statement" data-scroll="pin">
            <div className="shell statement-pin">
              <h2 id="sobre-mi-title" className="eyebrow section-number">
                <span className="accent">{number("sobre-mi")}</span>
                <span className="rule" aria-hidden="true" />
                {t("About")}
              </h2>
              <p className="statement-text">
                <Words text={profile.summary} />
              </p>
            </div>
          </div>
          <div className="shell about">
            <div className="about-copy">
              <p className="kicker" data-reveal>
                {t("Behind the code.")}
              </p>
              {profile.about.map((paragraph, index) => (
                <p key={index} data-reveal style={{ "--d": index + 1 }}>
                  {paragraph}
                </p>
              ))}
              {profile.linkedin && (
                <p data-reveal style={{ "--d": 4 }}>
                  <Link href={profile.linkedin} className="text-link">
                    {t("Connect on LinkedIn")}
                  </Link>
                </p>
              )}
            </div>
            <aside className="about-card" data-reveal>
              {profile.location && (
                <LocationMap
                  location={profile.location}
                  workPreference={profile.workPreference}
                  t={t}
                />
              )}
              <div className="spoken-languages">
                <h3 className="eyebrow">{t("Languages")}</h3>
                <dl>
                  {languages.map((item) => (
                    <div key={item.name}>
                      <dt>{item.name}</dt>
                      <dd>{item.level}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
            <dl className="stats">
              {stats.map(([value, label], index) => (
                <div key={label} data-reveal style={{ "--d": index }}>
                  <dt>{t(label)}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {experience.length > 0 && (
          <section
            id="experiencia"
            className="shell section"
            aria-labelledby="experiencia-title"
          >
            <SectionHead
              id="experiencia"
              number={number("experiencia")}
              title={t("Experience")}
            />
            <div className="timeline" data-scroll="fill">
              <span className="timeline-fill" aria-hidden="true" />
              {experience.map((item, index) => (
                <article className="row" key={index} data-reveal>
                  <p className="eyebrow row-meta">{item.period}</p>
                  <div>
                    <h3>{item.role}</h3>
                    <p className="accent">{item.company}</p>
                  </div>
                  <div className="row-body">
                    {item.description && <p>{item.description}</p>}
                    {item.achievements?.length > 0 && (
                      <ul className="bullets">
                        {item.achievements.map((text, key) => (
                          <li key={key}>{text}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section
          id="enfoque"
          className="stack"
          data-scroll="pin"
          data-steps={stackLayers.length}
          aria-labelledby="enfoque-title"
        >
          <div className="shell stack-pin">
            <div className="stack-copy">
              <p className="eyebrow section-number">
                <span className="accent">{number("enfoque")}</span>
                <span className="rule" aria-hidden="true" />
                {t("SAP focus")}
              </p>
              <h2 id="enfoque-title" className="display">
                {t("From data model to interface.")}
              </h2>
              <ol className="stack-steps">
                {stackLayers.map((layer, index) => (
                  <li key={layer.id}>
                    <span className="eyebrow">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3>
                        {t(layer.title)}
                        <span className="eyebrow">{layer.tag}</span>
                      </h3>
                      <div className="stack-step-text">
                        <p>{t(layer.text)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              <a className="text-link stack-note" href="#proyectos">
                {t("Based on my SAP training projects.")}
                <Arrow down />
              </a>
            </div>
            <div className="stack-art" aria-hidden="true">
              <div className="plates">
                {stackLayers.map((layer, index) => (
                  <div className="plate" key={layer.id} style={{ "--i": index }}>
                    <span className="plate-label">{layer.tag}</span>
                    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor">
                      <path
                        d={plateMotifs[layer.id]}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="certificaciones"
          className="shell section"
          aria-labelledby="certificaciones-title"
        >
          <SectionHead
            id="certificaciones"
            number={number("certificaciones")}
            title={t("Certifications")}
          />
          <div className="certificates">
            {certifications.map((item, index) => {
              const [kind, ...rest] = item.title.split(" – ");
              return (
                <article
                  className="certificate spot"
                  key={index}
                  onPointerMove={spotlight}
                  data-reveal
                  style={{ "--d": index }}
                >
                  <svg
                    className="seal"
                    width="44"
                    height="44"
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M24 3 42 13.5v21L24 45 6 34.5v-21Z" />
                    <path d="m16 24.5 5.5 5.5L32 19" strokeLinecap="round" />
                  </svg>
                  <p className="eyebrow accent">
                    {rest.length ? kind : item.organization}
                  </p>
                  <h3>{rest.length ? rest.join(" – ") : item.title}</h3>
                  <p className="certificate-meta">
                    <span>{item.organization}</span>
                    {item.date && <span className="eyebrow">{item.date}</span>}
                  </p>
                  {item.url && (
                    <Link href={item.url} className="text-link">
                      {t("Verify credential")}
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="proyectos"
          className="gallery"
          data-scroll="pin"
          aria-labelledby="proyectos-title"
        >
          <div className="gallery-pin">
            <div className="shell">
              <SectionHead
                id="proyectos"
                number={number("proyectos")}
                title={t("Selected work")}
              >
                <p className="lead">
                  {t(
                    "SAP training projects and Python practice, with the implementation concepts used in each application.",
                  )}
                </p>
              </SectionHead>
            </div>
            <div className="gallery-viewport">
              <div className="gallery-track" data-track>
                {projects.map((project, index) => (
                  <article
                    className="project spot"
                    key={index}
                    onPointerMove={spotlight}
                  >
                    <span className="project-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="eyebrow accent">{project.type}</p>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    {project.details?.length > 0 && (
                      <ul className="bullets">
                        {project.details.map((detail, key) => (
                          <li key={key}>{detail}</li>
                        ))}
                      </ul>
                    )}
                    {project.screenshot?.src && (
                      <img
                        className="project-screenshot"
                        src={project.screenshot.src}
                        alt={project.screenshot.alt}
                        width={project.screenshot.width}
                        height={project.screenshot.height}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <Tags
                      items={project.technologies || []}
                      label={t("Technologies")}
                    />
                    {(project.url || project.repository) && (
                      <div className="project-links">
                        {project.url && (
                          <Link className="text-link" href={project.url}>
                            {t("Live project")}
                          </Link>
                        )}
                        {project.repository && (
                          <Link className="text-link" href={project.repository}>
                            GitHub
                          </Link>
                        )}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
            <div className="shell">
              <span className="gallery-progress" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section
          id="tecnologias"
          className="shell section"
          aria-labelledby="tecnologias-title"
        >
          <SectionHead
            id="tecnologias"
            number={number("tecnologias")}
            title={t("Technologies")}
          />
          <div className="tech-grid">
            {technologies.map((group, index) => (
              <div key={index} data-reveal style={{ "--d": index }}>
                <h3 className="eyebrow accent">{group.category}</h3>
                <ul aria-label={group.category}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section
          id="formacion"
          className="shell section"
          aria-labelledby="formacion-title"
        >
          <SectionHead
            id="formacion"
            number={number("formacion")}
            title={t("Education")}
          />
          <div className="rows">
            {education.map((item, index) => (
              <article className="row" key={index} data-reveal>
                <p className="eyebrow row-meta">{item.date}</p>
                <div>
                  <h3>{item.title}</h3>
                  <p className="accent">{item.organization}</p>
                </div>
                <div className="row-body">
                  {item.description && <p>{item.description}</p>}
                  {item.url && (
                    <Link href={item.url} className="text-link">
                      {t("Verify credential")}
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="contacto"
          className="contact"
          data-scroll="enter"
          aria-labelledby="contact-title"
        >
          <div className="shell">
            <p className="eyebrow section-number">
              <span className="accent">{number("contacto")}</span>
              <span className="rule" aria-hidden="true" />
              {t("Contact")}
            </p>
            <h2 id="contact-title" className="contact-title">
              {t("Interested in working together?")}{" "}
              <span className="accent">{t("Get in touch.")}</span>
            </h2>
            <div className="contact-links">
              {profile.email && (
                <a href={`mailto:${profile.email}`} data-reveal>
                  <span className="eyebrow">{t("Email me")}</span>
                  <span>{profile.email}</span>
                  <Arrow diagonal />
                </a>
              )}
              {profile.phone && (
                <a
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                  data-reveal
                  style={{ "--d": 1 }}
                >
                  <span className="eyebrow">{t("Phone")}</span>
                  <span>{profile.phone}</span>
                  <Arrow diagonal />
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} data-reveal style={{ "--d": 2 }}>
                  <span className="eyebrow">LinkedIn</span>
                  <span>{profile.name}</span>
                  <Arrow diagonal />
                </a>
              )}
              {profile.github && (
                <a href={profile.github} data-reveal style={{ "--d": 3 }}>
                  <span className="eyebrow">GitHub</span>
                  <span>@JuanRVZ</span>
                  <Arrow diagonal />
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="shell footer">
        <a className="wordmark" href="#inicio" aria-label={t("Back to home")}>
          juanrvz<span className="accent">.dev</span>
        </a>
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a href="#inicio">
          {t("Back to top")}
          <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </>
  );
}
