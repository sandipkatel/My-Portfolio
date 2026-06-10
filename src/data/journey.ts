export interface SkillNode {
  id: string;
  label: string;
  year: number;
  proficiency: number; // 0..1 - drives base activation/glow
  layerIndex: number;
  neuronIndex: number;
}

export interface JourneyPhase {
  layerIndex: number;
  label: string;
  year: string;
  description: string;
}

// Each output node declares which upstream node ids "led to" it.
// The forward pass will trace these from output → input (reverse highlight).
export interface OutputPath {
  outputNodeId: string;
  label: string;
  description: string;
  color: { R: number; G: number; B: number };
  // All ancestor node ids that contributed - ordered loosely input→output
  ancestorNodes: string[];
}

// ─── Layer sizes: [6, 9, 11, 11, 9, 4] ───────────────────────────────────────

export const JOURNEY_PHASES: JourneyPhase[] = [
  { layerIndex: 0, label: "Foundation",  year: "2022-23", description: "Core CS & math - algorithms, linear algebra, calculus, statistics." },
  { layerIndex: 1, label: "Exploration", year: "2023-24", description: "First taste of ML, data wrangling, Python ecosystem & side projects." },
  { layerIndex: 2, label: "Depth",       year: "2024-25", description: "Deep learning, research papers, internships and first real models." },
  { layerIndex: 3, label: "Engineering", year: "2025-26", description: "Production ML, MLOps, pipelines, APIs and scalable systems." },
  { layerIndex: 4, label: "Research",    year: "2022-23", description: "Novel architectures, NLP/CV experiments, published findings." },
  { layerIndex: 5, label: "Now",         year: "2024-",   description: "AI product engineering, LLM applications, end-to-end ownership." },
];

