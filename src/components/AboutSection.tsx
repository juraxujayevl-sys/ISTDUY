import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target, Compass, Sparkles, CheckCircle2, Play, Award, ShieldCheck, Building2 } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

interface AboutSectionProps {
  onOpenVideo: (url: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenVideo }) => {
  const { gallery, branches } = useAppData();
  const { t } = useThemeLanguage();
  const [activeTab, setActiveTab] = useState<'story' | 'mission' | 'vision' | 'methodology'>('story');

  const primaryBranch = branches[0];
  const primaryGallery = gallery.find((g) => g.image) || gallery[0];

  const tabContents = {
    story: {
      title: t('about.story.title'),
      description: t('about.story.description'),
      points: [t('about.story.point1'), t('about.story.point2'), t('about.story.point3')]
    },
    mission: {
      title: t('about.mission.title'),
      description: t('about.mission.description'),
      points: [t('about.mission.point1'), t('about.mission.point2'), t('about.mission.point3')]
    },
    vision: {
      title: t('about.vision.title'),
      description: t('about.vision.description'),
      points: [t('about.vision.point1'), t('about.vision.point2'), t('about.vision.point3')]
    },
    methodology: {
      title: t('about.methodology.title'),
      description: t('about.methodology.description'),
      points: [t('about.methodology.point1'), t('about.methodology.point2'), t('about.methodology.point3')]
    }
  };

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{t('about.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t('about.title')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800">
              {t('about.titleHighlight')}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Image & Video Trigger */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 group bg-slate-900 min-h-[380px]">
              {primaryGallery?.image ? (
                <img
                  src={primaryGallery.image}
                  alt={primaryGallery.title || "iStudy Academy Main Campus"}
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
              ) : (
                <div className="w-full h-[420px] bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 flex items-center justify-center p-8 text-center text-white">
                  <div className="space-y-4 max-w-md">
                    <Building2 className="w-16 h-16 text-blue-400 mx-auto" />
                    <h3 className="text-2xl font-extrabold">iStudy Academy Modern Campus</h3>
                    <p className="text-xs text-blue-200">High-tech interactive classrooms & IELTS testing labs.</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
              
              {/* Play Button Overlay */}
              <button
                onClick={() => onOpenVideo('https://www.youtube.com/embed/dQw4w9WgXcQ')}
                className="absolute inset-0 flex items-center justify-center group/btn focus:outline-none z-10"
              >
                <div className="w-20 h-20 rounded-full bg-white/90 text-blue-600 flex items-center justify-center shadow-2xl group-hover/btn:scale-110 transition-transform duration-300 backdrop-blur-md">
                  <Play className="w-8 h-8 fill-blue-600 ml-1" />
                </div>
              </button>

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white z-10">
                <div>
                  <h4 className="font-bold text-base">{primaryBranch?.name || t('about.card.branch')}</h4>
                  <p className="text-xs text-slate-200">{primaryBranch?.address || t('about.card.branchSubtitle')}</p>
                </div>
                <span className="text-xs font-bold bg-blue-600 px-3 py-1.5 rounded-full shadow-md">
                  {t('about.card.badge')}
                </span>
              </div>
            </div>

            {/* Sub-card snippet */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{t('about.feature1.title')}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{t('about.feature1.subtitle')}</div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{t('about.feature2.title')}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{t('about.feature2.subtitle')}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Tabs & Story Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Tab Selectors */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80">
              {(['story', 'mission', 'vision', 'methodology'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs font-semibold capitalize transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {t(`about.tabs.${tab}`)}
                </button>
              ))}
            </div>

            {/* Active Tab Panel */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-5 min-h-[300px]">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {tabContents[activeTab].title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {tabContents[activeTab].description}
              </p>

              <div className="space-y-3 pt-2">
                {tabContents[activeTab].points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 font-medium">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
