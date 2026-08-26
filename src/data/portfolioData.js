export const portfolioData = {
  person: {
    name: "Toshal Kirange",
    label: "Computer Science Student / Developer",
    shortBio: "Building software, solving problems, and learning in public.",
    fullBio: "I'm a Computer Science Engineering student focused on building practical software and improving my problem-solving skills. I enjoy working with modern web technologies, exploring AI/ML, and solving challenging DSA problems.",
    status: "Currently building & learning"
  },
  links: {
    github: "https://github.com/toshuuu ",
    linkedin: "",
    email: "mailto:toshalkirange8@gmail.com"
  },
  info: {
    education: "Computer Science Engineering",
    focus: "Software Development · DSA · Web",
    interests: "AI/ML · Open Source · Systems",
    learning: "Advanced DSA · Backend Development · AI"
  },
  skills: [
    { category: "LANGUAGES", items: "C++ · JavaScript · Python" },
    { category: "FRONTEND", items: "React · Vite · Tailwind CSS · HTML · CSS" },
    { category: "BACKEND", items: "Node.js · Express" },
    { category: "DATABASE", items: "MongoDB . SQL" },
    { category: "TOOLS", items: "Git · GitHub · Postman · Vercel . Npm" },
    { category: "CS FUNDAMENTALS", items: "DSA · OOP · DBMS · Operating Systems · Computer Networks" }
  ],
  projects: [
    {
      id: "01",
      name: "Crisis Information Detection",
      description: "A short description of the project and the problem it solves.",
      tech: "React · Node.js · MongoDB",
      github: "#",
      demo: "#"
    },
    {
      id: "02",
      name: "PROJECT NAME",
      description: "Description",
      tech: "React · Express · MongoDB",
      github: "#",
      demo: "#"
    },
    {
      id: "03",
      name: "PROJECT NAME",
      description: "Description",
      tech: "Python · AI/ML",
      github: "#",
      demo: "#"
    }
  ],
  stats: {
    leetcode: {
      // LeetCode username — used for live API fetch
      username: "toshal__",
      // Fallback values shown while loading or if API is unavailable
      solved: 260,
      easy: 120,
      medium: 125,
      hard: 15,
      contestRating: 1559,
      target: 500,
      // Approximate totals per difficulty (used for bar width % calculation)
      // These come from the API but are set here as reference values
      totalEasy: 961,
      totalMedium: 2105,
      totalHard: 967,
      recentSubmissions: [
        { id: 1, problem: "Two Sum", difficulty: "Easy", time: "2 hours ago" },
        { id: 2, problem: "LRU Cache", difficulty: "Medium", time: "1 day ago" },
        { id: 3, problem: "Merge K Sorted Lists", difficulty: "Hard", time: "2 days ago" }
      ]
    }
  },
  experience: [
    {
      year: "2026",
      role: "ROLE / CONTRIBUTION",
      org: "Organization",
      description: "Description of work or contribution."
    },
    {
      year: "2025",
      role: "ROLE / CONTRIBUTION",
      org: "Organization",
      description: "Description."
    }
  ],
  learning: [
    "Advanced DSA",
    "Backend Architecture",
    // "AI / ML",
    "System Design",
    "Open Source"
  ]
};
