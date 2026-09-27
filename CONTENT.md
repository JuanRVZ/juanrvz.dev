# Portfolio content

Edit `src/content.js`. Use confirmed facts only. Empty optional URLs never create links.

- `profile`: name, role, headline, summary, about (paragraph array), location, email, phone, github, linkedin, cv.
- `experience`: `{ company, role, period, description, achievements: [] }`. The section and navigation entry stay hidden until this array contains entries.
- `projects`: `{ title, type, description, contribution?, technologies: [], url?, repository? }`. Current titles describe training work, not named products. Add repository URLs only after confirming them.
- `technologies`: `{ category, items: [] }`. No percentages or proficiency claims.
- `certifications` / `education`: `{ title, organization, date?, description?, url? }`. A credential link appears only when `url` exists.

## Still needed

- Individual project repositories and optional screenshots, with context about personal contributions.
- Certification verification URLs and dates, if available.
- Confirm that `juan@juanrvz.dev` receives mail. The site links to the address provided; it does not provision a mailbox or send messages.

The website is primarily English. Identity and SEO metadata are in `index.html`; keep these aligned with profile changes. The social card is `public/og-image.png`.

## Confirmed profile update

LinkedIn and relevant technical employment / education were added from the user-supplied Profile.pdf. Earlier non-technical roles were omitted to keep the portfolio focused. The PDF itself is not published because it includes personal contact details. The preferred professional email remains unchanged. No duties were inferred for roles without a description.

## Language and theme

English remains the default language. Spanish translations for content and interface copy live in `src/i18n.js`; update the corresponding translation when changing English text. Product names and official SAP credential names remain unchanged.

The header toggles EN/ES and cycles System → Light → Dark. The system setting follows `prefers-color-scheme` live; explicit choices and language are saved locally when browser storage is available. `src/usePreferences.js` keeps the first React render consistent with the prerendered HTML. A small head script applies a stored color preference before paint.

## Automatically generated CV

`npm run build` generates both language versions before Vite copies static assets. `npm run dev` also generates them at startup; after editing data during a running development session, run `npm run generate:cv` to refresh downloads.

- Generator: `scripts/generate-cv.mjs` (Node.js, build-only `pdf-lib`).
- Source: `src/content.js` and translations in `src/i18n.js`.
- Output: `public/cv/juan-ramon-vaz-leon-en.pdf` and `public/cv/juan-ramon-vaz-leon-es.pdf`, ignored by Git and recreated in Cloudflare builds.
- The CV button downloads the current language. The contact section and PDFs include the explicitly supplied phone number.
- `additionalExperience` and `languages` supplement the PDF with information from the supplied LinkedIn export, without lengthening the main website.

The PDFs use one column, selectable text, standard headings, simple fonts and contact details in the document body. These address common parsing problems described by [Greenhouse](https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse); compatibility with every ATS cannot be guaranteed. Never represent a training project as a production deployment. Recheck text extraction and page breaks after substantial content changes.
