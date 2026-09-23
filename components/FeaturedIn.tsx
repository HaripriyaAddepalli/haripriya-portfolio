'use client';

import { motion } from 'framer-motion';
import { Globe, Trophy, BookOpen } from 'lucide-react';

const featured = [
  {
    type: 'hackathon',
    icon: Trophy,
    title: 'Google Gemini Hackathon',
    description: 'Winner - Built innovative LLM application',
    date: 'March 2025',
  },
  {
    type: 'hackathon',
    icon: Trophy,
    title: 'Smart India Hackathon',
    description: 'Finalist - Real-time system for problem solving',
    date: 'February 2025',
  },
  {
    type: 'publication',
    icon: BookOpen,
    title: 'System Design Deep Dive',
    description: 'Technical blog post on medium.com',
    date: 'January 2025',
  },
  {
    type: 'media',
    icon: Globe,
    title: 'Tech Community Feature',
    description: 'Featured as AI Engineer of the Month',
    date: 'December 2024',
  },
];

export default function FeaturedIn() {
  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-purple-300 mb-8">Featured In</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featured.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ x: 4 }}
              className="backdrop-blur-xl bg-white/5 border border-purple-500/20 rounded-lg p-4 flex items-start gap-4 hover:border-purple-500/50 transition-all group"
            >
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg group-hover:scale-110 transition-transform flex-shrink-0">
                <Icon className="w-5 h-5 text-white" />
              </div>

              <div>
                <h4 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                <p className="text-xs text-purple-400 mt-2">{item.date}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
