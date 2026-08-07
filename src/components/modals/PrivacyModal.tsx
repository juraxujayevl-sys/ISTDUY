import React from 'react';
import { motion } from 'motion/react';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white border border-slate-200 w-full max-w-xl rounded-3xl shadow-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto text-slate-900"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Privacy Policy & Academic Terms</h3>
          </div>
          <button onClick={onClose} aria-label="Close privacy policy" className="p-1 text-slate-400 hover:text-slate-700 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs text-slate-600 leading-relaxed font-normal">
          <h4 className="font-bold text-slate-900">1. Data Protection & Privacy</h4>
          <p>iStudy Academy adheres to international data privacy standards. Student contact information and test records are strictly used for educational progress tracking and official score validation.</p>

          <h4 className="font-bold text-slate-900">2. Score Guarantee Terms</h4>
          <p>Our Band 7.0+ guarantee for the IELTS Rocket program applies to students maintaining a 95%+ class attendance rate and submitting all assigned writing tasks on schedule.</p>

          <h4 className="font-bold text-slate-900">3. Certificate QR Validation</h4>
          <p>Every graduate certificate issued by iStudy Academy includes a unique cryptographic QR code allowing foreign university admissions offices to verify diploma authenticity instantly.</p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
        >
          I Understand
        </button>
      </motion.div>
    </div>
  );
};
