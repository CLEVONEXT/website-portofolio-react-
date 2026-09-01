import { motion } from 'framer-motion';
import { Download, Eye } from 'lucide-react';
import type { Certificate } from '../types';
import { formatDate } from '../lib/utils';

interface CertificateCardProps {
  certificate: Certificate;
  onView: (certificate: Certificate) => void;
}

export default function CertificateCard({ certificate, onView }: CertificateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group h-full"
    >
      <div className="card h-full flex flex-col border rounded-xl overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-glow cursor-pointer"
        onClick={() => onView(certificate)}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden h-48 sm:h-56 bg-elevated">
          <img
            src={certificate.image_url}
            alt={certificate.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-base/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button className="px-6 py-2 bg-accent hover:opacity-90 text-[#16181d] rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              View Full
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          <h3 className="text-lg font-bold text-strong mb-2 group-hover:text-accent transition-colors line-clamp-2">
            {certificate.title}
          </h3>

          <p className="text-sm text-accent mb-2 font-semibold">
            {certificate.issuer}
          </p>

          <p className="text-muted text-sm mb-4 flex-grow line-clamp-2">
            {certificate.description}
          </p>

          {/* Category & Date */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs px-3 py-1 bg-accent-soft text-accent border border-accent-soft rounded-full">
                {certificate.category}
              </span>
              <span className="text-xs text-muted">
                {formatDate(certificate.issue_date)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => onView(certificate)}
              className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-elevated hover:bg-accent-soft border border-soft hover:border-accent text-body hover:text-accent rounded-lg transition-all duration-300 text-sm font-medium"
            >
              <Eye size={16} className="mr-2" />
              View
            </button>
            {certificate.certificate_url && (
              <a
                href={certificate.certificate_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-accent hover:opacity-90 text-[#16181d] rounded-lg transition-all duration-300 text-sm font-medium"
              >
                <Download size={16} className="mr-2" />
                Download
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

