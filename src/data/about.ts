export const about = {
  name: "Sandip Katel",
  role: "AI / ML Engineer & Researcher",
  shortRole: "AI Engineer · Researcher · Builder",
  bio: [
    "I build systems that learn and try to understand why they do what they do. My work sits at the intersection of machine learning research and production engineering: I'm as comfortable reading a paper on attention mechanisms as I am debugging a FastAPI response schema.",
    "My curiosity is structural. I want to know not just whether a model works, but why it works, where it fails, and what those failures reveal about the problem. That curiosity shapes everything I build - I write code the way I'd write a proof: carefully, with named assumptions and explicit failure modes.",
  ],
  location: "Kathmandu, Nepal",
  email: "babusandipkatel@gmail.com",
  linkedin: "https://linkedin.com/in/sandipkatel",
  github: "https://github.com/sandipkatel",
  instagram: "https://instagram.com/sandipkatel",
  medium: "https://medium.com/@babusandipkatel",
};

export const skills = [
  {
    cluster: "Languages",
    icon: "{ }",
    items: [
      { name: "Python", level: "expert" },
      { name: "SQL", level: "proficient" },
      { name: "JavaScript/TypeScript", level: "proficient" },
      { name: "C/C++", level: "familiar" },
    ],
  },
  {
  cluster: "Software Engineering",
  icon: "⌥",
  items: [
    { name: "FastAPI", level: "expert" },
    { name: "React", level: "proficient" },
    { name: "Next.js", level: "proficient" },
    { name: "Database Design", level: "proficient" },
  ],
},
  {
    cluster: "Databases",
    icon: "⊗",
    items: [
      { name: "PostgreSQL", level: "expert" },
      { name: "Supabase", level: "proficient" },
      { name: "MySQL", level: "proficient" },
      { name: "SQLite", level: "proficient" },
    ],
  },
  {
    cluster: "Tools & DevOps",
    icon: "◈",
    items: [
      { name: "Git / GitHub Actions", level: "expert" },
      { name: "Docker", level: "proficient" },
      { name: "CI/CD", level: "proficient" },
      { name: "Linux", level: "proficient" },
    ],
  },
  {
    cluster: "AI / ML",
    icon: "∇",
    items: [
      { name: "PyTorch", level: "expert" },
      { name: "scikit-learn", level: "expert" },
      { name: "Hugging Face", level: "proficient" },
      { name: "RAG / LangChain", level: "proficient" },
    ],
  },
  {
    cluster: "Research",
    icon: "∫",
    items: [
      { name: "Experiment Design", level: "expert" },
      { name: "Statistical Analysis", level: "expert" },
      { name: "Paper Writing / LaTeX", level: "proficient" },
      { name: "Mechanistic Interpretability", level: "familiar" },
    ],
  },
];

export const levelMeta = {
  expert: { label: "Expert", dots: 4, color: "var(--accent-violet)" },
  proficient: { label: "Proficient", dots: 3, color: "var(--accent-cyan)" },
  familiar: { label: "Familiar", dots: 2, color: "var(--text-muted)" },
};