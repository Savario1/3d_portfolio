/**
 * Editable narrative content: About, Skills, Education.
 * Keep facts accurate — nothing here should be invented or overstated.
 */

export const about = {
  eyebrow: "About",
  heading: "A builder in training, in the open",
  paragraphs: [
    "Savario Jenkins is a Computer Science student developing a strong technical foundation and actively pursuing opportunities to grow into a professional software engineer.",
    "A background outside of tech has already shaped how Savario works today — sharpening communication, time management, troubleshooting under pressure, teamwork, and the ability to pick up new tools and concepts quickly. Those habits now carry directly into how each project and problem gets approached.",
    "The current focus is simple: keep learning in public, keep shipping real projects, and keep closing the gap between student and professional software engineer.",
  ],
  beyondTheCode: {
    label: "Beyond the Code",
    text: "Outside of coursework and code, Savario enjoys the long-form strategy of chess and collecting trading cards.",
  },
};

export const skills = {
  eyebrow: "Skills & Current Learning",
  heading: "Nodes in an active network",
  intro:
    "These are the languages, tools, and foundations currently in active use and development — represented here as connected parts of one growing system rather than a checklist of expertise.",
  groups: [
    {
      label: "Languages",
      items: ["C++", "C#", "Python", "JavaScript"],
    },
    {
      label: "Tools & Workflow",
      items: ["Git", "Visual Studio"],
    },
    {
      label: "Foundations",
      items: ["Object-Oriented Programming", "Data Structures & Algorithms"],
    },
  ],
};

export const education = {
  eyebrow: "Education & Certifications",
  heading: "Currently in progress",
  intro:
    "Formal study and self-directed certification work are running in parallel, each feeding into the other.",
  items: [
    {
      credential: "Bachelor's Degree in Computer Science",
      status: "In Progress",
      note: "Core coursework in computer science and software development fundamentals.",
    },
    {
      credential: "AWS Cloud Certification Path",
      status: "In Progress",
      note: "Building foundational cloud computing and infrastructure knowledge on AWS.",
    },
    {
      credential: "Google Data Analytics Certification",
      status: "In Progress",
      note: "Developing practical data analysis and analytics skills.",
    },
  ],
};
