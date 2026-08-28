/**
 * Editable narrative content: About, Skills, Education, Completed Foundations.
 * Keep facts accurate — nothing here should be invented or overstated.
 */

export const about = {
  eyebrow: "About",
  heading: "A builder in training, in the open",
  paragraphs: [
    "I'm currently completing an Associate in Arts Computer Science transfer track at Santa Fe College, expected Summer 2027, with plans to continue toward a bachelor's degree in Computer Science after transferring. I previously completed a Computer Science certificate. Most of my hands-on experience has been with C++ and C#, including GUI applications, object-oriented programming, and data structures. I'm also actively practicing with Python, JavaScript, large language models, AWS, and Terraform.",
    "My professional background in logistics operations and team leadership has strengthened my communication, time management, troubleshooting, accuracy, teamwork, and ability to work independently. I'm seeking a software engineering internship or entry-level opportunity where I can apply my technical foundation, learn from experienced developers, and continue growing into a professional software engineer.",
  ],
  beyondTheCode: {
    label: "Beyond the Code",
    text: "Outside of coursework and code, I enjoy the long-form strategy of chess and collecting trading cards.",
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
      items: ["C++", "C#", "Python", "Java", "JavaScript"],
    },
    {
      label: "Tools & Workflow",
      items: ["Git", "GitHub", "Visual Studio", "wxWidgets"],
    },
    {
      label: "Currently Learning",
      variant: "learning",
      note: "Actively in progress — not yet an established strength.",
      items: ["AWS", "Terraform", "LLM Applications", "Infrastructure as Code", "Data Analytics"],
    },
    {
      label: "Foundations",
      items: [
        "Object-Oriented Programming",
        "Data Structures & Algorithms",
        "GUI Development",
        "Event-Driven Programming",
        "Technical Problem-Solving",
      ],
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
      credential: "Associate in Arts, Computer Science Transfer Track",
      institution: "Santa Fe College",
      status: "In Progress",
      expected: "Expected Summer 2027",
      note: "Completing a Computer Science transfer curriculum with coursework focused on programming, object-oriented development, data structures and algorithms, and software-development foundations.",
      supportingNote: "Plans to continue toward a bachelor's degree in Computer Science after transferring.",
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

/**
 * Compact, recruiter-facing proof of completed hands-on coursework. This is
 * deliberately smaller than the three flagship projects — it should never compete
 * with them visually or read as a fourth destination.
 */
export const completedFoundations = {
  eyebrow: "Completed Foundations",
  heading: "Hands-on work already shipped",
  items: [
    {
      title: "C++ Software Projects",
      status: "Completed Coursework",
      technologies: ["C++", "wxWidgets", "Object-Oriented Programming"],
      details: [
        "Created GUI applications including Brick Breaker, a Game of Life simulator, and a calculator while applying event handling, state updates, debugging, and object-oriented design.",
        "Implemented a dynamic array, doubly linked list, dictionary, binary search tree, and Huffman coding to strengthen memory management and algorithmic problem-solving.",
      ],
    },
  ],
};
