import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Loader, Award, FolderKanban } from 'lucide-react';
import authService from '../services/authService';
import profileService from '../services/profileService';
import CertificatesPanel from '../components/CertificatesPanel';
import ProjectsPanel from '../components/ProjectsPanel';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'certificates' | 'projects'>('certificates');
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
        setProfileMessage('Failed to upload image. Please check the file and try again.');
        return;
      }
      const saved = await profileService.saveProfile(url);
      if (saved) {
        setProfileUrl(url);
        setProfileMessage('Profile photo updated successfully');
      } else {
        setProfileMessage('Image uploaded but failed to save. Please try again.');
      }
    } catch (error: any) {
      console.error("Profile upload error:", error);
      setProfileMessage(error?.message || 'Failed to upload image. Please try again.');
    } finally {
      setProfileUploading(false);
      if (profileInputRef.current) profileInputRef.current.value = '';
    }
  };

  useEffect(() => {
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
  checkAuth();
  }, []);
  const handleLogout = async () => {
    await authService.signOut();
    navigate('/admin');
  };

  const tabs: { key: 'certificates' | 'projects'; label: string; icon: React.ReactNode }[] = [
    { key: 'certificates', label: 'Certificates', icon: <Award size={18} /> },
    { key: 'projects', label: 'Projects', icon: <FolderKanban size={18} /> },
  ];

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
        {/* Tabs */}
        <div className="mb-8 flex gap-2 border-b border-soft">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex items-center px-5 py-3 text-sm font-semibold border-b-2 transition-colors -mb-px ${
                activeTab === tab.key
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted hover:text-strong'
              }`}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </button>
          ))}
        </div>

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
                    <span className="mr-2">📷</span>
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

        {/* Panels */}
        <AnimatePresence mode="wait">
          {activeTab === 'certificates' ? (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <CertificatesPanel />
            </motion.div>
          ) : (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectsPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

