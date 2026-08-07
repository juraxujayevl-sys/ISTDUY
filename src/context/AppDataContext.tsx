import React, { createContext, useContext, useEffect, useState } from 'react';
import { Course, Teacher, GalleryItem, NewsArticle, FAQItem, Branch, Testimonial, StudentResult } from '../types';
import {
  fetchBranches,
  fetchCourses,
  fetchFaqs,
  fetchGalleryItems,
  fetchNewsArticles,
  fetchResults,
  fetchTeachers,
  fetchTestimonials,
} from '../services/supabaseService';

interface AppDataContextValue {
  courses: Course[];
  teachers: Teacher[];
  gallery: GalleryItem[];
  news: NewsArticle[];
  faqs: FAQItem[];
  branches: Branch[];
  testimonials: Testimonial[];
  results: StudentResult[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [results, setResults] = useState<StudentResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const [coursesData, teachersData, galleryData, newsData, faqsData, branchesData, testimonialsData, resultsData] = await Promise.all([
        fetchCourses().catch(() => []),
        fetchTeachers().catch(() => []),
        fetchGalleryItems().catch(() => []),
        fetchNewsArticles().catch(() => []),
        fetchFaqs().catch(() => []),
        fetchBranches().catch(() => []),
        fetchTestimonials().catch(() => []),
        fetchResults().catch(() => []),
      ]);
      setCourses(coursesData);
      setTeachers(teachersData);
      setGallery(galleryData);
      setNews(newsData);
      setFaqs(faqsData);
      setBranches(branchesData);
      setTestimonials(testimonialsData);
      setResults(resultsData);
    } catch (err: any) {
      console.error('Error fetching Supabase data:', err);
      setError(err.message || 'Failed to load data from Supabase');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <AppDataContext.Provider
      value={{
        courses,
        teachers,
        gallery,
        news,
        faqs,
        branches,
        testimonials,
        results,
        loading,
        error,
        refresh,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within AppDataProvider');
  }
  return context;
};
