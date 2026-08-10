import React from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight, Award, CheckCircle, Users, Star, BookOpen, Trophy, Sparkles } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

interface HeroProps {
  onOpenEnroll: (courseId?: string) => void;
  onOpenVideo: (url: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnroll, onOpenVideo }) => {
  const { results, courses, teachers } = useAppData();
  const { t } = useThemeLanguage();

  const stats = [
    { value: `${results.length > 0 ? results.length * 100 + '+' : '5,000+'}`, label: t('hero.stats.students'), icon: Users, color: 'text-blue-400' },
    { value: '98%', label: t('hero.stats.successRate'), icon: Star, color: 'text-amber-400' },
    { value: `${teachers.length > 0 ? teachers.length : '30+'}`, label: t('hero.stats.teachers'), icon: Award, color: 'text-emerald-400' },
    { value: `${courses.length > 0 ? courses.length : '10+'}`, label: t('hero.stats.courses'), icon: BookOpen, color: 'text-indigo-400' },
    { value: '3+ Years', label: t('hero.stats.excellence'), icon: Trophy, color: 'text-sky-400' },
  ];

  const topResults = results.slice(0, 3);

  return (
    <section id="home" className="bg-slate-50 relative min-h-screen pt-24 sm:pt-28 lg:pt-36 pb-20 flex flex-col justify-between overflow-hidden text-slate-900">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-blue-100/70 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[35%] left-[-5%] w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Main Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Top Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>{t('hero.tag')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.05]">
              {t('hero.title')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800">
                {t('hero.titleHighlight')}
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenEnroll()}
                className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-xl shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>{t('hero.enroll')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Level Test CTA removed per request */}
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>{t('hero.trust1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>{t('hero.trust2')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>{t('hero.trust3')}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Dynamic Hero Interactive Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Card Frame */}
              <div className="bg-white rounded-[2.5rem] p-6 shadow-2xl border border-slate-100 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{t('hero.card.title')}</h3>
                      <p className="text-xs text-slate-500">{t('hero.card.subtitle')}</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                    {t('hero.card.badge')}
                  </span>
                </div>

                {topResults.length > 0 ? (
                  topResults.map((res) => (
                    <div key={res.id} className="flex items-center gap-3.5 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                      {res.photo ? (
                        <img
                          src={res.photo}
                          alt={res.studentName}
                          className="w-11 h-11 rounded-full object-cover border border-slate-200"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                          {res.studentName.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{res.studentName}</h4>
                          <span className="text-xs font-extrabold text-white bg-blue-600 px-2.5 py-0.5 rounded-full shadow-sm">
                            {res.score}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                          {res.detailBadge} {res.universityAdmitted ? `• ${res.universityAdmitted}` : ''}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200 text-center space-y-2">
                    <Award className="w-8 h-8 text-blue-600 mx-auto" />
                    <p className="text-xs font-bold text-slate-800">Top Exam Results & International Admissions</p>
                    <p className="text-[11px] text-slate-500">Student success records live in Supabase database.</p>
                  </div>
                )}

                {/* Campus Video Highlight Link */}
                <div className="pt-2">
                  <button
                    onClick={() => onOpenVideo('https://www.youtube.com/embed/dQw4w9WgXcQ')}
                    className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-3 transition-colors shadow-lg"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                      <Play className="w-3 h-3 fill-white ml-0.5" />
                    </div>
                    <span>{t('hero.card.video')}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-16 pt-10 border-t border-slate-200/60 grid grid-cols-2 md:grid-cols-5 gap-6">
          {stats.map((st, i) => {
            const IconComp = st.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center p-3">
                <IconComp className={`w-5 h-5 ${st.color} mb-1.5`} />
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{st.value}</span>
                <span className="text-xs font-medium text-slate-500 mt-0.5">{st.label}</span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
