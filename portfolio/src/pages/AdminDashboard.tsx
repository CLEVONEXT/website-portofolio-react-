import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Plus, Edit2, Trash2, Loader, Check, AlertCircle } from 'lucide-react';
import type { Certificate } from '../types';
import { useCertificates } from '../hooks/useCertificates';
import certificateService from '../services/certificateService';
import authService from '../services/authService';
import profileService from '../services/profileService';
import CertificateForm from '../components/CertificateForm';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { certificates, loading: certificatesLoading, refetch } = useCertificates();
  const [showForm, setShowForm] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);
  const [profileUploading, setProfileUploading] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const loadProfile = async () => {
    const p = await profileService.getProfile();
    setProfileUrl(p?.profile_image_url || null);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleProfileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setProfileMessage('Please upload a JPG, PNG, or WebP image');
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setProfileMessage('File size must be less than 5MB');
      return;
    }

    setProfileUploading(true);
    setProfileMessage(null);
    try {
      const url = await profileService.uploadProfileImage(selectedFile);
      if (!url) {
        setProfileMessage('Failed to upload image');
        return;
      }
      const saved = await profileService.saveProfile(url);
      if (saved) {
        setProfileUrl(url);
        setProfileMessage('Profile photo updated successfully');
      } else {
        setProfileMessage('Failed to save profile');
      }
    } finally {
      setProfileUploading(false);
      if (profileInputRef.current) profileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const checkAuth = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        navigate('/admin');
      } else {
        setUser(currentUser);
      }
    } finally {
      setUserLoading(false);
    }
  };

  const handleLogout = async () => {
    await authService.signOut();
    navigate('/admin');
  };

  const handleDeleteCert = async (id: string) => {
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

  if (userLoading) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center">
        <Loader className="w-12 h-12 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base">
    {/* Header */}
    <div className="bg-surface border-b border-soft sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-strong">
            Admin <span className="text-accent">Dashboard</span>
          </h1>
          {user && (
            <p className="text-sm text-muted mt-1">{user.email}</p>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg transition-colors"
        >
            <LogOut size={18} className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

        {/* Add Certificate Button */}
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

        {/* Profile Photo Section */}
        <div className="bg-surface border border-soft rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-strong mb-4">Profile Photo</h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent-soft bg-elevated flex items-center justify-center shrink-0">
              {profileUrl ? (
                <img src={profileUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-muted text-xs">No photo</span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-muted text-sm mb-3">
                Upload a new profile photo (JPG, PNG, WEBP — max 5MB). It will update the About section automatically.
              </p>
              <button
                onClick={() => profileInputRef.current?.click()}
                disabled={profileUploading}
                className="inline-flex items-center px-4 py-2 bg-accent-soft hover:opacity-80 border border-accent-soft text-accent rounded-lg text-sm font-medium transition-all disabled:opacity-50"
              >
                {profileUploading ? (
                  <>
                    <Loader size={16} className="mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Plus size={16} className="mr-2" />
                    {profileUrl ? 'Change Photo' : 'Upload Photo'}
                  </>
                )}
              </button>
              <input
                ref={profileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfileChange}
                className="hidden"
              />
              {profileMessage && (
                <p className={`mt-3 text-sm ${profileMessage.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                  {profileMessage}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Certificate Form Modal */}
        <AnimatePresence>
          {showForm && (
            <CertificateForm
              certificate={editingCert}
              onClose={handleFormClose}
              onSuccess={handleFormSuccess}
            />
          )}
        </AnimatePresence>

        {/* Certificates Table */}
        <div className="bg-surface border border-soft rounded-xl overflow-hidden">
          <div className="p-6 border-b border-soft">
            <h2 className="text-xl font-bold text-strong">
              Certificates ({certificates.length})
            </h2>
          </div>

          {certificatesLoading ? (
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
                          onClick={() => handleDeleteCert(cert.id)}
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
    </div>
  );
}

