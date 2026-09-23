'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '@/lib/portfolio-data';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-purple-300 mb-8">What People Say</h3>

      <motion.div
        key={current}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="backdrop-blur-xl bg-white/5 border border-purple-500/20 rounded-lg p-8 min-h-64"
      >
        <div className="flex gap-1 mb-4">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
        </div>

        <p className="text-gray-300 text-lg mb-6 italic">"{testimonials[current].text}"</p>

        <div>
          <p className="font-semibold text-white">{testimonials[current].name}</p>
          <p className="text-gray-400 text-sm">{testimonials[current].role}</p>
        </div>
      </motion.div>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={prev}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-purple-400" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === current ? 'bg-purple-400 w-6' : 'bg-purple-400/40'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-purple-400" />
        </button>
      </div>
    </div>
  );
}
