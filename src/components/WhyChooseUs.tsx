import React from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Monitor,
  Globe2,
  UserCheck,
  Clock,
  BadgeDollarSign,
  Award,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export const WhyChooseUs: React.FC = () => {
  const { t } = useThemeLanguage();
  const features = [
    {
      icon: Users,
      title: t('why.feature1.title'),
      desc: t('why.feature1.desc'),
      color: 'bg-blue-50 text-blue-600 border-blue-100'
    },
    {
      icon: Monitor,
      title: t('why.feature2.title'),
      desc: t('why.feature2.desc'),
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100'
    },
    {
      icon: Globe2,
      title: t('why.feature3.title'),
      desc: t('why.feature3.desc'),
      color: 'bg-sky-50 text-sky-600 border-sky-100'
    },
    {
      icon: UserCheck,
      title: t('why.feature4.title'),
      desc: t('why.feature4.desc'),
      color: 'bg-amber-50 text-amber-600 border-amber-100'
    },
    {
      icon: Clock,
      title: t('why.feature5.title'),
      desc: t('why.feature5.desc'),
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    },
    {
      icon: BadgeDollarSign,
      title: t('why.feature6.title'),
      desc: t('why.feature6.desc'),
      color: 'bg-rose-50 text-rose-600 border-rose-100'
    },
    {
      icon: Award,
      title: t('why.feature7.title'),
      desc: t('why.feature7.desc'),
      color: 'bg-violet-50 text-violet-600 border-violet-100'
    },
    {
      icon: GraduationCap,
      title: t('why.feature8.title'),
      desc: t('why.feature8.desc'),
      color: 'bg-blue-50 text-blue-700 border-blue-100'
    }
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{t('why.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t('why.title')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800">
              {t('why.titleHighlight')}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t('why.subtitle')}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 hover:border-blue-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl ${item.color} border flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                <span>{t('why.feature.standard')}</span>
                <span className="text-slate-400 group-hover:text-blue-600">→</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
