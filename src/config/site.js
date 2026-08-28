/**
 * Central site configuration.
 * Edit this file to update contact details and external links.
 * Any link left as `null` renders as a "Coming Soon" state instead of a dead link.
 */

export const siteConfig = {
  person: {
    name: "Savario Jenkins",
    shortName: "Savario",
    role: "Computer Science Student | Aspiring Software Engineer | AI, Cloud & Data",
    tagline:
      "Computer Science student building a foundation in software engineering through C++, C#, Python, Java, and JavaScript while actively developing skills in artificial intelligence, AWS cloud infrastructure, Terraform, and data analytics.",
    email: "hello@savariojenkins.com",
  },

  // Fill these in as accounts/profiles go live. Leave `null` to show "Coming Soon".
  links: {
    github: "https://github.com/Savario1",
    linkedin: "https://www.linkedin.com/in/savariojenkins/",
  },

  // Local, site-relative asset paths. See EDITING_GUIDE.md for how to replace these files.
  assets: {
    resume: "/resume-savario-jenkins.pdf",
    contactPortrait: "/contact-portrait.webp",
    favicon: "/favicon.svg",
    ogImage: "/og-image.png",
  },

  // Production domain — used to build canonical / Open Graph / Twitter absolute URLs.
  // Leave empty to omit domain-specific meta tags rather than publish a placeholder URL.
  siteUrl: "https://savariojenkins.com",

  meta: {
    title: "Savario Jenkins — Computer Science Student & Aspiring Software Engineer",
    description:
      "Portfolio of Savario Jenkins, a Computer Science student building practical skills in software engineering, artificial intelligence, cloud infrastructure, and data analytics.",
  },
};
