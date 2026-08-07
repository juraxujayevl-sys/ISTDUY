import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Clock, Calendar, ArrowRight, BookOpen, Sparkles, Filter, Check, Award, Database } from 'lucide-react';
import { Course } from '../types';
import { useAppData } from '../context/AppDataContext';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

interface CoursesSectionProps {
  onSelectCourse: (course: Course) => void;
  onOpenEnroll: (courseId?: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ onSelectCourse, onOpenEnroll }) => {
  const { courses } = useAppData();
  const { t } = useThemeLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'english' | 'prep' | 'tech' | 'design'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.categoryLabel && course.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: t('courses.filter.all') },
    { id: 'english', label: t('courses.filter.english') },
    { id: 'prep', label: t('courses.filter.prep') },
    { id: 'tech', label: t('courses.filter.tech') },
    { id: 'design', label: t('courses.filter.design') },
  ];

  return (
    <section id="courses" className="py-24 bg-white relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>{t('courses.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t('courses.title')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800">
              {t('courses.titleHighlight')}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t('courses.subtitle')}
          </p>
        </div>

        {/* Filters & Search Controls */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-100 p-3 rounded-3xl border border-slate-200/80">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('courses.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-sm transition-colors"
            />
          </div>

        </div>

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300 space-y-4 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
              <Database className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-slate-900">{t('courses.empty.title')}</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {t('courses.empty.desc')}
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <a
                href="/admin"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-2xl shadow-md transition-colors inline-flex items-center gap-2"
              >
                <Database className="w-4 h-4" />
                <span>{t('courses.empty.admin')}</span>
              </a>
              <button
                onClick={() => onOpenEnroll()}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-2xl shadow-md transition-colors inline-flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>{t('courses.empty.enroll')}</span>
              </button>
            </div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
            <Filter className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">{t('courses.noMatch.title')}</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">{t('courses.noMatch.desc')}</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-2xl shadow-md cursor-pointer transition-colors"
            >
              {t('courses.reset')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course) => (
                <motion.div
                  layout
                  key={course.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-xl flex flex-col justify-between group transition-all duration-300"
                >
                  <div>
                    {/* Course Image Header */}
                    <div className="relative h-48 overflow-hidden bg-slate-900">
                      {course.image ? (
                        <img
                          src={course.image}
                          alt={course.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-tr from-blue-900 to-indigo-950 flex items-center justify-center p-6 text-white text-center">
                          <BookOpen className="w-12 h-12 text-blue-400 mx-auto" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-white/90 text-slate-900 text-[11px] font-bold backdrop-blur-md border border-slate-200/80 shadow-sm">
                          {course.categoryLabel || 'Program'}
                        </span>
                        {course.badge && (
                          <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-extrabold shadow-md">
                            {course.badge}
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-3 left-4 flex items-center gap-2 text-xs text-white font-medium">
                        <span className="bg-blue-600 px-2.5 py-0.5 rounded-md text-[11px] text-white font-bold shadow-sm">
                          {t('courses.card.level')}: {course.level || 'Standard'}
                        </span>
                      </div>
                    </div>

                    {/* Course Body */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {course.name}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 font-normal">
                        {course.description}
                      </p>

                      {/* Info Chips */}
                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200/60">
                          <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate">{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200/60">
                          <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="truncate">{course.lessonsPerWeek}</span>
                        </div>
                      </div>

                      {/* Teacher Pill */}
                      {course.teacherName && (
                        <div className="flex items-center gap-3 pt-2">
                          {course.teacherAvatar ? (
                            <img
                              src={course.teacherAvatar}
                              alt={course.teacherName}
                              className="w-8 h-8 rounded-full object-cover border border-slate-200"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-xs">
                              {course.teacherName.charAt(0)}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">{course.teacherName}</p>
                            <p className="text-[10px] text-slate-500 truncate">{course.teacherRole || 'Instructor'}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 pt-0 border-t border-slate-100 mt-4 space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <span className="text-2xl font-extrabold text-slate-900">{course.price}</span>
                        <span className="text-xs text-slate-500 ml-1 font-medium">{course.pricePeriod}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => onSelectCourse(course)}
                        className="py-3 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                      >
                        {t('courses.card.learnMore')}
                      </button>
                      <button
                        onClick={() => onOpenEnroll(course.id)}
                        className="py-3 px-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>{t('courses.card.enroll')}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
};
