import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { mkdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { localizedContent } from "../src/i18n.js";

const clean = (text) =>
  String(text)
    .replace(/[–—‑]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"');

// Node-only build step: the PDF library never enters the browser bundle.
export async function generateCVs(outputDirectory = "public/cv") {
  await mkdir(outputDirectory, { recursive: true });
  for (const language of ["en", "es"]) {
    const {
      profile,
      experience,
      additionalExperience,
      projects,
      technologies,
      certifications,
      education,
      languages,
    } = localizedContent[language];
    const labels =
      language === "es"
        ? {
            summary: "Perfil profesional",
            experience: "Experiencia profesional",
            other: "Experiencia adicional",
            skills: "Competencias técnicas",
            certifications: "Certificaciones",
            education: "Formación académica",
            projects: "Proyectos de formación",
            languages: "Idiomas",
          }
        : {
            summary: "Professional Summary",
            experience: "Professional Experience",
            other: "Additional Experience",
            skills: "Technical Skills",
            certifications: "Certifications",
            education: "Education",
            projects: "Training Projects",
            languages: "Languages",
          };
    const pdf = await PDFDocument.create();
    pdf.setTitle(`${profile.name} - CV (${language.toUpperCase()})`);
    pdf.setAuthor(profile.name);
    pdf.setSubject(`${profile.role} | ${profile.headline}`);
    pdf.setCreator("juanrvz.dev");
    pdf.setProducer("juanrvz.dev");
    pdf.setLanguage(language === "es" ? "es-ES" : "en-GB");
    const regular = await pdf.embedFont(StandardFonts.Helvetica);
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
    const width = 595.28,
      height = 841.89,
      margin = 44,
      bottom = 44;
    const textWidth = width - margin * 2;
    const ink = rgb(0.09, 0.12, 0.1);
    let page, y;
    const newPage = () => {
      page = pdf.addPage([width, height]);
      y = height - margin;
    };
    newPage();
    function wrap(text, font, size, maxWidth) {
      const words = clean(text).split(/\s+/);
      const lines = [];
      let line = "";
      for (const word of words) {
        const next = line ? `${line} ${word}` : word;
        if (font.widthOfTextAtSize(next, size) > maxWidth && line) {
          lines.push(line);
          line = word;
        } else line = next;
      }
      if (line) lines.push(line);
      return lines;
    }
    function measure(text, options = {}) {
      const { size = 10, strong = false, indent = 0, after = 3 } = options;
      return (
        wrap(text, strong ? bold : regular, size, textWidth - indent).length *
          size *
          1.35 +
        after
      );
    }
    function ensure(space) {
      if (y - space < bottom) newPage();
    }
    function paragraph(text, options = {}) {
      if (!text) return;
      const { size = 10, strong = false, indent = 0, after = 3 } = options;
      const font = strong ? bold : regular;
      for (const line of wrap(text, font, size, textWidth - indent)) {
        ensure(size * 1.2);
        y -= size * 1.2;
        page.drawText(line, { x: margin + indent, y, size, font, color: ink });
      }
      y -= after;
    }
    function section(title, followingSpace = 70) {
      ensure(35 + followingSpace);
      y -= 6;
      paragraph(title, { size: 12, strong: true, after: 6 });
    }
    function job(item, compact = false) {
      const title = `${item.role} | ${item.company}`;
      const bullets = compact ? [] : item.achievements || [];
      const total =
        measure(title, { strong: true }) +
        measure(item.period, { size: 9 }) +
        measure(item.description || "") +
        bullets.reduce(
          (sum, text) => sum + measure(`- ${text}`, { indent: 9 }),
          0,
        ) +
        9;
      ensure(total);
      paragraph(title, { strong: true });
      paragraph(item.period, { size: 9 });
      if (!compact) paragraph(item.description);
      for (const text of bullets) paragraph(`- ${text}`, { indent: 9 });
      y -= 3;
    }
    // Contact details are ordinary body text, never headers, footers or text boxes.
    paragraph(profile.name, { size: 22, strong: true, after: 4 });
    paragraph(`${profile.role} | ${profile.headline}`, {
      size: 10.5,
      strong: true,
      after: 7,
    });
    paragraph(`${profile.location} | ${profile.phone} | ${profile.email}`, {
      size: 9,
      after: 3,
    });
    paragraph(`LinkedIn: ${profile.linkedin}`, { size: 9, after: 3 });
    paragraph(`Web: https://juanrvz.dev | GitHub: ${profile.github}`, {
      size: 9,
      after: 7,
    });
    section(labels.summary);
    for (const text of profile.about) paragraph(text);
    section(labels.experience, 160);
    experience.forEach((item) => job(item));
    section(labels.other);
    additionalExperience.forEach((item) => job(item, true));
    section(labels.certifications);
    certifications.forEach((item) => paragraph(item.title));
    section(labels.education, 95);
    for (const item of education) {
      ensure(
        measure(item.title, { strong: true }) +
          measure(`${item.organization} | ${item.date}`) +
          measure(item.description || "") +
          8,
      );
      paragraph(item.title, { strong: true });
      paragraph(`${item.organization} | ${item.date}`);
      paragraph(item.description, { size: 9 });
      y -= 2;
    }
    section(labels.skills);
    for (const group of technologies)
      paragraph(`${group.category}: ${group.items.join(", ")}`);
    section(labels.projects, 90);
    for (const project of projects) {
      ensure(
        measure(project.title, { strong: true }) +
          measure(project.description) +
          measure(project.contribution || "") +
          measure(project.technologies.join(", "), { size: 9 }) +
          8,
      );
      paragraph(project.title, { strong: true });
      paragraph(project.description);
      paragraph(project.contribution);
      paragraph(project.technologies.join(", "), { size: 9, after: 6 });
    }
    section(labels.languages, 35);
    languages.forEach((item) => paragraph(`${item.name}: ${item.level}`));
    const path = `${outputDirectory}/juan-ramon-vaz-leon-${language}.pdf`;
    await writeFile(path, await pdf.save());
    console.log(`Generated ${path} (${pdf.getPageCount()} pages)`);
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  await generateCVs(process.argv[2]);
