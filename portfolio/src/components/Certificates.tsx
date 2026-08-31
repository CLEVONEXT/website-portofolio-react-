import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Loader } from 'lucide-react';
import type { Certificate } from '../types';
import { useCertificates } from '../hooks/useCertificates';
import CertificateCard from './CertificateCard';
import CertificateModal from './CertificateModal';

export default function Certificates() {
  const { certificates, loading, error } = useCertificates();
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleViewCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setSelectedIndex(certificates.indexOf(certificate));
  };

  const handleClose = () => {
    setSelectedCertificate(null);
    setSelectedIndex(-1);
  };

  const handleNext = () => {
    if (selectedIndex < certificates.length - 1) {
      const nextCert = certificates[selectedIndex + 1];
      setSelectedCertificate(nextCert);
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      const prevCert = certificates[selectedIndex - 1];
      setSelectedCertificate(prevCert);
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section
      id="certificates"
      className="py-20 sm:py-32 bg-base border-t border-soft relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--accent)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Award size={32} className="text-accent mr-3" />
            <h2 className="text-4xl sm:text-5xl font-bold text-strong">
              My <span className="text-accent">Certificates</span>
            </h2>
          </div>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          <p className="text-muted mt-6 max-w-2xl mx-auto text-lg">
            Professional certifications and credentials that validate my expertise.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader className="w-12 h-12 text-accent animate-spin mx-auto mb-4" />
              <p className="text-muted">Loading certificates...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-center">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && certificates.length === 0 && !error && (
          <div className="text-center py-20">
            <Award size={48} className="text-accent/30 mx-auto mb-4" />
            <p className="text-muted text-lg">
              No certificates yet. Check back soon!
            </p>
          </div>
        )}

        {/* Certificates Grid */}
        {!loading && certificates.length > 0 && (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {certificates.map((certificate) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                onView={handleViewCertificate}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        isOpen={selectedCertificate !== null}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={selectedIndex < certificates.length - 1}
        hasPrev={selectedIndex > 0}
      />
    </section>
  );
}
