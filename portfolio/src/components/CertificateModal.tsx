import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Certificate } from '../types';
import { formatDate } from '../lib/utils';

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export default function CertificateModal({
  certificate,
  isOpen,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: CertificateModalProps) {
  if (!certificate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.3 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          >
            <motion.div
              className="bg-surface border border-accent-soft rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-elevated hover:bg-accent-soft border border-soft rounded-lg transition-all duration-300"
              >
                <X size={24} className="text-body hover:text-accent" />
              </button>

              {/* Navigation Buttons */}
              {hasPrev && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrev?.();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-elevated hover:bg-accent-soft border border-soft rounded-lg transition-all duration-300"
                >
                  <ChevronLeft size={24} className="text-body hover:text-accent" />
                </button>
              )}

              {hasNext && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNext?.();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-elevated hover:bg-accent-soft border border-soft rounded-lg transition-all duration-300"
                >
                  <ChevronRight size={24} className="text-body hover:text-accent" />
                </button>
              )}

              {/* Content */}
              <div className="p-8">
                {/* Image */}
                <div className="mb-8 rounded-xl overflow-hidden">
                  <img
                    src={certificate.image_url}
                    alt={certificate.title}
                    className="w-full h-auto object-contain max-h-96"
                  />
                </div>

                {/* Info */}
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-strong mb-2">
                      {certificate.title}
                    </h2>
                    <p className="text-accent text-lg font-semibold">
                      {certificate.issuer}
                    </p>
                  </div>

                  {/* Description */}
                  {certificate.description && (
                    <div>
                      <h3 className="text-lg font-semibold text-body mb-2">Description</h3>
                      <p className="text-muted leading-relaxed">
                        {certificate.description}
                      </p>
                    </div>
                  )}

                  {/* Details */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-elevated border border-soft rounded-lg">
                      <p className="text-muted text-sm uppercase tracking-widest mb-1">
                        Category
                      </p>
                      <p className="text-strong font-semibold text-lg">
                        {certificate.category}
                      </p>
                    </div>
                    <div className="p-4 bg-elevated border border-soft rounded-lg">
                      <p className="text-muted text-sm uppercase tracking-widest mb-1">
                        Issued Date
                      </p>
                      <p className="text-strong font-semibold text-lg">
                        {formatDate(certificate.issue_date)}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-soft">
                    {certificate.certificate_url && (
                      <a
                        href={certificate.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-accent hover:opacity-90 text-[#16181d] rounded-lg transition-all duration-300 font-semibold transform hover:scale-105"
                      >
                        <ExternalLink size={20} className="mr-2" />
                        Open Certificate
                      </a>
                    )}
                    <a
                      href={certificate.image_url}
                      download
                      className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-elevated hover:bg-accent-soft border border-soft text-body hover:text-accent rounded-lg transition-all duration-300 font-semibold"
                    >
                      <Download size={20} className="mr-2" />
                      Download Image
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

