'use client';

import { X, UserCircle2 } from 'lucide-react';
import { useState } from 'react';
import type { UserProfile } from '@/types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  profile,
  onSave,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    displayName: profile.displayName,
    email: profile.email || '',
    avatar: profile.avatar || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProfile: UserProfile = {
      ...profile,
      displayName: formData.displayName.trim() || 'User',
      email: formData.email.trim() || undefined,
      avatar: formData.avatar.trim() || undefined,
    };

    onSave(updatedProfile);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-background w-full sm:max-w-md sm:rounded-lg rounded-t-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted active:scale-95 transition-transform"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Avatar Preview */}
          <div className="flex justify-center">
            {formData.avatar ? (
              <img
                src={formData.avatar}
                alt="Profile avatar"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <UserCircle2 className="w-16 h-16 text-primary" />
              </div>
            )}
          </div>

          {/* Display Name */}
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Display Name *
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-primary"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Email (optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-primary"
            />
          </div>

          {/* Avatar URL */}
          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Avatar URL (optional)
            </label>
            <input
              type="url"
              id="avatar"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="https://example.com/avatar.jpg"
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-primary"
            />
            <p className="text-xs text-foreground/60 mt-1">
              Enter a URL to an image to use as your profile picture
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-md border border-border text-foreground font-medium active:scale-95 transition-transform"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-md bg-primary text-primary-foreground font-medium active:scale-95 transition-transform"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
