import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, GraduationCap, CheckCircle2, Sparkles, Send, Linkedin, Instagram, ExternalLink } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { Teacher } from '../types';

interface TeachersProps {
  onOpenConsultation: (teacherName: string) => void;
}

export const TeachersSection: React.FC<TeachersProps> = ({ onOpenConsultation }) => {
  const { teachers } = useAppData();
  const { t } = useThemeLanguage();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  return (
    <section id="teachers" className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>{t('teachers.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t('teachers.title')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800">
              {t('teachers.titleHighlight')}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t('teachers.subtitle')}
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-blue-200 shadow-sm hover:shadow-xl flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={teacher.photo}
                    alt={teacher.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  {/* Top Badge */}
                  {teacher.scoreBadge && (
                    <div className="absolute top-4 right-4 bg-amber-400 text-slate-950 font-extrabold text-xs px-3 py-1 rounded-full shadow-md">
                      {teacher.scoreBadge}
                    </div>
                  )}

                  <div className="absolute bottom-3 left-4">
                    <span className="text-[11px] font-bold text-white bg-blue-600 px-2.5 py-1 rounded-lg shadow-sm">
                      {t('teachers.exp')}: {teacher.experience}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {teacher.name}
                  </h3>
                  <p className="text-xs font-bold text-blue-600">{teacher.position}</p>
                  
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {teacher.bio}
                  </p>

                  <div className="pt-2 space-y-1.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{t('teachers.credentials')}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {teacher.certificates.map((cert) => (
                        <span key={cert} className="text-[10px] bg-slate-50 px-2.5 py-1 rounded-md text-slate-700 font-medium border border-slate-200/80 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {teacher.socials.telegram && (
                    <a
                      href={teacher.socials.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-blue-600 text-slate-600 hover:text-white flex items-center justify-center transition-colors"
                      aria-label={t('contact.social.telegram')}
                    >
                      <Send className="w-4 h-4" />
                    </a>
                  )}
                  {teacher.socials.instagram && (
                    <a
                      href={teacher.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-pink-600 text-slate-600 hover:text-white flex items-center justify-center transition-colors"
                      aria-label={t('contact.social.instagram')}
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {teacher.socials.linkedin && (
                    <a
                      href={teacher.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-blue-700 text-slate-600 hover:text-white flex items-center justify-center transition-colors"
                      aria-label={t('contact.social.linkedin')}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => onOpenConsultation(teacher.name)}
                  className="py-2 px-3.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-xs font-bold border border-blue-100 transition-all duration-200 shadow-sm"
                >
                  {t('teachers.book')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
