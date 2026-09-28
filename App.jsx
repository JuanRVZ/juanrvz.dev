import { useRef, useState } from "react";
import LocationMap from "./src/LocationMap.jsx";
import usePreferences from "./src/usePreferences.js";
import { localizedContent, translate } from "./src/i18n.js";

function Arrow({ diagonal = false }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"} />
    </svg>
  );
}
function Link({ href, children, className = "", download }) {
  return (
    <a href={href} className={className} download={download}>
      {children}
      <Arrow diagonal />
    </a>
  );
}
function Section({ id, number, title, children, className = "" }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`section ${className}`}
    >
      <div className="section-heading">
        <span className="eyebrow accent">{number} /</span>
        <h2 id={`${id}-title`}>{title}</h2>
      </div>
      <div className="section-body">{children}</div>
    </section>
  );
}
function Tags({ items, label }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {items.map((item) => (
        <li className="tag" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
function Credentials({ items, t, certificates = false }) {
  return (
    <div className={certificates ? "records certificate-records" : "records"}>
      {items.map((item) => (
        <article className="record" key={`${item.title}-${item.organization}`}>
          {certificates && <p className="eyebrow accent">SAP CERTIFIED ASSOCIATE</p>}
          {item.date && <p className="eyebrow">{item.date}</p>}
          <h3>{item.title}</h3>
          <p>{item.organization}</p>
          {item.description && <p>{item.description}</p>}
          {item.url && (
            <Link href={item.url} className="text-link">
              {t("Verify credential")}
            </Link>
          )}
        </article>
      ))}
    </div>
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
  const navigation = [
    ["sobre-mi", "About"],
    ...(experience.length ? [["experiencia", "Experience"]] : []),
    ["proyectos", "Projects"],
    ["tecnologias", "Technologies"],
    ["certificaciones", "Certifications"],
    ["formacion", "Education"],
    ["contacto", "Contact"],
  ];
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  function closeMenu(event) {
    setMenuOpen(false);
    const target = document.getElementById(event.currentTarget.hash.slice(1));
    if (target) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  }
  const themeName = t(
    { light: "Light", dark: "Dark" }[theme],
  );
  return (
    <>
      <a className="skip-link" href="#contenido">
        {t("Skip to content")}
      </a>
      <header
        className="site-header"
        onKeyDown={(event) => {
          if (event.key === "Escape" && menuOpen) {
            setMenuOpen(false);
            menuButton.current?.focus();
          }
        }}
      >
        <div className="shell header-inner">
          <a className="wordmark" href="#inicio" aria-label={t("Back to home")}>
            jrv<span className="accent">.</span>
          </a>
          <nav className="desktop-nav" aria-label={t("Main navigation")}>
            {navigation
              .filter(([id]) =>
                [
                  "sobre-mi",
                  "experiencia",
                  "certificaciones",
                  "proyectos",
                ].includes(id),
              )
              .map(([id, label]) => (
                <a key={id} href={`#${id}`}>
                  {t(label)}
                </a>
              ))}
          </nav>
          <div className="header-tools">
            <button
              className="preference-button language-button"
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
              className="preference-button theme-button"
              onClick={changeTheme}
              aria-label={`${t("Change theme")}: ${themeName}`}
              title={`${t("Theme")}: ${themeName}`}
            >
              <span aria-hidden="true">
                {theme === "light" ? "☼" : "☾"}
              </span>
              <span>{themeName}</span>
            </button>
            <a className="header-contact" href="#contacto">
              {t("Let’s talk")}
              <Arrow diagonal />
            </a>
            <button
              ref={menuButton}
              className="menu-button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {t(menuOpen ? "Close" : "Menu")}
              <span aria-hidden="true">{menuOpen ? "−" : "+"}</span>
            </button>
          </div>
        </div>
        <nav
          id="mobile-navigation"
          className="mobile-nav shell"
          aria-label={t("Mobile navigation")}
          hidden={!menuOpen}
        >
          {navigation.map(([id, label]) => (
            <a href={`#${id}`} key={id} onClick={closeMenu}>
              {t(label)}
              <Arrow />
            </a>
          ))}
        </nav>
      </header>
      <main id="contenido" className="shell" tabIndex={-1}>
        <section id="inicio" className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-label">
              <span className="status-dot" />
              {t("SAP DEVELOPMENT")}{" "}
              <span className="muted">/ JUANRVZ.DEV</span>
            </p>
            <h1 id="hero-title">
              Juan Ramón
              <br />
              Vaz León<span className="accent">.</span>
            </h1>
            <p className="hero-role">{profile.role}</p>
            <p className="hero-specialty">{profile.headline}</p>
            {profile.summary && (
              <p className="hero-summary">{profile.summary}</p>
            )}
            <p className="availability">
              <span className="status-dot" aria-hidden="true" />
              {profile.availability}
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contacto">
                {t("Contact")}
                <Arrow />
              </a>
              {profile.linkedin && (
                <a className="button button-secondary" href={profile.linkedin}>
                  LinkedIn
                  <Arrow diagonal />
                </a>
              )}
              {profile.github && (
                <Link className="text-link" href={profile.github}>GitHub</Link>
              )}
              {profile.cv ? (
                <Link className="text-link" href={profile.cv} download>
                  {t("Download CV")}
                </Link>
              ) : (
                <span className="cv-pending">
                  <button disabled className="cv-button">
                    {t("Download CV")}
                    <span aria-hidden="true">↓</span>
                  </button>
                  <span>{t("Coming soon")}</span>
                </span>
              )}
            </div>
          </div>
          <figure className="hero-portrait">
            <img
              src="/juan-ramon-vaz-leon.jpg"
              alt={profile.name}
              width="306"
              height="306"
              fetchPriority="high"
              decoding="async"
            />
          </figure>
          <div className="hero-proof">
            <a href="#certificaciones">
              <span className="eyebrow accent">{t("SAP CERTIFIED")}</span>
              <span>
                <span>SAP Certified Associate<br />ABAP Cloud · BTP Administrator</span>
                <Arrow diagonal />
              </span>
            </a>
          </div>
          <div className="hero-bottom">
            <span className="eyebrow">SAP ABAP CLOUD / BTP / BACKEND</span>
            <a href="#sobre-mi" className="eyebrow">
              {t("GET TO KNOW ME")}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
        <Section id="sobre-mi" number="01" title={t("About")}>
          <p className="section-kicker">{t("Behind the code.")}</p>
          {profile.about.map((paragraph) => (
            <p className="about-copy" key={paragraph}>
              {paragraph}
            </p>
          ))}
          {profile.location && (
            <LocationMap location={profile.location} workPreference={profile.workPreference} t={t} />
          )}
          <div className="professional-languages">
            <h3 className="eyebrow accent">{t("Languages")}</h3>
            <dl>
              {languages.map((item) => (
                <div key={item.name}>
                  <dt>{item.name}</dt>
                  <dd>{item.level}</dd>
                </div>
              ))}
            </dl>
          </div>
          {profile.linkedin && (
            <Link href={profile.linkedin} className="text-link mt-6">
              {t("Connect on LinkedIn")}
            </Link>
          )}
        </Section>
        {experience.length > 0 && (
          <Section id="experiencia" number="02" title={t("Experience")}>
            <div className="records">
              {experience.map((item) => (
                <article
                  className="record"
                  key={`${item.company}-${item.role}`}
                >
                  <p className="eyebrow">{item.period}</p>
                  <h3>{item.role}</h3>
                  <p className="accent">{item.company}</p>
                  {item.description && <p>{item.description}</p>}
                  {item.achievements?.length > 0 && (
                    <ul className="achievement-list">
                      {item.achievements.map((text) => (
                        <li key={text}>{text}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </Section>
        )}
        <Section
          id="proyectos"
          number={experience.length ? "03" : "02"}
          title={t("Selected work")}
          className="projects-section"
        >
          <p className="work-intro">
            {t(
              "SAP training projects and Python practice, with the implementation concepts used in each application.",
            )}
          </p>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <span className="eyebrow accent">
                  {String(index + 1).padStart(2, "0")} / {project.type}
                </span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.details?.length > 0 && <ul className="achievement-list project-details">
                  {project.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>}
                {project.screenshot?.src && <img className="project-screenshot"
                  src={project.screenshot.src} alt={project.screenshot.alt}
                  width={project.screenshot.width} height={project.screenshot.height}
                  loading="lazy" decoding="async" />}
                <Tags
                  items={project.technologies || []}
                  label={t("Technologies")}
                />
                {(project.url || project.repository) && <div className="flex flex-wrap gap-6">
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
                </div>}
              </article>
            ))}
          </div>
        </Section>
        <Section
          id="tecnologias"
          number={experience.length ? "04" : "03"}
          title={t("Technologies")}
        >
          <div className="grid gap-8 sm:grid-cols-2">
            {technologies.map((group) => (
              <div key={group.category}>
                <h3 className="mb-4">{group.category}</h3>
                <Tags items={group.items} label={t("Technologies")} />
              </div>
            ))}
          </div>
        </Section>
        <Section
          id="certificaciones"
          number={experience.length ? "05" : "04"}
          title={t("Certifications")}
        >
          <Credentials items={certifications} t={t} certificates />
        </Section>
        <Section
          id="formacion"
          number={experience.length ? "06" : "05"}
          title={t("Education")}
        >
          <Credentials items={education} t={t} />
        </Section>
        <section
          id="contacto"
          className="contact-section"
          aria-labelledby="contact-title"
        >
          <p className="eyebrow accent">
            {experience.length ? "07" : "06"} / {t("Contact").toUpperCase()}
          </p>
          <div className="contact-layout">
            <div>
              <h2 id="contact-title">
                {t("Interested in working together?")}
                <br />
                <span>{t("Get in touch.")}</span>
              </h2>
            </div>
            <div className="contact-links">
              {profile.email && (
                <Link href={`mailto:${profile.email}`}>
                  {t("Email me")}
                  <span className="contact-handle">{profile.email}</span>
                </Link>
              )}
              {profile.phone && (
                <a
                  className="text-link"
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                >
                  {t("Phone")}
                  <span className="contact-handle">{profile.phone}</span>
                </a>
              )}
              {profile.linkedin && (
                <Link href={profile.linkedin}>LinkedIn</Link>
              )}
              {profile.github && (
                <Link href={profile.github}>
                  GitHub<span className="contact-handle">@JuanRVZ</span>
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="shell footer">
        <a className="wordmark" href="#inicio" aria-label={t("Back to home")}>
          jrv<span className="accent">.</span>
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
