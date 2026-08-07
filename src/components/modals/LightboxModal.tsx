import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { GalleryItem } from '../../types';

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-lg">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 flex items-center justify-center backdrop-blur-md border border-slate-200 shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {item.type === 'video' && item.videoUrl ? (
          <div className="relative pt-[56.25%] bg-black">
            <iframe
              src={item.videoUrl}
              title={item.title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="relative max-h-[75vh] bg-slate-950 flex items-center justify-center">
            <img
              src={item.image}
              alt={item.title}
              className="max-h-[75vh] w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        <div className="p-6 bg-white flex items-center justify-between text-slate-900 border-t border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
            <p className="text-xs text-slate-500 font-medium capitalize">{item.category} • {item.date}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
