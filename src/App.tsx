/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CoursesSection } from './components/CoursesSection';
import { TeachersSection } from './components/TeachersSection';
import { ResultsSection } from './components/ResultsSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { NewsSection } from './components/NewsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { EnrollModal } from './components/modals/EnrollModal';
import { CourseDetailModal } from './components/modals/CourseDetailModal';
import { LightboxModal } from './components/modals/LightboxModal';
import { ArticleModal } from './components/modals/ArticleModal';
import { PrivacyModal } from './components/modals/PrivacyModal';
import { NotificationToast, ToastMessage } from './components/NotificationToast';
import { createContactRequest, subscribeNewsletter } from './services/supabaseService';
import { useThemeLanguage } from './context/ThemeLanguageContext';

import { Course, GalleryItem, NewsArticle } from './types';

export default function App() {
  const { theme, t } = useThemeLanguage();

  const interpolate = (template: string, values: Record<string, string>) =>
    template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '');

  // Modal states
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [enrollInitialCourseId, setEnrollInitialCourseId] = useState<string | undefined>(undefined);
  
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<Course | null>(null);
  // Level test modal removed — feature deprecated per request
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, description?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Triggers
  const handleOpenEnroll = (courseId?: string) => {
    setEnrollInitialCourseId(courseId);
    setEnrollModalOpen(true);
  };

  const handleEnrollComplete = (regDetails: { regId: string; studentName: string; courseName: string }) => {
    addToast(
      'success',
      t('toast.enrollSuccess.title'),
      interpolate(t('toast.enrollSuccess.desc'), {
        name: regDetails.studentName,
        course: regDetails.courseName,
        ref: regDetails.regId,
      })
    );
  };

  const handleContactSubmit = async (data: { name: string; phone: string; course: string; branch: string; message: string }) => {
    try {
      await createContactRequest(data);
      addToast(
        'success',
        t('toast.contactSuccess.title'),
        interpolate(t('toast.contactSuccess.desc'), { name: data.name, phone: data.phone })
      );
    } catch (error) {
      addToast(
        'error',
        t('toast.error.title'),
        t('toast.error.desc')
      );
    }
  };

  const handleSubscribeNewsletter = async (email: string) => {
    try {
      await subscribeNewsletter(email);
      addToast(
        'info',
        t('toast.subscribeSuccess.title'),
        interpolate(t('toast.subscribeSuccess.desc'), { email })
      );
    } catch (error) {
      addToast(
        'error',
        t('toast.subscribeError.title'),
        t('toast.subscribeError.desc')
      );
    }
  };

  const handleOpenConsultation = (teacherName: string) => {
    addToast(
      'info',
      interpolate(t('toast.consultation.title'), { teacher: teacherName }),
      t('toast.consultation.desc')
    );
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenVideo = (url: string) => {
    setLightboxItem({
      id: 'tour-video',
      title: 'iStudy Academy Virtual Video Tour',
      category: 'events',
      image: '',
      type: 'video',
      videoUrl: url,
      date: '2026'
    });
  };

  return (
    <div className={`min-h-screen font-sans antialiased selection:bg-blue-600 selection:text-white transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'}`}>
      {/* Sticky Navigation */}
      <Navbar
        onOpenEnroll={handleOpenEnroll}
      />

      {/* Hero Section */}
      <Hero
        onOpenEnroll={handleOpenEnroll}
        onOpenVideo={handleOpenVideo}
      />

      {/* About Section */}
      <AboutSection onOpenVideo={handleOpenVideo} />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Courses Section */}
      <CoursesSection
        onSelectCourse={(course) => setSelectedCourseDetail(course)}
        onOpenEnroll={handleOpenEnroll}
      />

      {/* Teachers Section */}
      <TeachersSection onOpenConsultation={handleOpenConsultation} />

      {/* Student Results */}
      <ResultsSection />

      {/* Photo & Video Gallery */}
      <GallerySection onOpenLightbox={(item) => setLightboxItem(item)} />

      {/* Testimonials */}
      <TestimonialsSection onOpenVideo={handleOpenVideo} />

      {/* News & Announcements */}
      <NewsSection onSelectNews={(article) => setSelectedArticle(article)} />

      {/* FAQ */}
      <FAQSection />

      {/* Contact Section */}
      <ContactSection onFormSubmit={handleContactSubmit} />

      {/* Footer */}
      <Footer
        onSubscribeNewsletter={handleSubscribeNewsletter}
        onOpenPrivacy={() => setPrivacyOpen(true)}
      />

      {/* Interactive Modals */}
      <EnrollModal
        isOpen={enrollModalOpen}
        initialCourseId={enrollInitialCourseId}
        onClose={() => setEnrollModalOpen(false)}
        onComplete={handleEnrollComplete}
      />

      <CourseDetailModal
        course={selectedCourseDetail}
        onClose={() => setSelectedCourseDetail(null)}
        onOpenEnroll={(cId) => handleOpenEnroll(cId)}
      />

      {/* LevelTestModal disconnected */}

      <LightboxModal
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <PrivacyModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />

      {/* Floating Notifications */}
      <NotificationToast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
