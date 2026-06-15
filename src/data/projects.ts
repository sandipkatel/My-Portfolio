export type Project = {
  id: string;
  title: string;
  tagline: string;
  tags: string[];
  year: string;
  github?: string;
  demo?: string;
  image?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: 'distributed-llm-training',
    title: 'Distributed Training Pipeline for LLM Fine-Tuning',
    tagline:
      'Multi-GPU fine-tuning pipeline built on PyTorch FSDP, cutting training time by 40% while staying inside a tight memory budget.',
    tags: ['PyTorch', 'FSDP', 'Distributed Systems', 'LLM', 'CUDA'],
    year: '2025',
    github: 'https://github.com/babusandipkatel/distributed-llm-training',
    demo: 'https://distributed-llm-training-demo.vercel.app',
    image: 'https://picsum.photos/seed/distributed-llm-training/1000/1000',
    featured: true,
  },
  {
    id: 'rag-docs-assistant',
    title: 'RAG Documentation Assistant',
    tagline: 'Retrieval-augmented chatbot that answers questions directly from internal engineering docs.',
    tags: ['RAG', 'LangChain', 'Vector DB', 'LLM'],
    year: '2025',
    github: 'https://github.com/babusandipkatel/rag-docs-assistant',
    demo: 'https://rag-docs-assistant-demo.vercel.app',
    image: 'https://picsum.photos/seed/rag-docs-assistant/800/400',
  },
  {
    id: 'realtime-feature-store',
    title: 'Real-Time Feature Store',
    tagline: 'Low-latency feature serving layer for recommendation models.',
    tags: ['Redis', 'Kafka', 'Feature Store', 'MLOps'],
    year: '2024',
    github: 'https://github.com/babusandipkatel/realtime-feature-store',
    image: 'https://picsum.photos/seed/realtime-feature-store/600/900',
  },
  {
    id: 'vit-from-scratch',
    title: 'Vision Transformer From Scratch',
    tagline: 'Implemented ViT in raw PyTorch to understand attention-based image classification end to end.',
    tags: ['PyTorch', 'Computer Vision', 'Transformers'],
    year: '2024',
    github: 'https://github.com/babusandipkatel/vit-from-scratch',
  },
  {
    id: 'streaming-etl',
    title: 'Streaming ETL with Kafka and Airflow',
    tagline: 'Event-driven ETL pipeline processing 2M+ daily events with schema validation and replay support.',
    tags: ['Kafka', 'Airflow', 'Data Engineering', 'Spark', 'Schema Registry'],
    year: '2024',
    github: 'https://github.com/babusandipkatel/streaming-etl',
    demo: 'https://streaming-etl-dashboard.vercel.app',
  },
  {
    id: 'nn-visualizer',
    title: 'Neural Network Visualizer',
    tagline: 'Interactive canvas for exploring activations layer by layer.',
    tags: ['Canvas', 'React', 'Visualization'],
    year: '2023',
    demo: 'https://nn-visualizer-demo.vercel.app',
  },
  {
    id: 'sentiment-api',
    title: 'Sentiment Analysis API',
    tagline: 'FastAPI service serving a fine-tuned DistilBERT model for sentiment scoring.',
    tags: ['FastAPI', 'DistilBERT', 'NLP'],
    year: '2023',
    github: 'https://github.com/babusandipkatel/sentiment-api',
  },
  {
    id: 'edge-model-quantization',
    title: 'Edge Model Quantization Toolkit',
    tagline: 'Post-training quantization scripts for deploying CV models on edge devices.',
    tags: ['Quantization', 'ONNX', 'Edge AI'],
    year: '2023',
    github: 'https://github.com/babusandipkatel/edge-model-quantization',
    image: 'https://imgs.search.brave.com/sJz5BvHVSo1KcF2zZoVW6DOBvaqYotHN4tXmEUgjm0k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YTQuZ2lwaHkuY29t/L21lZGlhL3YxLlky/bGtQVGM1TUdJM05q/RXhOM2htYVdGeWVH/UXhhRGQ2ZFd0bWFH/WmtlVGhzY0RGdWFY/cDRkRFZvY25vMk1E/bHRNR1YxT0NabGNE/MTJNVjluYVdaelgz/TmxZWEpqYUNaamRE/MW4vempKVHAyeFp6/YjUzbDNIYVZZLzIw/MC5naWY.gif'
  },
  {
    id: 'multi-agent-framework',
    title: 'Multi-Agent Orchestration Framework',
    tagline: 'A lightweight framework for coordinating specialized LLM agents on complex multi-step tasks.',
    tags: ['LLM', 'Agents', 'Orchestration', 'Python'],
    year: '2025',
    github: 'https://github.com/babusandipkatel/multi-agent-framework',
    demo: 'https://multi-agent-framework-demo.vercel.app',
    image: 'https://imgs.search.brave.com/MmfJxBDX2SarmCOk_ZrQUAOkEh1neBw2mNy-tbH7uV8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTAz/NjAzOTEyL3Bob3Rv/L25lcGFsaS1saXR0/bGUtZ2lybHMtbG9v/a2luZy1hdC1hbm5h/cHVybmEtc291dGgu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PW9KU051dHJEUXVE/MkNNV282YVRYd2d1/b3RqeFRyT1NockZJ/aUNvVWk4UDA9',
    featured: true,
  },
];