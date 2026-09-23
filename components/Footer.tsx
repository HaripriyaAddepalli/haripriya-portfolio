'use client';

import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="border-t border-purple-500/20 bg-black">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        >
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-2">Haripriya</h3>
            <p className="text-gray-400">AI & Full Stack Engineer</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navigation</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <a href="/" className="hover:text-purple-400 transition-colors">Home</a>
              <a href="/projects" className="hover:text-purple-400 transition-colors block">Projects</a>
              <a href="/blog" className="hover:text-purple-400 transition-colors block">Blog</a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/HaripriyaAddepalli"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/haripriya-addepalli-764b75350"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:haripriyaaddepalli64@gmail.com"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        <div className="border-t border-purple-500/10 pt-8 text-center text-gray-500 text-sm">
          <p>© 2025 Haripriya Addepalli. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
