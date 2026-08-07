import React from 'react';
import { motion } from 'motion/react';
import { Newspaper, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { NewsArticle } from '../types';

interface NewsProps {
  onSelectNews: (article: NewsArticle) => void;
}

export const NewsSection: React.FC<NewsProps> = ({ onSelectNews }) => {
  const { news } = useAppData();
  const { t } = useThemeLanguage();
  return (
    <section id="news" className="py-24 bg-slate-50 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">
            <Newspaper className="w-3.5 h-3.5 text-blue-600" />
            <span>{t('news.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t('news.title')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800">
              {t('news.titleHighlight')}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t('news.subtitle')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-blue-200 shadow-sm hover:shadow-xl flex flex-col justify-between group cursor-pointer transition-all duration-300"
              onClick={() => onSelectNews(article)}
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    {article.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                <span>{t('news.readMore')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
