'use client';

import { X, AlertTriangle, Download } from 'lucide-react';
import { useState } from 'react';
import { resetAllData, downloadBackup } from '@/lib/storage';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ResetConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: ResetConfirmModalProps) {
  const [confirmText, setConfirmText] = useState('');
  const [backupCreated, setBackupCreated] = useState(false);

  const handleConfirm = () => {
    if (confirmText !== 'DELETE') return;

    resetAllData();
    onConfirm();
    onClose();

    // Reset state
    setConfirmText('');
    setBackupCreated(false);
  };

  const handleBackup = () => {
    downloadBackup();
    setBackupCreated(true);
  };

  const handleClose = () => {
    setConfirmText('');
    setBackupCreated(false);
    onClose();
  };

  if (!isOpen) return null;

  const isConfirmEnabled = confirmText === 'DELETE';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-background w-full sm:max-w-md sm:rounded-lg rounded-t-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-destructive/30 px-4 py-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-destructive">Reset All Data</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-muted active:scale-95 transition-transform"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Warning */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
            <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-destructive mb-1">Warning: This action cannot be undone!</div>
              <p className="text-sm text-foreground/70 leading-relaxed">
                You are about to permanently delete:
              </p>
              <ul className="text-sm text-foreground/70 mt-2 space-y-1 list-disc list-inside">
                <li>All devotions and content</li>
                <li>Progress and streak data</li>
                <li>Settings and preferences</li>
                <li>Profile information</li>
              </ul>
            </div>
          </div>

          {/* Backup Option */}
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
            <div className="flex items-start gap-3 mb-3">
              <Download className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium text-foreground mb-1">Export Backup First?</div>
                <p className="text-sm text-foreground/70">
                  We recommend creating a backup before resetting. You can restore it later if needed.
                </p>
              </div>
            </div>
            <button
              onClick={handleBackup}
              disabled={backupCreated}
              className={`w-full px-4 py-2 rounded-md font-medium transition-all ${
                backupCreated
                  ? 'bg-success/20 text-success cursor-not-allowed'
                  : 'bg-primary text-primary-foreground active:scale-95'
              }`}
            >
              {backupCreated ? '✓ Backup Created' : 'Create Backup'}
            </button>
          </div>

          {/* Type to Confirm */}
          <div>
            <label htmlFor="confirm-text" className="block text-sm font-medium text-foreground mb-2">
              Type <span className="font-bold text-destructive">DELETE</span> to confirm
            </label>
            <input
              type="text"
              id="confirm-text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE"
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-destructive"
            />
            <p className="text-xs text-foreground/60 mt-1">
              This confirmation is case-sensitive
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-3 rounded-md border border-border text-foreground font-medium active:scale-95 transition-transform"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!isConfirmEnabled}
              className={`flex-1 px-4 py-3 rounded-md font-medium transition-all ${
                isConfirmEnabled
                  ? 'bg-destructive text-destructive-foreground active:scale-95'
                  : 'bg-muted text-foreground/40 cursor-not-allowed'
              }`}
            >
              Reset All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
