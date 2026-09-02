import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Loader, AlertCircle, Check } from 'lucide-react';
import type { Certificate } from '../types';
import { useCertificates } from '../hooks/useCertificates';
import certificateService from '../services/certificateService';
import CertificateForm from './CertificateForm';

export default function CertificatesPanel() {
  const { certificates, loading, refetch } = useCertificates();
  const [showForm, setShowForm] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (successMessage) {
    setTimeout(() => setSuccessMessage(null), 3000);
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return;

    setDeleting(id);
    try {
      const success = await certificateService.deleteCertificate(id);
      if (success) {
        setSuccessMessage('Certificate deleted successfully');
        refetch();
      }
    } finally {
      setDeleting(null);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCert(null);
  };

  const handleFormSuccess = () => {
    setSuccessMessage('Certificate saved successfully');
    handleFormClose();
    refetch();
  };

  return (
    <div>
      {/* Success Message */}
      {successMessage && (
        <motion.div
          className="mb-8 p-4 bg-accent-soft border border-accent rounded-lg flex items-center text-accent"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Check size={20} className="mr-3" />
          {successMessage}
        </motion.div>
      )}

      {/* Add Button */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-6 py-3 bg-accent hover:opacity-90 text-[#16181d] rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
        >
          <Plus size={20} className="mr-2" />
          Add Certificate
        </button>
      </motion.div>

      {/* Form Modal */}
      {showForm && (
        <CertificateForm
          certificate={editingCert}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Table */}
      <div className="bg-surface border border-soft rounded-xl overflow-hidden">
        <div className="p-6 border-b border-soft">
          <h2 className="text-xl font-bold text-strong">
            Certificates ({certificates.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <Loader className="w-8 h-8 text-accent animate-spin mx-auto mb-3" />
            <p className="text-muted">Loading certificates...</p>
          </div>
        ) : certificates.length === 0 ? (
          <div className="p-12 text-center">
            <AlertCircle className="w-8 h-8 text-muted mx-auto mb-3" />
            <p className="text-muted">No certificates yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-soft">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted">Issuer</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted">Date</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert) => (
                  <tr key={cert.id} className="border-b border-soft hover:bg-elevated transition-colors">
                    <td className="px-6 py-4 text-sm text-strong">{cert.title}</td>
                    <td className="px-6 py-4 text-sm text-muted">{cert.issuer}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-accent-soft text-accent rounded-full text-xs">
                        {cert.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted">
                      {new Date(cert.issue_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingCert(cert);
                          setShowForm(true);
                        }}
                        className="inline-flex items-center px-3 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded transition-colors text-sm"
                      >
                        <Edit2 size={14} className="mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cert.id)}
                        disabled={deleting === cert.id}
                        className="inline-flex items-center px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors text-sm disabled:opacity-50"
                      >
                        {deleting === cert.id ? (
                          <Loader size={14} className="mr-1 animate-spin" />
                        ) : (
                          <Trash2 size={14} className="mr-1" />
                        )}
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
