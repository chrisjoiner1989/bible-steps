'use client';

import { Download, Upload, AlertTriangle, Database, FileJson, Calendar } from 'lucide-react';
import { useState, useRef } from 'react';
import { downloadBackup, uploadBackup } from '@/lib/storage';

interface DataTabProps {
  onShowResetConfirm: () => void;
}

export default function DataTab({ onShowResetConfirm }: DataTabProps) {
  const [lastExport, setLastExport] = useState<string | null>(null);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [importMessage, setImportMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    try {
      downloadBackup();
      setLastExport(new Date().toISOString());
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportStatus('idle');
    setImportMessage('');

    try {
      const success = await uploadBackup(file);
      if (success) {
        setImportStatus('success');
        setImportMessage('Backup restored successfully! Refresh the page to see your data.');
      } else {
        setImportStatus('error');
        setImportMessage('Failed to restore backup. Please check the file format.');
      }
    } catch (error) {
      setImportStatus('error');
      setImportMessage('An error occurred while importing the backup.');
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getStorageSize = () => {
    let total = 0;
    for (const key in localStorage) {
      if (key.startsWith('bible-steps-')) {
        total += localStorage[key].length;
      }
    }
    return `${(total / 1024).toFixed(2)} KB`;
  };

  return (
    <div className="pb-20 px-4 pt-6 space-y-6">
      {/* Storage Info */}
      <div className="p-4 rounded-lg bg-muted border border-border">
        <div className="flex items-center gap-2 mb-2">
          <Database className="w-5 h-5 text-primary" />
          <span className="font-medium text-foreground">Storage Used</span>
        </div>
        <div className="text-2xl font-bold text-foreground">{getStorageSize()}</div>
        <div className="text-xs text-foreground/60 mt-1">
          All data stored locally in your browser
        </div>
      </div>

      {/* Export Section */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">Export Data</h2>
        <div className="p-4 rounded-lg bg-card border border-border space-y-3">
          <div className="flex items-start gap-3">
            <FileJson className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-medium text-foreground mb-1">Backup All Data</div>
              <div className="text-sm text-foreground/60 mb-3">
                Download a JSON file containing all your devotions, progress, and settings
              </div>
              {lastExport && (
                <div className="flex items-center gap-1.5 text-xs text-foreground/40 mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  Last exported: {formatDate(lastExport)}
                </div>
              )}
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium active:scale-95 transition-transform"
              >
                <Download className="w-4 h-4" />
                Export Data
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Import Section */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">Import Data</h2>
        <div className="p-4 rounded-lg bg-card border border-border space-y-3">
          <div className="flex items-start gap-3">
            <Upload className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-medium text-foreground mb-1">Restore from Backup</div>
              <div className="text-sm text-foreground/60 mb-3">
                Upload a previously exported JSON file to restore your data
              </div>

              {/* Status Messages */}
              {importStatus === 'success' && (
                <div className="p-3 mb-3 rounded-md bg-success/10 border border-success/30">
                  <p className="text-sm text-success">{importMessage}</p>
                </div>
              )}
              {importStatus === 'error' && (
                <div className="p-3 mb-3 rounded-md bg-destructive/10 border border-destructive/30">
                  <p className="text-sm text-destructive">{importMessage}</p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={handleImportClick}
                className="flex items-center gap-2 px-4 py-2 rounded-md border border-border text-foreground font-medium active:scale-95 transition-transform"
              >
                <Upload className="w-4 h-4" />
                Choose File
              </button>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-2 p-3 rounded-md bg-primary/10">
            <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-foreground/70">
              Importing will replace all your current data. Make sure to export first if you want to keep it.
            </p>
          </div>
        </div>
      </section>

      {/* Reset Section - Danger Zone */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">Danger Zone</h2>
        <div className="p-4 rounded-lg bg-destructive/5 border-2 border-destructive/30">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-medium text-destructive mb-1">Reset All Data</div>
              <div className="text-sm text-foreground/60 mb-3">
                Permanently delete all devotions, progress, settings, and profile data. This action cannot be undone.
              </div>
              <button
                onClick={onShowResetConfirm}
                className="px-4 py-2 rounded-md bg-destructive text-destructive-foreground font-medium active:scale-95 transition-transform"
              >
                Reset All Data
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
