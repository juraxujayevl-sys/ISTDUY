import React from 'react';
import { motion } from 'motion/react';
import { X, Calendar, Clock, Newspaper } from 'lucide-react';
import { NewsArticle } from '../../types';

interface ArticleProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white border border-slate-200 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col text-slate-900"
      >
        <div className="relative h-60 bg-slate-100 shrink-0">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 flex items-center justify-center backdrop-blur-md border border-slate-200 shadow-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
              {article.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1 leading-snug drop-shadow-sm">
              {article.title}
            </h3>
          </div>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="flex items-center gap-4 text-xs text-slate-500 border-b border-slate-200 pb-3 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-600" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" />
              {article.readTime}
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line font-normal">
            {article.content}
          </p>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="py-2.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            Close Article
          </button>
        </div>
      </motion.div>
    </div>
  );
};
