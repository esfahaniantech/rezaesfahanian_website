"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const techCategories = [
  {
    name: "AI/ML Frameworks",
    items: ["TensorFlow", "PyTorch", "Scikit-learn", "FastAI", "Keras", "Hugging Face"],
  },
  {
    name: "LLMs & Foundation Models",
    items: ["GPT-4", "LLaMA 3", "Gemini 1.5 Pro", "Transformers", "BERT", "Claude"],
  },
  {
    name: "Data Infrastructure",
    items: ["Apache Kafka", "Apache Spark", "Flink", "Hadoop", "Airflow", "Apache Nifi"],
  },
  {
    name: "Databases",
    items: ["PostgreSQL", "MongoDB", "Cassandra", "BigQuery", "Redshift", "Redis"],
  },
  {
    name: "MLOps & Deployment",
    items: ["Kubernetes", "Docker", "MLflow", "AWS SageMaker", "CI/CD for ML"],
  },
  {
    name: "Cloud Platforms",
    items: ["AWS", "Google Cloud", "Azure", "Vercel", "Cloudflare"],
  },
  {
    name: "Computer Vision",
    items: ["OpenCV", "YOLO", "Image Classification", "Object Detection"],
  },
  {
    name: "Programming Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "Go"],
  },
]

export function TechStack() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
          Technology Stack
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <Badge 
                    key={item} 
                    variant="secondary" 
                    className="bg-card border border-border text-card-foreground"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