export const SKILL_NODES: SkillNode[] = [
  // ── Layer 0 - Foundation (6) ──────────────────────────────────────────────
  { id: "l0_math",    label: "Linear Algebra", year: 2018, proficiency: 0.85, layerIndex: 0, neuronIndex: 0 },
  { id: "l0_calc",    label: "Calculus",       year: 2018, proficiency: 0.80, layerIndex: 0, neuronIndex: 1 },
  { id: "l0_stats",   label: "Statistics",     year: 2018, proficiency: 0.90, layerIndex: 0, neuronIndex: 2 },
  { id: "l0_algo",    label: "Algorithms",     year: 2019, proficiency: 0.88, layerIndex: 0, neuronIndex: 3 },
  { id: "l0_python",  label: "Python",         year: 2019, proficiency: 0.95, layerIndex: 0, neuronIndex: 4 },
  { id: "l0_sql",     label: "SQL",            year: 2019, proficiency: 0.82, layerIndex: 0, neuronIndex: 5 },

  // ── Layer 1 - Exploration (9) ─────────────────────────────────────────────
  { id: "l1_numpy",   label: "NumPy",          year: 2019, proficiency: 0.90, layerIndex: 1, neuronIndex: 0 },
  { id: "l1_pandas",  label: "Pandas",         year: 2019, proficiency: 0.92, layerIndex: 1, neuronIndex: 1 },
  { id: "l1_sklearn", label: "Scikit-learn",   year: 2019, proficiency: 0.88, layerIndex: 1, neuronIndex: 2 },
  { id: "l1_viz",     label: "Data Viz",       year: 2020, proficiency: 0.80, layerIndex: 1, neuronIndex: 3 },
  { id: "l1_eda",     label: "EDA",            year: 2020, proficiency: 0.85, layerIndex: 1, neuronIndex: 4 },
  { id: "l1_git",     label: "Git",            year: 2020, proficiency: 0.87, layerIndex: 1, neuronIndex: 5 },
  { id: "l1_linux",   label: "Linux",          year: 2020, proficiency: 0.78, layerIndex: 1, neuronIndex: 6 },
  { id: "l1_prob",    label: "Probability",    year: 2020, proficiency: 0.83, layerIndex: 1, neuronIndex: 7 },
  { id: "l1_feature", label: "Feature Eng.",   year: 2020, proficiency: 0.86, layerIndex: 1, neuronIndex: 8 },

  // ── Layer 2 - Depth (11) ──────────────────────────────────────────────────
  { id: "l2_pytorch", label: "PyTorch",        year: 2020, proficiency: 0.92, layerIndex: 2, neuronIndex: 0 },
  { id: "l2_tf",      label: "TensorFlow",     year: 2020, proficiency: 0.80, layerIndex: 2, neuronIndex: 1 },
  { id: "l2_cnn",     label: "CNN",            year: 2020, proficiency: 0.88, layerIndex: 2, neuronIndex: 2 },
  { id: "l2_rnn",     label: "RNN / LSTM",     year: 2021, proficiency: 0.82, layerIndex: 2, neuronIndex: 3 },
  { id: "l2_nlp",     label: "NLP Basics",     year: 2021, proficiency: 0.85, layerIndex: 2, neuronIndex: 4 },
  { id: "l2_cv",      label: "Computer Vision",year: 2021, proficiency: 0.87, layerIndex: 2, neuronIndex: 5 },
  { id: "l2_train",   label: "Training Loops", year: 2021, proficiency: 0.90, layerIndex: 2, neuronIndex: 6 },
  { id: "l2_loss",    label: "Loss Functions", year: 2021, proficiency: 0.88, layerIndex: 2, neuronIndex: 7 },
  { id: "l2_optim",   label: "Optimizers",     year: 2021, proficiency: 0.85, layerIndex: 2, neuronIndex: 8 },
  { id: "l2_paper",   label: "Paper Reading",  year: 2021, proficiency: 0.80, layerIndex: 2, neuronIndex: 9 },
  { id: "l2_intern",  label: "Internship",     year: 2021, proficiency: 0.78, layerIndex: 2, neuronIndex: 10 },

  // ── Layer 3 - Engineering (11) ────────────────────────────────────────────
  { id: "l3_docker",   label: "Docker",         year: 2021, proficiency: 0.85, layerIndex: 3, neuronIndex: 0 },
  { id: "l3_api",      label: "REST APIs",      year: 2021, proficiency: 0.90, layerIndex: 3, neuronIndex: 1 },
  { id: "l3_fastapi",  label: "FastAPI",        year: 2022, proficiency: 0.88, layerIndex: 3, neuronIndex: 2 },
  { id: "l3_mlflow",   label: "MLflow",         year: 2022, proficiency: 0.82, layerIndex: 3, neuronIndex: 3 },
  { id: "l3_pipeline", label: "ML Pipelines",   year: 2022, proficiency: 0.87, layerIndex: 3, neuronIndex: 4 },
  { id: "l3_cloud",    label: "Cloud (AWS/GCP)",year: 2022, proficiency: 0.80, layerIndex: 3, neuronIndex: 5 },
  { id: "l3_spark",    label: "Spark",          year: 2022, proficiency: 0.75, layerIndex: 3, neuronIndex: 6 },
  { id: "l3_airflow",  label: "Airflow",        year: 2022, proficiency: 0.78, layerIndex: 3, neuronIndex: 7 },
  { id: "l3_monitor",  label: "Monitoring",     year: 2022, proficiency: 0.80, layerIndex: 3, neuronIndex: 8 },
  { id: "l3_test",     label: "Testing",        year: 2022, proficiency: 0.83, layerIndex: 3, neuronIndex: 9 },
  { id: "l3_postgres", label: "PostgreSQL",     year: 2022, proficiency: 0.85, layerIndex: 3, neuronIndex: 10 },

  // ── Layer 4 - Research (9) ────────────────────────────────────────────────
  { id: "l4_transformer", label: "Transformers", year: 2022, proficiency: 0.90, layerIndex: 4, neuronIndex: 0 },
  { id: "l4_attention",   label: "Attention",    year: 2022, proficiency: 0.88, layerIndex: 4, neuronIndex: 1 },
  { id: "l4_finetune",    label: "Fine-tuning",  year: 2022, proficiency: 0.87, layerIndex: 4, neuronIndex: 2 },
  { id: "l4_rag",         label: "RAG",          year: 2023, proficiency: 0.85, layerIndex: 4, neuronIndex: 3 },
  { id: "l4_embed",       label: "Embeddings",   year: 2023, proficiency: 0.88, layerIndex: 4, neuronIndex: 4 },
  { id: "l4_eval",        label: "Eval Metrics", year: 2023, proficiency: 0.82, layerIndex: 4, neuronIndex: 5 },
  { id: "l4_diffusion",   label: "Diffusion",    year: 2023, proficiency: 0.75, layerIndex: 4, neuronIndex: 6 },
  { id: "l4_multimodal",  label: "Multimodal",   year: 2023, proficiency: 0.78, layerIndex: 4, neuronIndex: 7 },
  { id: "l4_research",    label: "Research",     year: 2023, proficiency: 0.85, layerIndex: 4, neuronIndex: 8 },

  // ── Layer 5 - Output (4) ──────────────────────────────────────────────────
  { id: "out_ml",   label: "ML Engineering",   year: 2024, proficiency: 0.95, layerIndex: 5, neuronIndex: 0 },
  { id: "out_data", label: "Data Engineering", year: 2024, proficiency: 0.90, layerIndex: 5, neuronIndex: 1 },
  { id: "out_llm",  label: "LLM / GenAI",      year: 2024, proficiency: 0.92, layerIndex: 5, neuronIndex: 2 },
  { id: "out_res",  label: "AI Research",      year: 2024, proficiency: 0.85, layerIndex: 5, neuronIndex: 3 },
];

