'use client';

import { motion } from 'framer-motion';
import { Zap, Users, TrendingUp, Clock } from 'lucide-react';

interface MetricProps {
  projectId: string;
}

export default function PerformanceMetrics({ projectId }: MetricProps) {
  const metrics: Record<string, any> = {
    'smart-task': {
      Latency: { value: '<200ms', icon: Clock, color: 'text-green-400' },
      'Peak Users': { value: '1000+', icon: Users, color: 'text-blue-400' },
      'Uptime SLA': { value: '99.5%', icon: TrendingUp, color: 'text-purple-400' },
      'Success Rate': { value: '97.8%', icon: Zap, color: 'text-pink-400' },
    },
    'virtual-tryon': {
      Inference: { value: '<100ms', icon: Clock, color: 'text-green-400' },
      'Concurrent Users': { value: '500+', icon: Users, color: 'text-blue-400' },
      'Accuracy': { value: '94.2%', icon: TrendingUp, color: 'text-purple-400' },
      'FPS': { value: '30+', icon: Zap, color: 'text-pink-400' },
    },
    'food-delivery': {
      'Response Time': { value: '<500ms', icon: Clock, color: 'text-green-400' },
      'Concurrent Orders': { value: '100+', icon: Users, color: 'text-blue-400' },
      'Daily Volume': { value: '500+ orders', icon: TrendingUp, color: 'text-purple-400' },
      'Uptime': { value: '99.8%', icon: Zap, color: 'text-pink-400' },
    },
  };

  const projectMetrics = metrics[projectId] || metrics['smart-task'];

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-purple-300 mb-8">Performance Metrics</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(projectMetrics).map(([key, data]: [string, any], idx) => {
          const Icon = data.icon;
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="backdrop-blur-xl bg-white/5 border border-purple-500/20 rounded-lg p-4 text-center hover:border-purple-500/50 transition-all group"
            >
              <Icon className={`w-6 h-6 mx-auto mb-2 ${data.color} group-hover:scale-110 transition-transform`} />
              <p className="text-2xl font-bold text-white mb-1">{data.value}</p>
              <p className="text-sm text-gray-400">{key}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
