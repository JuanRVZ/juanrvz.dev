import { useEffect, useState } from "react";

// Stable first render matches prerendered HTML; preferences apply after hydration.
export default function usePreferences() {
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("system");
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("portfolio-language");
      const savedTheme = localStorage.getItem("portfolio-theme");
      if (["en", "es"].includes(savedLanguage)) setLanguage(savedLanguage);
      if (["system", "light", "dark"].includes(savedTheme))
        setTheme(savedTheme);
    } catch {
      /* Storage can be unavailable in private browsing. */
    }
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    const role =
      language === "es" ? "Desarrollador de software" : "Software Developer";
    document.title = `Juan Ramón Vaz León | ${role}`;
    const description =
      language === "es"
        ? "Juan Ramón Vaz León — Desarrollador de software especializado en SAP ABAP Cloud, SAP BTP y backend. Experiencia, proyectos y certificaciones."
        : "Juan Ramón Vaz León — Software Developer specializing in SAP ABAP Cloud, SAP BTP and backend development. Experience, projects and certifications.";
    for (const selector of [
      'meta[name="description"]',
      'meta[property="og:description"]',
      'meta[name="twitter:description"]',
    ])
      document.querySelector(selector)?.setAttribute("content", description);
    for (const selector of [
      'meta[property="og:title"]',
      'meta[name="twitter:title"]',
    ])
      document.querySelector(selector)?.setAttribute("content", document.title);
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute("content", language === "es" ? "es_ES" : "en_GB");
  }, [language]);
  function changeLanguage() {
    const next = language === "en" ? "es" : "en";
    try {
      localStorage.setItem("portfolio-language", next);
    } catch {
      /* No storage. */
    }
    setLanguage(next);
  }
  function changeTheme() {
    const next = { system: "light", light: "dark", dark: "system" }[theme];
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      /* No storage. */
    }
    document.documentElement.dataset.theme = next;
    setTheme(next);
  }
  return { language, theme, changeLanguage, changeTheme };
}
