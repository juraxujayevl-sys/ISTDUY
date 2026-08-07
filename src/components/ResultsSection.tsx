import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Star, GraduationCap, TrendingUp, Quote, CheckCircle } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export const ResultsSection: React.FC = () => {
  const { results } = useAppData();
  const { t } = useThemeLanguage();

  return (
    <section id="results" className="py-24 bg-white relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5 text-blue-600" />
            <span>{t('results.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t('results.title')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800">
              {t('results.titleHighlight')}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t('results.subtitle')}
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((result, idx) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 hover:border-blue-200 shadow-sm hover:shadow-xl flex flex-col justify-between relative group transition-all duration-300"
            >
              <div>
                {/* Header Profile */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={result.photo}
                      alt={result.studentName}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {result.studentName}
                      </h3>
                      <p className="text-xs text-blue-600 font-bold">{result.courseTaken}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-black text-blue-600 tracking-tight">
                      {result.score}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {result.testType} Score
                    </span>
                  </div>
                </div>

                {/* Score Breakdown Badge */}
                <div className="mt-4 bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">{result.detailBadge}</span>
                  </div>
                </div>

                {/* Progress stat */}
                {result.previousScore && (
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                    <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                      {t('results.growth')}
                    </span>
                    <span className="font-bold text-emerald-600">
                      {result.previousScore} → {result.score} ({result.durationInAcademy})
                    </span>
                  </div>
                )}

                {/* Quote */}
                <div className="mt-4 relative">
                  <Quote className="w-6 h-6 text-slate-200 absolute -top-1 -left-1" />
                  <p className="text-xs text-slate-600 italic leading-relaxed pl-5 relative z-10 font-normal">
                    "{result.quote}"
                  </p>
                </div>
              </div>

              {/* Admission Footer */}
              {result.universityAdmitted && (
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-900 bg-blue-50 p-3 rounded-2xl border border-blue-100">
                  <GraduationCap className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="truncate">{result.universityAdmitted}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
