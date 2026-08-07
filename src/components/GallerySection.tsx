import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Play, Eye, Sparkles } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { GalleryItem } from '../types';

interface GalleryProps {
  onOpenLightbox: (item: GalleryItem) => void;
}

export const GallerySection: React.FC<GalleryProps> = ({ onOpenLightbox }) => {
  const { gallery } = useAppData();
  const { t } = useThemeLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'classrooms' | 'graduation' | 'events' | 'activities'>('all');

  const filteredItems = gallery.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  const filters = [
    { id: 'all', label: t('gallery.filter.all') },
    { id: 'classrooms', label: t('gallery.filter.classrooms') },
    { id: 'graduation', label: t('gallery.filter.graduation') },
    { id: 'events', label: t('gallery.filter.events') },
    { id: 'activities', label: t('gallery.filter.activities') },
  ];

  return (
    <section id="gallery" className="py-24 bg-slate-50 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">
            <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>{t('gallery.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t('gallery.title')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800">
              {t('gallery.titleHighlight')}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
                activeFilter === f.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-sm'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => onOpenLightbox(item)}
                className="relative rounded-3xl overflow-hidden group cursor-pointer border border-slate-200 bg-white shadow-sm hover:shadow-xl h-64 transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                {/* Video Tag */}
                {item.type === 'video' && (
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                )}

                {/* Hover Eye Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white text-blue-600 shadow-xl flex items-center justify-center">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-xs font-bold truncate group-hover:text-blue-200 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-300 font-medium">{item.date}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
