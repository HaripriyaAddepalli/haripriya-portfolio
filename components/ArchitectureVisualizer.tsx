'use client';

import { motion } from 'framer-motion';
import { Database, Server, Globe, Zap } from 'lucide-react';

export default function ArchitectureVisualizer({ projectId }: { projectId: string }) {
  const architectures: Record<string, any> = {
    'smart-task': {
      title: 'Smart Task Automation Architecture',
      layers: [
        {
          name: 'Frontend',
          icon: Globe,
          components: ['React', 'Next.js', 'Tailwind'],
          color: 'from-blue-400 to-blue-600',
        },
        {
          name: 'API Layer',
          icon: Server,
          components: ['Express', 'Node.js', 'REST API'],
          color: 'from-purple-400 to-purple-600',
        },
        {
          name: 'Processing',
          icon: Zap,
          components: ['LangChain', 'Groq API', 'Redis Cache'],
          color: 'from-pink-400 to-pink-600',
        },
        {
          name: 'Database',
          icon: Database,
          components: ['MongoDB', 'Redis', 'Elasticsearch'],
          color: 'from-green-400 to-green-600',
        },
      ],
    },
    'virtual-tryon': {
      title: 'Virtual Try-On ML Pipeline',
      layers: [
        {
          name: 'Client',
          icon: Globe,
          components: ['React', 'WebGL', 'TensorFlow.js'],
          color: 'from-blue-400 to-blue-600',
        },
        {
          name: 'Model Inference',
          icon: Zap,
          components: ['TF Lite', 'GPU Acceleration', 'Quantization'],
          color: 'from-orange-400 to-orange-600',
        },
        {
          name: 'Backend Services',
          icon: Server,
          components: ['FastAPI', 'Python', 'Model Serving'],
          color: 'from-purple-400 to-purple-600',
        },
        {
          name: 'Storage',
          icon: Database,
          components: ['S3', 'PostgreSQL', 'Vector DB'],
          color: 'from-green-400 to-green-600',
        },
      ],
    },
    'food-delivery': {
      title: 'Food Delivery Real-Time System',
      layers: [
        {
          name: 'Web/Mobile',
          icon: Globe,
          components: ['React', 'React Native', 'Next.js'],
          color: 'from-blue-400 to-blue-600',
        },
        {
          name: 'Real-time',
          icon: Zap,
          components: ['Socket.IO', 'WebSocket', 'Rooms'],
          color: 'from-red-400 to-red-600',
        },
        {
          name: 'Application',
          icon: Server,
          components: ['Node.js', 'Express', 'Business Logic'],
          color: 'from-purple-400 to-purple-600',
        },
        {
          name: 'Data',
          icon: Database,
          components: ['MongoDB', 'Transactions', 'Indexes'],
          color: 'from-green-400 to-green-600',
        },
      ],
    },
  };

  const arch = architectures[projectId] || architectures['smart-task'];

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-purple-300 mb-8">{arch.title}</h3>
      <div className="space-y-4">
        {arch.layers.map((layer: any, idx: number) => {
          const Icon = layer.icon;
          return (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative backdrop-blur-xl bg-gradient-to-r ${layer.color} p-6 rounded-lg overflow-hidden border border-white/10`}
            >
              {/* Background glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${layer.color} opacity-10`} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="w-6 h-6 text-white" />
                  <h4 className="text-xl font-bold text-white">{layer.name}</h4>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {layer.components.map((comp: string) => (
                    <div
                      key={comp}
                      className="px-3 py-2 bg-white/10 backdrop-blur-sm rounded border border-white/20 text-sm text-white font-medium"
                    >
                      {comp}
                    </div>
                  ))}
                </div>

                {idx < arch.layers.length - 1 && (
                  <div className="mt-4 text-center text-white/50 text-sm">↓ Data Flow</div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
