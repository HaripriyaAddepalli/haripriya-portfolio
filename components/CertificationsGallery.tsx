
'use client'

import { motion } from 'framer-motion'
import { certifications } from '@/lib/portfolio-data'
import { Award } from 'lucide-react'

export default function CertificationsGallery() {
  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-purple-300 mb-8">
        Certifications & Achievements
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {certifications.map((cert, idx) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -4 }}
            className="backdrop-blur-xl bg-white/5 border border-purple-500/20 rounded-lg p-4 flex flex-col items-center text-center hover:border-purple-500/50 transition-all group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6 text-white" />
            </div>

            <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-purple-300 transition-colors">
              {cert.name}
            </h4>

            <p className="text-xs text-gray-400 mb-2">
              {cert.issuer}
            </p>

            <p className="text-xs text-purple-300">
              {cert.date}
            </p>

            {cert.credentialId && (
              <p className="text-[10px] text-gray-500 mt-1 break-all">
                ID: {cert.credentialId}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 backdrop-blur-xl bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-lg p-6 text-center"
      >
        <p className="text-gray-300">
          <span className="text-2xl font-bold text-purple-400">22</span>{' '}
          certifications and professional learning achievements
        </p>
      </motion.div>
    </div>
  )
}
