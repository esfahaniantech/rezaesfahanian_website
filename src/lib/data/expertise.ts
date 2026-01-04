import { Database, Brain, Cog, Target } from "lucide-react"
import { ExpertiseCategory } from "@/types"

export const expertiseCategories: ExpertiseCategory[] = [
  {
    id: "data-engineering",
    title: "Data Engineering & Architecture",
    description: "Scalable data-driven application architecture with robust pipelines",
    icon: Database,
    technologies: [
      "Apache Kafka", "Apache Spark", "Flink", "Hadoop",
      "PostgreSQL", "MongoDB", "Cassandra", "BigQuery", "Redshift",
      "Airflow", "Apache Nifi", "Talend",
      "Tableau", "Power BI", "Looker"
    ],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "End-to-end ML development from research to production",
    icon: Brain,
    technologies: [
      "TensorFlow", "PyTorch", "Scikit-learn", "FastAI",
      "Keras", "Hugging Face",
      "GPT-4", "LLaMA 3", "Gemini 1.5 Pro",
      "Transformers", "BERT",
      "OpenCV", "YOLO"
    ],
  },
  {
    id: "mlops",
    title: "MLOps & Deployment",
    description: "Scalable, automated ML pipelines in production",
    icon: Cog,
    technologies: [
      "Kubernetes", "Docker",
      "MLflow", "AWS SageMaker",
      "CI/CD for ML"
    ],
  },
  {
    id: "applied-ai",
    title: "Applied AI Focus Areas",
    description: "Business-focused AI applications",
    icon: Target,
    technologies: [
      "Predictive Analytics",
      "Prescriptive Analytics",
      "Real-time Data Applications",
      "Personalization Engines",
      "Enterprise Knowledge Management"
    ],
  },
]

