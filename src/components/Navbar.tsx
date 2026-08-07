import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight, Sparkles, Award, LayoutDashboard, Moon, Sun, Languages } from 'lucide-react';
import logo from '../assets/images/istudy log.jpg';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

interface NavbarProps {
  onOpenEnroll: (courseId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnroll }) => {
  const navigate = useNavigate();
  const { theme, language, setTheme, setLanguage, t } = useThemeLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.courses'), href: '#courses' },
    { name: t('nav.teachers'), href: '#teachers' },
    { name: t('nav.results'), href: '#results' },
    { name: t('nav.gallery'), href: '#gallery' },
    { name: t('nav.news'), href: '#news' },
    { name: t('nav.testimonials'), href: '#testimonials' },
    { name: t('nav.faq'), href: '#faq' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? theme === 'dark'
            ? 'bg-slate-900/85 backdrop-blur-md border-b border-slate-700/80 shadow-sm py-3'
            : 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3'
          : theme === 'dark'
            ? 'bg-slate-900/60 backdrop-blur-sm py-5 border-b border-slate-700/30'
            : 'bg-white/60 backdrop-blur-sm py-5 border-b border-slate-200/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group focus:outline-none flex-shrink-0"
          >
            <img src={logo} alt="iStudy Academy logo" className="w-12 h-12 rounded-2xl shadow-lg shadow-slate-300 transition-transform duration-300 group-hover:scale-105 object-contain" />
            <div>
              <span className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
                iStudy <span className="text-blue-600">Academy</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav
            className={`hidden xl:flex items-center gap-2 p-1.5 rounded-full border backdrop-blur-md overflow-x-auto max-w-[60%] ${
              theme === 'dark' ? 'bg-slate-800/90 border-slate-700/80' : 'bg-slate-100/90 border-slate-200/80'
            }`}
            aria-label="Primary"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 relative whitespace-nowrap min-w-max ${
                    isActive
                      ? 'text-blue-600 font-semibold'
                      : theme === 'dark'
                        ? 'text-slate-300 hover:text-blue-400'
                        : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navTab"
                      className={`absolute inset-0 border shadow-sm rounded-full ${theme === 'dark' ? 'bg-slate-700 border-slate-600/80' : 'bg-white border-slate-200/80'}`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            <div className={`flex items-center gap-1 rounded-full border p-1 ${theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'}`}>
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className={`rounded-full p-2 ${theme === 'dark' ? 'bg-slate-700 text-slate-100' : 'bg-slate-100 text-slate-700'}`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setLanguage(language === 'en' ? 'ru' : language === 'ru' ? 'uz' : 'en')}
                className={`flex items-center gap-1 px-2.5 py-2 rounded-full text-xs font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}
                aria-label="Switch language"
              >
                <Languages className="w-4 h-4" />
                <span>{language.toUpperCase()}</span>
              </button>
            </div>

            {/* Level Test button removed per request */}

            <button
              onClick={() => onOpenEnroll()}
              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2.5 rounded-full shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>{t('nav.enroll')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/admin')}
              className="flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-4 py-2.5 rounded-full shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-blue-600" />
              <span>{t('nav.admin')}</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => navigate('/admin')}
              className="sm:flex hidden items-center gap-1 text-xs text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full font-bold"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-blue-600" />
              <span>{t('nav.mobileAdmin')}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 bg-white rounded-xl border border-slate-200 focus:outline-none shadow-sm cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`xl:hidden backdrop-blur-xl border-b overflow-hidden shadow-2xl ${theme === 'dark' ? 'bg-slate-900/98 border-slate-700 text-slate-100' : 'bg-white/98 border-slate-200 text-slate-900'}`}
          >
            <div className="px-4 pt-3 pb-6 space-y-2 max-w-lg mx-auto">
              <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${theme === 'dark' ? 'text-slate-300 hover:bg-slate-800 hover:text-blue-400' : 'text-slate-700 hover:bg-slate-100 hover:text-blue-600'}`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                ))}
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                {/* Mobile Level Test button removed per request */}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnroll();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-sm font-semibold shadow-md cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>{t('nav.mobileEnroll')}</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/admin');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-full text-sm font-bold shadow-sm cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4 text-blue-600" />
                  <span>{t('nav.mobileAdminGo')}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
