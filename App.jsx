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
function Link({ href, children, className = "" }) {
  return (
    <a href={href} className={className}>
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
function Credentials({ items, t }) {
  return (
    <div className="records">
      {items.map((item) => (
        <article className="record" key={`${item.title}-${item.organization}`}>
          {item.date && <p className="eyebrow">{item.date}</p>}
          <h3>{item.title}</h3>
          <p>{item.organization}</p>
          {item.description && <p>{item.description}</p>}
          {item.url && (
            <Link href={item.url} className="text-link">
              {t("View credential")}
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
    { system: "System", light: "Light", dark: "Dark" }[theme],
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
                {theme === "system" ? "◐" : theme === "light" ? "☼" : "☾"}
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
              {t("Software Developer").toUpperCase()}{" "}
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
            <div className="hero-actions">
              <a className="button button-primary" href="#proyectos">
                {t("Explore my work")}
                <Arrow />
              </a>
              {profile.linkedin && (
                <a className="button button-secondary" href={profile.linkedin}>
                  LinkedIn
                  <Arrow diagonal />
                </a>
              )}
              {profile.cv ? (
                <Link className="text-link" href={profile.cv}>
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
          <div className="hero-art" aria-hidden="true">
            <div className="art-top">
              <span>JRV / {t("PERSONAL SPACE")}</span>
              <span>01 — ∞</span>
            </div>
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="art-monogram">
              jrv<span>.</span>
            </div>
            <span className="coordinate coordinate-one">+</span>
            <span className="coordinate coordinate-two">+</span>
            <div className="art-bottom">
              <span>
                SOFTWARE
                <br />& {t("PERSPECTIVE")}
              </span>
              <span className="accent">↗</span>
            </div>
          </div>
          <div className="hero-proof">
            <a href="#certificaciones">
              <span className="eyebrow accent">{t("SAP CERTIFIED")}</span>
              <span>
                ABAP Cloud · BTP Administrator
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
            <LocationMap location={profile.location} t={t} />
          )}
          <div className="focus-note">
            <span className="eyebrow accent">
              {t("CURRENT LEARNING FOCUS")}
            </span>
            <p>{t("Python & AI Engineering")}</p>
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
              "A selection of training applications and programming practice. These are learning projects, with individual repositories to follow.",
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
                {project.contribution && <p>{project.contribution}</p>}
                <Tags
                  items={project.technologies || []}
                  label={t("Technologies")}
                />
                <div className="flex flex-wrap gap-6">
                  {project.url && (
                    <Link className="text-link" href={project.url}>
                      {t("Live project")}
                    </Link>
                  )}
                  {project.repository && (
                    <Link className="text-link" href={project.repository}>
                      {t("Source code")}
                    </Link>
                  )}
                  {!project.url && !project.repository && (
                    <p className="repository-note">
                      {t("Repository link coming soon")}
                    </p>
                  )}
                </div>
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
          <Credentials items={certifications} t={t} />
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
                {t("Good conversations")}
                <br />
                {t("start with")} <span>{t("hello.")}</span>
              </h2>
              <p>
                {t("Have a role or a project in mind?")}
                <br />
                {t("Let’s talk about how I could contribute.")}
              </p>
            </div>
            <div className="contact-links">
              {profile.email && (
                <Link href={`mailto:${profile.email}`}>
                  {t("Email me")}
                  <span className="contact-handle">{profile.email}</span>
                </Link>
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
