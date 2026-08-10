import React, { useEffect, useMemo, useState } from 'react';
import { Globe, Menu, Moon, Sun, X } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import logo from '../assets/images/logo.png';

interface NavbarProps {
  onOpenEnroll: (courseId?: string) => void;
}

const navLinks = [
  { id: 'home', labelKey: 'nav.home' },
  { id: 'about', labelKey: 'nav.about' },
  { id: 'courses', labelKey: 'nav.courses' },
  { id: 'teachers', labelKey: 'nav.teachers' },
  { id: 'results', labelKey: 'nav.results' },
  { id: 'gallery', labelKey: 'nav.gallery' },
  { id: 'news', labelKey: 'nav.news' },
  { id: 'testimonials', labelKey: 'nav.testimonials' },
  { id: 'faq', labelKey: 'nav.faq' },
  { id: 'contact', labelKey: 'nav.contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnroll }) => {
  const { theme, setTheme, language, setLanguage, t } = useThemeLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const themeIcon = useMemo(() => (theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />), [theme]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const scrollToSection = (id: string) => {
    const anchor = document.getElementById(id);
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileOpen(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="inline-flex items-center gap-3 text-slate-900 transition hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400"
          aria-label="Go to home"
        >
          <img
            src={logo}
            alt="iStudy Academy logo"
            className="h-10 w-10 rounded-2xl object-cover border border-slate-200 shadow-sm dark:border-slate-700"
          />
          <span className="text-base font-semibold tracking-tight">
            iStudy Academy
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex md:gap-2 lg:gap-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToSection(link.id)}
              className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              {t(link.labelKey)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 md:flex">
            <Globe className="h-4 w-4" />
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value as typeof language)}
              className="bg-transparent pr-1 text-xs font-semibold outline-none text-slate-700 dark:text-slate-200"
              aria-label="Select language"
            >
              <option value="en">EN</option>
              <option value="ru">RU</option>
              <option value="uz">UZ</option>
            </select>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:text-blue-400"
            aria-label="Toggle theme"
          >
            {themeIcon}
          </button>

          <button
            type="button"
            onClick={() => onOpenEnroll()}
            className="hidden rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700 md:inline-flex"
          >
            {t('nav.enroll')}
          </button>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 md:hidden"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200/80 bg-white/95 pb-6 shadow-lg shadow-slate-200/50 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 pt-4 sm:px-6">
            <div className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className="w-full rounded-2xl px-4 py-3 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {t(link.labelKey)}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-3">
              <button
                type="button"
                onClick={() => onOpenEnroll()}
                className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                {t('nav.enroll')}
              </button>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                  <Globe className="h-4 w-4" />
                  Language
                </div>
                <div className="mt-3 flex items-center gap-2">
                  {(['en', 'ru', 'uz'] as const).map((locale) => (
                    <button
                      key={locale}
                      type="button"
                      onClick={() => setLanguage(locale)}
                      className={`rounded-full px-3 py-2 text-xs font-semibold transition ${language === locale ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800'}`}
                    >
                      {locale.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
