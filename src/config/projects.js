/**
 * Project destinations — the single editable source for all project content.
 *
 * Every project below is a real, in-progress build. Nothing in `caseStudy` has been
 * invented: fields are intentionally left as "Details coming soon" placeholders until
 * there is real content to report. Fill them in as each project develops.
 *
 * `github` / `demo` should stay `null` until a real URL exists — the UI will show
 * "Coming Soon" instead of linking anywhere.
 */

export const projects = [
  {
    id: "ai-engineering",
    sceneRef: "ai",
    title: "AI Engineering Project",
    category: "Artificial Intelligence",
    status: "In Development",
    summary:
      "An applied AI engineering build, represented in the network as an active neural core.",
    github: null,
    demo: null,
    caseStudy: {
      overview: "Details coming soon.",
      problem: "Details coming soon.",
      architecture: "Details coming soon.",
      technologies: [],
      process: "Details coming soon.",
      challenges: "Details coming soon.",
      results: "Details coming soon.",
      learned: "Details coming soon.",
      screenshots: [],
    },
  },
  {
    id: "aws-cloud",
    sceneRef: "cloud",
    title: "AWS Cloud Project",
    category: "Cloud Infrastructure",
    status: "In Development",
    summary:
      "A cloud infrastructure build on AWS, represented in the network as a cluster of connected services.",
    github: null,
    demo: null,
    caseStudy: {
      overview: "Details coming soon.",
      problem: "Details coming soon.",
      architecture: "Details coming soon.",
      technologies: [],
      process: "Details coming soon.",
      challenges: "Details coming soon.",
      results: "Details coming soon.",
      learned: "Details coming soon.",
      screenshots: [],
    },
  },
  {
    id: "data-analytics",
    sceneRef: "data",
    title: "Data Analytics Project",
    category: "Data Analytics",
    status: "In Development",
    summary:
      "A data analytics build, represented in the network as a flowing data observatory.",
    github: null,
    demo: null,
    caseStudy: {
      overview: "Details coming soon.",
      problem: "Details coming soon.",
      architecture: "Details coming soon.",
      technologies: [],
      process: "Details coming soon.",
      challenges: "Details coming soon.",
      results: "Details coming soon.",
      learned: "Details coming soon.",
      screenshots: [],
    },
  },
];

export const getProjectById = (id) => projects.find((project) => project.id === id) ?? null;
