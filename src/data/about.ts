export const about = {
  name: "Sandip Katel",
  role: "AI / ML Engineer & Researcher",
  shortRole: "AI Engineer · Researcher · Builder",
  bio: [
    "I build systems that learn - and try to understand why they do what they do. My work sits at the intersection of machine learning research and production engineering: I'm as comfortable reading a paper on attention mechanisms as I am debugging a Kafka consumer group lag.",
    "My curiosity is structural. I want to know not just whether a model works, but why it works, where it fails, and what those failures reveal about the problem. That curiosity shapes everything I build - I write code the way I'd write a proof: carefully, with named assumptions and explicit failure modes.",
    "When I'm not training models or wiring up data pipelines, I'm thinking about how intelligence works - the kind that runs on silicon and the kind that doesn't. I find the overlap between the two genuinely strange and endlessly interesting.",
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
      { name: "SQL", level: "expert" },
      { name: "JavaScript / TypeScript", level: "proficient" },
      { name: "Bash / Shell", level: "proficient" },
      { name: "R", level: "familiar" },
      { name: "C++", level: "familiar" },
    ],
  },
  {
    cluster: "ML / DL",
    icon: "∇",
    items: [
      { name: "PyTorch", level: "expert" },
      { name: "Hugging Face Transformers", level: "expert" },
      { name: "Scikit-learn", level: "expert" },
      { name: "JAX", level: "proficient" },
      { name: "TensorFlow / Keras", level: "proficient" },
      { name: "ONNX", level: "familiar" },
    ],
  },
  {
    cluster: "Data Engineering",
    icon: "⊕",
    items: [
      { name: "Apache Spark", level: "expert" },
      { name: "Apache Kafka", level: "proficient" },
      { name: "Apache Flink", level: "proficient" },
      { name: "dbt", level: "proficient" },
      { name: "Airflow", level: "proficient" },
      { name: "Snowflake / BigQuery", level: "proficient" },
    ],
  },
  {
    cluster: "Tools & Infra",
    icon: "◈",
    items: [
      { name: "Docker / Kubernetes", level: "proficient" },
      { name: "AWS (SageMaker, S3, EC2)", level: "proficient" },
      { name: "Git / GitHub Actions", level: "expert" },
      { name: "MLflow / W&B", level: "proficient" },
      { name: "FastAPI", level: "proficient" },
      { name: "PostgreSQL / Redis", level: "proficient" },
    ],
  },
  {
    cluster: "Research",
    icon: "∫",
    items: [
      { name: "Experiment Design", level: "expert" },
      { name: "Statistical Analysis", level: "expert" },
      { name: "Paper Writing / LaTeX", level: "proficient" },
      { name: "Mechanistic Interpretability", level: "proficient" },
      { name: "Federated Learning", level: "proficient" },
      { name: "NAS / AutoML", level: "familiar" },
    ],
  },
];

export const levelMeta = {
  expert: { label: "Expert", dots: 4, color: "var(--accent-violet)" },
  proficient: { label: "Proficient", dots: 3, color: "var(--accent-cyan)" },
  familiar: { label: "Familiar", dots: 2, color: "var(--text-muted)" },
};
