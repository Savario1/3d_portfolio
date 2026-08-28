/**
 * Project destinations — the single editable source for all project content.
 *
 * All three projects below are real, in-progress builds. Everything in `development`
 * reflects the actual current plan — nothing here is a finished result. `confirmedTechnologies`
 * lists only technologies that have genuinely been selected; leave it empty rather than
 * guessing ahead of a real decision.
 *
 * `caseStudy` holds fields for LATER — architecture, results, challenges, what-was-learned,
 * screenshots — once real implementation exists. Leave them empty (not "coming soon" text)
 * so the case-study panel hides them until there's something real to show. Only move a
 * project's `status` to "Completed" after it has actually been built.
 *
 * `github` / `demo` should stay `null` until a real URL exists — the UI will show
 * "Coming Soon" instead of linking anywhere.
 */

export const projects = [
  {
    id: "llm-document-analysis",
    sceneRef: "ai",
    title: "LLM-Powered Document Analysis",
    category: "Artificial Intelligence / LLM Applications",
    status: "In Development",
    summary:
      "A Python-based document intelligence application designed to extract key information, generate concise summaries, and answer natural-language questions grounded in document content.",
    github: null,
    demo: null,
    development: {
      goal: "Build a practical document-analysis workflow that helps users understand and retrieve information from documents more efficiently.",
      plannedCapabilities: [
        "Document ingestion",
        "Key-information extraction",
        "Concise document summaries",
        "Natural-language questions and answers",
        "Responses grounded in the supplied document content",
      ],
      confirmedTechnologies: ["Python"],
      currentLearningFocus: [
        "Document preprocessing",
        "Large language model application development",
        "Prompt design",
        "Grounded question-answering workflows",
      ],
      nextMilestone:
        "Create the initial repository, define the document-ingestion flow, and produce the first working summary and question-answering prototype.",
    },
    caseStudy: {
      architecture: "",
      results: "",
      challenges: "",
      learned: "",
      screenshots: [],
    },
  },
  {
    id: "aws-web-server-iac",
    sceneRef: "cloud",
    title: "AWS Web Server Infrastructure as Code",
    category: "Cloud Infrastructure",
    status: "In Development",
    summary:
      "A reproducible cloud-infrastructure project using Terraform to provision and configure a simple web server in AWS.",
    github: null,
    demo: null,
    development: {
      goal: "Apply Infrastructure as Code principles to create a repeatable AWS deployment while developing practical experience with cloud infrastructure, networking, automation, and security configuration.",
      plannedCapabilities: [
        "Terraform-managed cloud resources",
        "Reproducible infrastructure deployment",
        "Automated web-server provisioning",
        "Documented deployment and teardown process",
        "Basic networking and security configuration",
      ],
      confirmedTechnologies: ["Terraform", "AWS"],
      currentLearningFocus: [
        "Infrastructure as Code",
        "Terraform configuration and state",
        "AWS cloud fundamentals",
        "Networking and security concepts",
        "Repeatable deployment workflows",
      ],
      nextMilestone:
        "Create the initial Terraform repository, validate the first infrastructure plan, and deploy a minimal working web server.",
    },
    caseStudy: {
      architecture: "",
      results: "",
      challenges: "",
      learned: "",
      screenshots: [],
    },
  },
  {
    id: "trading-performance-analytics",
    sceneRef: "data",
    title: "Trading Performance Analytics",
    category: "Data Analytics",
    status: "In Development",
    summary:
      "An analytics workflow designed to transform raw trading results into clear measurements, summaries, trends, and visual insights.",
    github: null,
    demo: null,
    development: {
      goal: "Help evaluate trading performance through consistent calculations and readable visualizations rather than relying only on individual trade outcomes.",
      plannedCapabilities: [
        "Profitability",
        "Win rate",
        "Drawdown",
        "Risk-to-reward performance",
        "Performance trends",
        "Summary statistics and visualizations",
      ],
      confirmedTechnologies: [],
      currentLearningFocus: [
        "Data preparation",
        "Analytical calculations",
        "Performance metrics",
        "Trend analysis",
        "Clear data visualization",
      ],
      nextMilestone:
        "Define the trading-results data structure, validate the initial calculations, and create the first performance summary and visualization.",
    },
    caseStudy: {
      architecture: "",
      results: "",
      challenges: "",
      learned: "",
      screenshots: [],
    },
  },
];

export const getProjectById = (id) => projects.find((project) => project.id === id) ?? null;
