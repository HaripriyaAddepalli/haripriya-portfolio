'use client';

import { motion } from 'framer-motion';
import { clientLogos } from '@/lib/portfolio-data';

export default function ClientLogos() {
  return (
    <div className="w-full">
      <h3 className="text-center text-sm font-semibold text-gray-400 mb-8 uppercase tracking-widest">
        Worked With
      </h3>

      <div className="flex items-center justify-center gap-8 flex-wrap">
        {clientLogos.map((client, idx) => (
          <motion.div
            key={client.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-xl bg-white/5 border border-purple-500/20 rounded-lg p-6 hover:border-purple-500/50 transition-all"
          >
            <div className="h-12 flex items-center justify-center">
              <span className="font-bold text-gray-300 text-sm">{client.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
