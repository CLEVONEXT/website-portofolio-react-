import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Loader } from 'lucide-react';
import type { Certificate } from '../types';
import certificateService from '../services/certificateService';

interface CertificateFormProps {
  certificate?: Certificate | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CertificateForm({ certificate, onClose, onSuccess }: CertificateFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string>(certificate?.image_url || '');
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: certificate?.title || '',
    issuer: certificate?.issuer || '',
    description: certificate?.description || '',
    category: certificate?.category || '',
    issue_date: certificate?.issue_date?.split('T')[0] || '',
    certificate_url: certificate?.certificate_url || '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Please upload a JPG, PNG, or WebP image');
      return;
    }

    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
    setError(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFileChange({
        target: { files: [droppedFile] },
      } as any);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.issuer || !formData.category || !formData.issue_date) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      let imageUrl = preview;

      // Upload new file if provided
      if (file) {
        const uploadedUrl = await certificateService.uploadFile(file);
        if (!uploadedUrl) {
          setError('Failed to upload image');
          setLoading(false);
          return;
        }
        imageUrl = uploadedUrl;
      }

      // Check if image URL is available
      if (!imageUrl) {
        setError('Please upload a certificate image');
        setLoading(false);
        return;
      }

      const certData = {
        title: formData.title,
        issuer: formData.issuer,
        description: formData.description,
        category: formData.category,
        issue_date: formData.issue_date,
        certificate_url: formData.certificate_url,
        image_url: imageUrl,
      };

      if (certificate?.id) {
        // Update
        await certificateService.updateCertificate(certificate.id, certData);
      } else {
        // Create
        await certificateService.createCertificate(certData);
      }

      onSuccess();
    } catch (err) {
      setError('Failed to save certificate');
      console.error('Form error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-surface border border-accent-soft rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-surface/95 border-b border-soft px-8 py-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-strong">
            {certificate ? 'Edit Certificate' : 'Add Certificate'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 bg-elevated hover:bg-accent-soft rounded-lg transition-colors"
          >
            <X size={24} className="text-body" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-strong mb-4">
              Certificate Image *
            </label>

            {preview && (
              <div className="mb-4 rounded-lg overflow-hidden border border-soft">
                <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
              </div>
            )}

            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-accent-soft rounded-lg p-8 text-center cursor-pointer hover:border-accent transition-colors"
            >
              <Upload size={32} className="text-accent mx-auto mb-3" />
              <p className="text-strong font-medium mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-muted text-sm">
                PNG, JPG, or WEBP (max. 5MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-strong mb-2">
              Certificate Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 bg-elevated border border-soft text-strong rounded-lg focus:outline-none focus:border-accent transition-colors"
              placeholder="e.g., AWS Solutions Architect"
            />
          </div>

          {/* Issuer */}
          <div>
            <label className="block text-sm font-semibold text-strong mb-2">
              Issuer *
            </label>
            <input
              type="text"
              name="issuer"
              value={formData.issuer}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 bg-elevated border border-soft text-strong rounded-lg focus:outline-none focus:border-accent transition-colors"
              placeholder="e.g., Amazon Web Services"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-strong mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 bg-elevated border border-soft text-strong rounded-lg focus:outline-none focus:border-accent transition-colors"
              placeholder="Brief description of the certificate..."
            />
          </div>

          {/* Category & Date */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-strong mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-elevated border border-soft text-strong rounded-lg focus:outline-none focus:border-accent transition-colors"
              >
                <option value="">Select a category</option>
                <option value="Programming">Programming</option>
                <option value="Cloud">Cloud</option>
                <option value="Design">Design</option>
                <option value="DevOps">DevOps</option>
                <option value="Data">Data</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-strong mb-2">
                Issue Date *
              </label>
              <input
                type="date"
                name="issue_date"
                value={formData.issue_date}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-elevated border border-soft text-strong rounded-lg focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* Certificate URL */}
          <div>
            <label className="block text-sm font-semibold text-strong mb-2">
              Certificate URL
            </label>
            <input
              type="url"
              name="certificate_url"
              value={formData.certificate_url}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-elevated border border-soft text-strong rounded-lg focus:outline-none focus:border-accent transition-colors"
              placeholder="https://..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t border-soft">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2 bg-elevated hover:bg-elevated border border-accent-soft text-body rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-2 bg-accent hover:opacity-90 disabled:opacity-50 text-strong rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader size={18} className="mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                certificate ? 'Update Certificate' : 'Add Certificate'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

