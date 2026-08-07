import React from 'react';
import { motion } from 'motion/react';
import { X, Clock, Calendar, CheckCircle2, Award, User, BookOpen, ArrowRight } from 'lucide-react';
import { Course } from '../../types';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onOpenEnroll: (courseId: string) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({ course, onClose, onOpenEnroll }) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white border border-slate-200 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col text-slate-900"
      >
        {/* Banner Header */}
        <div className="relative h-48 sm:h-56 bg-slate-100 shrink-0">
          <img
            src={course.image}
            alt={course.name}
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
              {course.categoryLabel}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 leading-tight drop-shadow-sm">
              {course.name}
            </h3>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Overview Bar */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block">Duration:</span>
              <span className="font-bold text-slate-900">{course.duration}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Lessons:</span>
              <span className="font-bold text-slate-900">{course.lessonsPerWeek}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Level:</span>
              <span className="font-bold text-blue-600">{course.level}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Course Overview</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {course.fullDescription}
            </p>
          </div>

          {/* Teacher Profile */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
            <img
              src={course.teacherAvatar}
              alt={course.teacherName}
              className="w-12 h-12 rounded-full object-cover border border-blue-200"
              referrerPolicy="no-referrer"
            />
            <div>
              <h5 className="text-sm font-bold text-slate-900">{course.teacherName}</h5>
              <p className="text-xs text-blue-600 font-semibold">{course.teacherRole}</p>
            </div>
          </div>

          {/* Syllabus Outline */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Syllabus & Curriculum Modules</span>
            </h4>

            <div className="space-y-3">
              {course.syllabus.map((syl, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded border border-blue-200">
                      {syl.week}
                    </span>
                    <span className="font-bold text-slate-900">{syl.title}</span>
                  </div>
                  <ul className="space-y-1 pt-1">
                    {syl.topics.map((t, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-center gap-2 font-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Included Features */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Included Perks</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {course.features.map((feat, i) => (
                <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-2 text-slate-700 font-normal">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div>
            <span className="text-2xl font-black text-slate-900">{course.price}</span>
            <span className="text-xs text-slate-500 ml-1">{course.pricePeriod}</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenEnroll(course.id);
            }}
            className="py-3 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-colors"
          >
            <span>Enroll in This Course</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