// ─── Output paths: click an output node to trace what led there ──────────────
export const OUTPUT_PATHS: OutputPath[] = [
  {
    outputNodeId: "out_ml",
    label: "ML Engineering",
    description: "Building, training and shipping production ML systems end-to-end.",
    color: { R: 56, G: 189, B: 248 },
    ancestorNodes: [
      "l0_math", "l0_python", "l0_algo",
      "l1_numpy", "l1_sklearn", "l1_feature", "l1_git",
      "l2_pytorch", "l2_cnn", "l2_train", "l2_loss", "l2_optim", "l2_intern",
      "l3_docker", "l3_api", "l3_fastapi", "l3_pipeline", "l3_mlflow", "l3_cloud", "l3_monitor",
      "l4_transformer", "l4_finetune", "l4_eval",
      "out_ml",
    ],
  },
  {
    outputNodeId: "out_data",
    label: "Data Engineering",
    description: "Designing robust pipelines, feature stores and distributed data systems.",
    color: { R: 52, G: 211, B: 153 },
    ancestorNodes: [
      "l0_sql", "l0_algo", "l0_python",
      "l1_pandas", "l1_eda", "l1_viz", "l1_linux",
      "l2_intern", "l2_train",
      "l3_spark", "l3_airflow", "l3_postgres", "l3_pipeline", "l3_cloud", "l3_monitor", "l3_test",
      "l4_eval", "l4_embed",
      "out_data",
    ],
  },
  {
    outputNodeId: "out_llm",
    label: "LLM / GenAI",
    description: "Fine-tuning, RAG, prompt engineering and production LLM applications.",
    color: { R: 167, G: 139, B: 250 },
    ancestorNodes: [
      "l0_math", "l0_python", "l0_stats",
      "l1_feature", "l1_prob", "l1_sklearn",
      "l2_pytorch", "l2_nlp", "l2_rnn", "l2_paper", "l2_train",
      "l3_fastapi", "l3_api", "l3_docker", "l3_mlflow",
      "l4_transformer", "l4_attention", "l4_finetune", "l4_rag", "l4_embed",
      "out_llm",
    ],
  },
  {
    outputNodeId: "out_res",
    label: "AI Research",
    description: "Novel architectures, multimodal systems and experimental ML research.",
    color: { R: 251, G: 146, B: 60 },
    ancestorNodes: [
      "l0_math", "l0_calc", "l0_stats",
      "l1_prob", "l1_numpy", "l1_feature",
      "l2_pytorch", "l2_cv", "l2_rnn", "l2_paper", "l2_loss", "l2_optim",
      "l3_cloud", "l3_monitor", "l3_test",
      "l4_transformer", "l4_attention", "l4_multimodal", "l4_diffusion", "l4_research", "l4_eval",
      "out_res",
    ],
  },
];
