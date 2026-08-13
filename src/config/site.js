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
      "I'm building practical skills across software engineering, artificial intelligence, cloud computing, and data analytics—with a focus on creating reliable projects that solve real problems.",
    email: "hello@savariojenkins.com",
  },

  // Fill these in as accounts/profiles go live. Leave `null` to show "Coming Soon".
  links: {
    github: null,
    linkedin: null,
  },

  // Local, site-relative asset paths. See README for how to replace the placeholder files.
  assets: {
    resume: "/resume-savario-jenkins.pdf",
    contactPortrait: "/contact-portrait.jpg",
    favicon: "/favicon.svg",
  },

  // Set this once a production domain is live (used for canonical / Open Graph tags).
  // Leave empty to omit domain-specific meta tags rather than publish a placeholder URL.
  siteUrl: "",

  meta: {
    title: "Savario Jenkins — Computer Science Student & Aspiring Software Engineer",
    description:
      "Portfolio of Savario Jenkins, a Computer Science student building practical skills in software engineering, AI, cloud computing, and data analytics.",
  },
};
