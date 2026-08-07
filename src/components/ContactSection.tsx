import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, MessageSquare, CheckCircle, Navigation, Sparkles } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { Branch } from '../types';

interface ContactProps {
  onFormSubmit: (data: { name: string; phone: string; course: string; branch: string; message: string }) => Promise<void> | void;
}

export const ContactSection: React.FC<ContactProps> = ({ onFormSubmit }) => {
  const { courses, branches } = useAppData();
  const { t } = useThemeLanguage();
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: '',
    branch: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeBranch = selectedBranch || branches[0] || {
    id: '',
    name: 'Loading branch...',
    address: '',
    phone: '',
    metro: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
  };

  useEffect(() => {
    if (!selectedBranch && branches.length > 0) {
      setSelectedBranch(branches[0]);
      setFormData((prev) => ({
        ...prev,
        branch: prev.branch || branches[0].name,
      }));
    }
  }, [branches, selectedBranch]);

  useEffect(() => {
    if (!formData.course && courses.length > 0) {
      setFormData((prev) => ({
        ...prev,
        course: prev.course || courses[0].name,
      }));
    }
  }, [courses, formData.course]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      return;
    }

    setIsSubmitting(true);
    const persistedForm = {
      ...formData,
      course: formData.course || courses[0]?.name || '',
      branch: formData.branch || branches[0]?.name || '',
    };

    try {
      await onFormSubmit(persistedForm);
      setFormData({
        name: '',
        phone: '',
        course: courses[0]?.name || '',
        branch: branches[0]?.name || '',
        message: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>{t('contact.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t('contact.title')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800">
              {t('contact.titleHighlight')}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column - Contact Details & Map Placeholder */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Branch Selector Tabs */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{t('contact.branchTitle')}</h3>
              <div className="grid grid-cols-1 gap-2.5">
                {branches.map((b) => {
                  const isSelected = activeBranch.id === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => {
                        setSelectedBranch(b);
                        setFormData((prev) => ({ ...prev, branch: b.name }));
                      }}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-blue-50 border-blue-300 text-slate-900 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900">{b.name}</span>
                        {isSelected && <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded border border-blue-200">{t('contact.activeBranch')}</span>}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5 font-normal">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        {b.address}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Map Visual Box */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 h-64 shadow-sm group">
              {/* Simulated Map Background Canvas */}
              <div className="absolute inset-0 bg-slate-100 p-6 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
                
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-white/90 px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-900 shadow-sm">
                    <Navigation className="w-3.5 h-3.5 text-blue-600 animate-bounce" />
                    <span className="font-bold">{activeBranch.name}</span>
                  </div>
                  <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg font-bold">
                    {activeBranch.metro}
                  </span>
                </div>

                <div className="relative z-10 bg-white/95 p-4 rounded-2xl border border-slate-200 text-xs space-y-1.5 backdrop-blur-md shadow-sm">
                  <div className="flex items-center gap-2 text-slate-900">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-bold">{activeBranch.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>{activeBranch.hours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Bar */}
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600">
              <span className="font-bold text-slate-900">{t('contact.socialTitle')}</span>
              <div className="flex items-center gap-3">
                <a href="https://t.me/istudy_academy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold">
                  <Send className="w-4 h-4" />
                  <span>{t('contact.social.telegram')}</span>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-pink-600 hover:text-pink-700 font-semibold">
                  <Instagram className="w-4 h-4" />
                  <span>{t('contact.social.instagram')}</span>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-blue-700 hover:text-blue-800 font-semibold">
                  <Facebook className="w-4 h-4" />
                  <span>{t('contact.social.facebook')}</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-6 bg-slate-50 p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span>{t('contact.formTitle')}</span>
              </h3>
              <p className="text-xs text-slate-600 mt-1 font-normal">
                {t('contact.formSubtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('contact.name')}</label>
                <input
                  type="text"
                  required
                  placeholder={t('contact.exampleName')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('contact.phone')}</label>
                <input
                  type="tel"
                  required
                  placeholder="+998 (90) 123-45-67"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t('contact.course')}</label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 shadow-sm"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t('contact.branch')}</label>
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 shadow-sm"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('contact.message')}</label>
                <textarea
                  rows={3}
                  placeholder={t('contact.messagePlaceholder')}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>{t('contact.sending')}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('contact.submit')}</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
