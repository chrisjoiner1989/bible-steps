'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MobileHeader from '@/components/layout/MobileHeader';
import TabNavigation, { ProfileTab } from '@/components/profile/TabNavigation';
import OverviewTab from '@/components/profile/OverviewTab';
import SettingsTab from '@/components/profile/SettingsTab';
import DataTab from '@/components/profile/DataTab';
import AboutTab from '@/components/profile/AboutTab';
import EditProfileModal from '@/components/profile/EditProfileModal';
import ResetConfirmModal from '@/components/profile/ResetConfirmModal';
import ProgressStatsModal from '@/components/home/ProgressStatsModal';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { getUserProfile, saveUserProfile } from '@/lib/storage';
import type { UserProfile } from '@/types';

function ProfilePageContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showFullStats, setShowFullStats] = useState(false);

  useEffect(() => {
    setProfile(getUserProfile());
  }, []);

  const handleSaveProfile = (updatedProfile: UserProfile) => {
    saveUserProfile(updatedProfile);
    setProfile(updatedProfile);
  };

  const handleResetConfirm = () => {
    // After reset, reload the page to clear all state
    window.location.reload();
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <MobileHeader title="Profile" />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-foreground/60">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title="Profile" />

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <main>
        {activeTab === 'overview' && (
          <OverviewTab
            profile={profile}
            onEditProfile={() => setShowEditProfile(true)}
            onShowFullStats={() => setShowFullStats(true)}
          />
        )}
        {activeTab === 'settings' && <SettingsTab />}
        {activeTab === 'data' && (
          <DataTab onShowResetConfirm={() => setShowResetConfirm(true)} />
        )}
        {activeTab === 'about' && <AboutTab />}
      </main>

      {/* Modals */}
      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />

      <ResetConfirmModal
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleResetConfirm}
      />

      <ProgressStatsModal
        isOpen={showFullStats}
        onClose={() => setShowFullStats(false)}
      />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfilePageContent />
    </ProtectedRoute>
  );
}
