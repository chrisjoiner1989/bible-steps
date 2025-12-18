'use client';

import { UserCircle2, Edit2 } from 'lucide-react';
import type { UserProfile } from '@/types';

interface ProfileHeaderProps {
  profile: UserProfile;
  onEdit: () => void;
}

export default function ProfileHeader({ profile, onEdit }: ProfileHeaderProps) {
  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="p-6 bg-card border-b border-border">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.displayName}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <UserCircle2 className="w-12 h-12 text-primary" />
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            {profile.displayName}
          </h1>
          {profile.email && (
            <p className="text-sm text-foreground/60 mb-2">{profile.email}</p>
          )}
          <p className="text-xs text-foreground/40">
            Member since {formatJoinDate(profile.joinDate)}
          </p>
        </div>

        {/* Edit Button */}
        <button
          onClick={onEdit}
          className="p-2 rounded-full hover:bg-muted active:scale-95 transition-all"
          aria-label="Edit profile"
        >
          <Edit2 className="w-5 h-5 text-foreground/60" />
        </button>
      </div>
    </div>
  );
}
