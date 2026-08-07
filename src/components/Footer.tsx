import React, { useState } from 'react';
import { GraduationCap, Send, Phone, Mail, MapPin, Heart, ArrowUp } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

interface FooterProps {
  onSubscribeNewsletter: (email: string) => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSubscribeNewsletter, onOpenPrivacy }) => {
  const { courses, branches } = useAppData();
  const { t } = useThemeLanguage();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubscribeNewsletter(email);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Banner */}
        <div className="bg-gradient-to-r from-blue-900/80 via-slate-900 to-indigo-950 p-8 rounded-3xl border border-blue-900/40 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-white">{t('footer.subscribeTitle')}</h3>
            <p className="text-xs text-slate-300 font-normal">{t('footer.subscribeSubtitle')}</p>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              required
              placeholder={t('footer.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 w-full sm:w-64"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md whitespace-nowrap transition-colors"
            >
              {t('footer.subscribe')}
            </button>
          </form>
        </div>

        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 - Logo & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                iStudy <span className="text-blue-400">Academy</span>
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm font-normal">
              Central Asia’s premier international educational academy specializing in IELTS Band 8.5+ prep, CEFR certifications, SAT exams, and modern software engineering.
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-1">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>+998 (71) 200-77-88</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>info@istudy.academy</span>
              </p>
            </div>
          </div>

          {/* Col 2 - Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li><a href="#about" className="hover:text-blue-400 transition-colors">{t('footer.aboutUs')}</a></li>
              <li><a href="#courses" className="hover:text-blue-400 transition-colors">{t('footer.allCourses')}</a></li>
              <li><a href="#teachers" className="hover:text-blue-400 transition-colors">{t('footer.faculty')}</a></li>
              <li><a href="#results" className="hover:text-blue-400 transition-colors">{t('footer.studentResults')}</a></li>
              <li><a href="#gallery" className="hover:text-blue-400 transition-colors">{t('footer.photoGallery')}</a></li>
              <li><a href="#news" className="hover:text-blue-400 transition-colors">{t('footer.newsEvents')}</a></li>
            </ul>
          </div>

          {/* Col 3 - Courses */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">{t('footer.programs')}</h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              {courses.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <a href="#courses" className="hover:text-blue-400 transition-colors truncate block">
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 - Branches */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">{t('footer.campuses')}</h4>
            <ul className="space-y-2 text-xs">
              {branches.map((b) => (
                <li key={b.id} className="space-y-0.5">
                  <span className="font-semibold text-slate-200 block">{b.name}</span>
                  <span className="text-[11px] text-slate-400 block font-normal">{b.address}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{t('footer.copyright')}</p>

          <div className="flex items-center gap-6">
            <button onClick={onOpenPrivacy} className="hover:text-white transition-colors">
              {t('footer.privacy')}
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{t('footer.backTop')}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
