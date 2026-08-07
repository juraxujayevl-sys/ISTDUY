import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquare, Quote, Play, CheckCircle } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

interface TestimonialsProps {
  onOpenVideo: (url: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsProps> = ({ onOpenVideo }) => {
  const { testimonials } = useAppData();
  const { t } = useThemeLanguage();
  const [filterRole, setFilterRole] = useState<'All' | 'Student' | 'Parent' | 'Alumni'>('All');

  const filtered = testimonials.filter(
    (t) => filterRole === 'All' || t.role === filterRole
  );

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">
            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
            <span>{t('testimonials.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t('testimonials.title')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800">
              {t('testimonials.titleHighlight')}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-2 mb-12">
          {(['All', 'Student', 'Parent', 'Alumni'] as const).map((role) => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
                filterRole === role
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-sm'
              }`}
            >
              {role === 'All' ? t('testimonials.filter.all') : role === 'Student' ? t('testimonials.filter.student') : role === 'Parent' ? t('testimonials.filter.parent') : t('testimonials.filter.alumni')}
            </button>
          ))}
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-200/80 hover:border-blue-200 shadow-sm hover:shadow-xl flex flex-col justify-between relative group transition-all duration-300"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-xs text-slate-500 font-semibold ml-2">5.0 / 5.0</span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic mb-6 font-normal">
                  "{item.text}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.authorName}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      {item.authorName}
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    </h4>
                    <p className="text-xs text-blue-600 font-bold">{item.course}</p>
                  </div>
                </div>

                {item.achievement && (
                  <span className="text-[10px] font-bold text-slate-900 bg-amber-400 px-2.5 py-1 rounded-full shadow-sm hidden sm:block">
                    {item.achievement}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
