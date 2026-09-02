import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Loader, AlertCircle, Check, Star } from 'lucide-react';
import type { Project } from '../types';
import { useProjects } from '../hooks/useProjects';
import projectService from '../services/projectService';
import ProjectForm from './ProjectForm';

export default function ProjectsPanel() {
  const { projects, loading, refetch } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (successMessage) {
    setTimeout(() => setSuccessMessage(null), 3000);
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    setDeleting(id);
    try {
      const success = await projectService.deleteProject(id);
      if (success) {
        setSuccessMessage('Project deleted successfully');
        refetch();
      }
    } finally {
      setDeleting(null);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleFormSuccess = () => {
    setSuccessMessage('Project saved successfully');
    handleFormClose();
    refetch();
  };

  return (
    <div>
      {/* Success Message */}
      {successMessage && (
        <motion.div
          className="mb-8 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center text-green-400"
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
          Add Project
        </button>
      </motion.div>

      {/* Form Modal */}
      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Table */}
      <div className="bg-surface border border-soft rounded-xl overflow-hidden">
        <div className="p-6 border-b border-soft">
          <h2 className="text-xl font-bold text-strong">
            Projects ({projects.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <Loader className="w-8 h-8 text-accent animate-spin mx-auto mb-3" />
            <p className="text-muted">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center">
            <AlertCircle className="w-8 h-8 text-muted mx-auto mb-3" />
            <p className="text-muted">No projects yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-soft">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted">Project</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted">Technologies</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted">Links</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-soft hover:bg-elevated transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-14 h-10 object-cover rounded border border-soft shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-strong font-medium">{project.title}</span>
                            {project.featured && (
                              <Star size={12} className="text-accent fill-current" />
                            )}
                          </div>
                          <p className="text-xs text-muted line-clamp-1 max-w-xs">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 bg-accent-soft text-accent rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-0.5 bg-elevated text-accent rounded-full text-xs">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline text-xs"
                          >
                            GitHub
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-400 hover:underline text-xs"
                          >
                            Demo
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingProject(project);
                          setShowForm(true);
                        }}
                        className="inline-flex items-center px-3 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded transition-colors text-sm"
                      >
                        <Edit2 size={14} className="mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        disabled={deleting === project.id}
                        className="inline-flex items-center px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors text-sm disabled:opacity-50"
                      >
                        {deleting === project.id ? (
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
