import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Loader } from 'lucide-react';
import type { Project } from '../types';
import projectService from '../services/projectService';

interface ProjectFormProps {
  project?: Project | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ProjectForm({ project, onClose, onSuccess }: ProjectFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string>(project?.image || '');
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    github: project?.github || '',
    demo: project?.demo || '',
    featured: project?.featured || false,
    technologies: (project?.technologies || []).join(', '),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Please upload a JPG, PNG, or WebP image');
      return;
    }

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
      const mockEvent = new Event('change', { bubbles: true });
      Object.defineProperty(mockEvent, 'target', {
        value: { files: [droppedFile] },
        enumerable: true,
      });
      handleFileChange(mockEvent as any as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!formData.title || !formData.description) {
        setError('Please fill in title and description');
        setLoading(false);
        return;
      }

      let imageUrl = preview;

      if (file) {
        let uploadedUrl: string | null = null;
        try {
          uploadedUrl = await projectService.uploadFile(file);
        } catch (uploadErr) {
          setError(
            uploadErr instanceof Error
              ? `Gagal upload gambar: ${uploadErr.message}`
              : 'Failed to upload image'
          );
          setLoading(false);
          return;
        }
        if (!uploadedUrl) {
          setError('Failed to upload image');
          setLoading(false);
          return;
        }
        imageUrl = uploadedUrl;
      }

      if (!imageUrl) {
        setError('Please upload a project image');
        setLoading(false);
        return;
      }

      const projectData = {
        title: formData.title,
        description: formData.description,
        github: formData.github || undefined,
        demo: formData.demo || undefined,
        featured: formData.featured,
        image: imageUrl,
        technologies: formData.technologies
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };

      if (project?.id) {
        await projectService.updateProject(project.id, projectData);
      } else {
        await projectService.createProject(projectData);
      }

      onSuccess();
    } catch (err) {
      setError('Failed to save project');
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
            {project ? 'Edit Project' : 'Add Project'}
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
              Project Image *
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
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 bg-elevated border border-soft text-strong rounded-lg focus:outline-none focus:border-accent transition-colors"
              placeholder="e.g., E-Commerce Platform"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-strong mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              required
              className="w-full px-4 py-2 bg-elevated border border-soft text-strong rounded-lg focus:outline-none focus:border-accent transition-colors"
              placeholder="Brief description of the project..."
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-semibold text-strong mb-2">
              Technologies <span className="text-muted font-normal">(dipisah koma)</span>
            </label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-elevated border border-soft text-strong rounded-lg focus:outline-none focus:border-accent transition-colors"
              placeholder="e.g., React, Node.js, MongoDB"
            />
          </div>

          {/* GitHub & Demo */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-strong mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-elevated border border-soft text-strong rounded-lg focus:outline-none focus:border-accent transition-colors"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-strong mb-2">
                Demo URL
              </label>
              <input
                type="url"
                name="demo"
                value={formData.demo}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-elevated border border-soft text-strong rounded-lg focus:outline-none focus:border-accent transition-colors"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              id="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="w-4 h-4 accent-[var(--accent)]"
            />
            <label htmlFor="featured" className="text-sm font-medium text-strong">
              Tandai sebagai Featured Project
            </label>
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
                project ? 'Update Project' : 'Add Project'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
