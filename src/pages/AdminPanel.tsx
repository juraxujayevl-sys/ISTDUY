import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Building,
  CheckCircle,
  CheckCircle2,
  ChevronRight,
  Clock,
  CloudUpload,
  Database,
  Edit3,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  Layers,
  LayoutDashboard,
  Link as LinkIcon,
  LogOut,
  Mail,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Star,
  Trash2,
  Trophy,
  Upload,
  UserCheck,
  Users,
  X
} from 'lucide-react';
import {
  createBranch,
  createContactRequest,
  createCourse,
  createFaq,
  createGalleryItem,
  createNewsArticle,
  createRegistration,
  createResult,
  createTeacher,
  createTestimonial,
  deleteBranch,
  deleteContactRequest,
  deleteCourse,
  deleteFaq,
  deleteGalleryItem,
  deleteNewsArticle,
  deleteRegistration,
  deleteResult,
  deleteTeacher,
  deleteTestimonial,
  fetchBranches,
  fetchContactRequests,
  fetchCourses,
  fetchFaqs,
  fetchGalleryItems,
  fetchNewsArticles,
  fetchRegistrations,
  fetchResults,
  fetchTeachers,
  fetchTestimonials,
  uploadMedia,
  updateBranch,
  updateContactRequest,
  updateCourse,
  updateFaq,
  updateGalleryItem,
  updateNewsArticle,
  updateRegistration,
  updateResult,
  updateTeacher,
  updateTestimonial,
} from '../services/supabaseService';
import { Branch, Course, FAQItem, GalleryItem, NewsArticle, StudentResult, Teacher, Testimonial } from '../types';

type SectionKey =
  | 'courses'
  | 'teachers'
  | 'gallery'
  | 'news'
  | 'faqs'
  | 'branches'
  | 'testimonials'
  | 'results'
  | 'contact_requests'
  | 'registrations';

interface SectionConfig {
  key: SectionKey;
  label: string;
  group: 'content' | 'leads';
  icon: any;
  description: string;
}

const sectionConfigs: SectionConfig[] = [
  { key: 'courses', label: 'Courses', group: 'content', icon: BookOpen, description: 'Academic & technical programs' },
  { key: 'teachers', label: 'Teachers', group: 'content', icon: Users, description: 'Faculty & mentors' },
  { key: 'gallery', label: 'Gallery', group: 'content', icon: ImageIcon, description: 'Campus photo & video assets' },
  { key: 'news', label: 'News & Articles', group: 'content', icon: FileText, description: 'Academy news and announcements' },
  { key: 'faqs', label: 'FAQs', group: 'content', icon: HelpCircle, description: 'Frequently asked questions' },
  { key: 'branches', label: 'Branches', group: 'content', icon: Building, description: 'Campus locations & contacts' },
  { key: 'testimonials', label: 'Testimonials', group: 'content', icon: Star, description: 'Student & parent reviews' },
  { key: 'results', label: 'Student Results', group: 'content', icon: Trophy, description: 'IELTS, SAT & exam high scores' },
  { key: 'contact_requests', label: 'Contact Leads', group: 'leads', icon: Mail, description: 'Incoming callback requests' },
  { key: 'registrations', label: 'Course Registrations', group: 'leads', icon: UserCheck, description: 'Seat reservation submissions' },
];

export const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<SectionKey>('courses');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Drawer / Modal editor states
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // Form field state (Clean structured state)
  const [formState, setFormState] = useState<Record<string, any>>({});

  // Media uploader state
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [globalUploading, setGlobalUploading] = useState<boolean>(false);
  const [lastUploadedUrl, setLastUploadedUrl] = useState<string>('');

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);

  // Toast alert state
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Section data fetcher map
  const fetchMap: Record<SectionKey, () => Promise<any[]>> = {
    courses: fetchCourses,
    teachers: fetchTeachers,
    gallery: fetchGalleryItems,
    news: fetchNewsArticles,
    faqs: fetchFaqs,
    branches: fetchBranches,
    testimonials: fetchTestimonials,
    results: fetchResults,
    contact_requests: fetchContactRequests,
    registrations: fetchRegistrations,
  };

  // Load section data from Supabase
  const loadSectionData = async (section: SectionKey) => {
    setLoading(true);
    setError(null);
    try {
      const fetcher = fetchMap[section];
      const data = await fetcher();
      setItems(data || []);
    } catch (err: any) {
      console.error(`Error loading section ${section}:`, err);
      setError(err.message || 'Unable to connect to Supabase database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSectionData(activeSection);
  }, [activeSection]);

  // Initializing blank form state based on active section schema
  const getInitialFormState = (section: SectionKey, item?: any): Record<string, any> => {
    if (item) {
      return JSON.parse(JSON.stringify(item));
    }

    switch (section) {
      case 'courses':
        return {
          name: '',
          category: 'english',
          categoryLabel: 'IELTS Prep',
          description: '',
          fullDescription: '',
          duration: '3 Months',
          lessonsPerWeek: '3 lessons / week',
          level: 'B2 - C1 Level',
          badge: 'Popular',
          price: '850,000 UZS',
          pricePeriod: '/ month',
          teacherId: '',
          teacherName: '',
          teacherRole: '',
          teacherAvatar: '',
          image: '',
          syllabus: [{ week: 'Week 1 - 2', title: 'Foundation & Strategy', topics: ['Overview', 'Practice'] }],
          features: ['Free Mock Tests', 'Interactive Speaking Clubs'],
        };
      case 'teachers':
        return {
          name: '',
          position: '',
          experience: '',
          specialization: '',
          certificates: ['Cambridge CELTA'],
          scoreBadge: 'IELTS 8.5',
          photo: '',
          bio: '',
          education: '',
          socials: { instagram: '', telegram: '', linkedin: '' },
        };
      case 'gallery':
        return {
          title: '',
          category: 'classrooms',
          type: 'image',
          image: '',
          videoUrl: '',
          date: new Date().toISOString().split('T')[0],
        };
      case 'news':
        return {
          title: '',
          summary: '',
          content: '',
          date: new Date().toISOString().split('T')[0],
          category: 'Announcement',
          image: '',
          readTime: '4 min read',
        };
      case 'faqs':
        return {
          question: '',
          answer: '',
          category: 'General',
        };
      case 'branches':
        return {
          name: '',
          address: '',
          phone: '+998 (71) 200-77-88',
          metro: '',
          hours: 'Mon - Sat: 08:30 - 20:30',
          coordinates: { lat: 41.311082, lng: 69.240562 },
        };
      case 'testimonials':
        return {
          authorName: '',
          role: 'Student',
          course: 'IELTS Rocket',
          avatar: '',
          rating: 5,
          text: '',
          videoUrl: '',
          achievement: 'Band 8.0 Achieved',
        };
      case 'results':
        return {
          studentName: '',
          photo: '',
          score: 'IELTS 8.5',
          testType: 'IELTS',
          detailBadge: 'Overall Band 8.5',
          universityAdmitted: '',
          previousScore: '6.5',
          durationInAcademy: '4 Months',
          quote: '',
          courseTaken: 'IELTS Intensive',
        };
      case 'contact_requests':
        return {
          name: '',
          phone: '',
          course: '',
          branch: '',
          message: '',
        };
      case 'registrations':
        return {
          full_name: '',
          phone: '',
          course_name: '',
          branch_name: '',
          shift: 'Morning',
          target_goal: '',
        };
      default:
        return {};
    }
  };

  // Open Form Drawer for New Record
  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormState(getInitialFormState(activeSection));
    setIsEditorOpen(true);
  };

  // Open Form Drawer for Editing Existing Record
  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setFormState(getInitialFormState(activeSection, item));
    setIsEditorOpen(true);
  };

  // Save Item to Supabase
  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (editingItem?.id) {
        // Update existing record
        switch (activeSection) {
          case 'courses': await updateCourse(editingItem.id, formState); break;
          case 'teachers': await updateTeacher(editingItem.id, formState); break;
          case 'gallery': await updateGalleryItem(editingItem.id, formState); break;
          case 'news': await updateNewsArticle(editingItem.id, formState); break;
          case 'faqs': await updateFaq(editingItem.id, formState); break;
          case 'branches': await updateBranch(editingItem.id, formState); break;
          case 'testimonials': await updateTestimonial(editingItem.id, formState); break;
          case 'results': await updateResult(editingItem.id, formState); break;
          case 'contact_requests': await updateContactRequest(editingItem.id, formState); break;
          case 'registrations': await updateRegistration(editingItem.id, formState); break;
        }
        showToast('success', 'Record updated successfully in Supabase.');
      } else {
        // Create new record
        switch (activeSection) {
          case 'courses': await createCourse(formState); break;
          case 'teachers': await createTeacher(formState); break;
          case 'gallery': await createGalleryItem(formState); break;
          case 'news': await createNewsArticle(formState); break;
          case 'faqs': await createFaq(formState); break;
          case 'branches': await createBranch(formState); break;
          case 'testimonials': await createTestimonial(formState); break;
          case 'results': await createResult(formState); break;
          case 'contact_requests': await createContactRequest(formState as any); break;
          case 'registrations': await createRegistration(formState as any); break;
        }
        showToast('success', 'New record created successfully in Supabase.');
      }

      setIsEditorOpen(false);
      await loadSectionData(activeSection);
    } catch (err: any) {
      console.error('Save error:', err);
      showToast('error', err.message || 'Failed to save record to Supabase database.');
    } finally {
      setLoading(false);
    }
  };

  // Perform Deletion
  const handleConfirmDelete = async () => {
    if (!deleteTarget?.id) return;
    setLoading(true);
    try {
      switch (activeSection) {
        case 'courses': await deleteCourse(deleteTarget.id); break;
        case 'teachers': await deleteTeacher(deleteTarget.id); break;
        case 'gallery': await deleteGalleryItem(deleteTarget.id); break;
        case 'news': await deleteNewsArticle(deleteTarget.id); break;
        case 'faqs': await deleteFaq(deleteTarget.id); break;
        case 'branches': await deleteBranch(deleteTarget.id); break;
        case 'testimonials': await deleteTestimonial(deleteTarget.id); break;
        case 'results': await deleteResult(deleteTarget.id); break;
        case 'contact_requests': await deleteContactRequest(deleteTarget.id); break;
        case 'registrations': await deleteRegistration(deleteTarget.id); break;
      }
      showToast('success', 'Record removed permanently from Supabase.');
      setDeleteTarget(null);
      await loadSectionData(activeSection);
    } catch (err: any) {
      console.error('Delete error:', err);
      showToast('error', err.message || 'Failed to delete record.');
    } finally {
      setLoading(false);
    }
  };

  // Global Media Asset Uploading Handler
  const handleGlobalAssetUpload = async (file: File) => {
    setGlobalUploading(true);
    try {
      const { url } = await uploadMedia(file, activeSection);
      setLastUploadedUrl(url);
      showToast('success', 'Media file uploaded to Supabase storage bucket.');
    } catch (err: any) {
      console.error('Upload error:', err);
      showToast('error', err.message || 'Failed to upload asset.');
    } finally {
      setGlobalUploading(false);
    }
  };

  // Direct Inline Media Uploading Handler for specific form field
  const handleFieldUpload = async (fieldKey: string, file: File) => {
    setUploadingField(fieldKey);
    try {
      const { url } = await uploadMedia(file, activeSection);
      setFormState((prev) => ({ ...prev, [fieldKey]: url }));
      setLastUploadedUrl(url);
      showToast('success', `Uploaded file and assigned directly to "${fieldKey}"!`);
    } catch (err: any) {
      console.error('Field Upload Error:', err);
      showToast('error', err.message || 'Failed to upload media.');
    } finally {
      setUploadingField(null);
    }
  };

  // Auto-fill uploaded URL into primary image field of current form
  const handleAutoFillImage = () => {
    if (!lastUploadedUrl) return;
    if ('image' in formState) {
      setFormState((prev) => ({ ...prev, image: lastUploadedUrl }));
    } else if ('photo' in formState) {
      setFormState((prev) => ({ ...prev, photo: lastUploadedUrl }));
    } else if ('avatar' in formState) {
      setFormState((prev) => ({ ...prev, avatar: lastUploadedUrl }));
    }
    showToast('success', 'Uploaded URL copied into active form field!');
  };

  // Search filtering
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    const lower = searchTerm.toLowerCase();
    return items.filter((item) => {
      const text = JSON.stringify(item).toLowerCase();
      return text.includes(lower);
    });
  }, [items, searchTerm]);

  const activeConfig = sectionConfigs.find((s) => s.key === activeSection)!;

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 flex flex-col xl:flex-row antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl border flex items-center gap-3 animate-bounce ${
          toastMessage.type === 'success'
            ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
            : 'bg-rose-950/90 border-rose-500/40 text-rose-200'
        }`}>
          {toastMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-rose-400" />}
          <span className="text-sm font-semibold">{toastMessage.text}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full xl:w-80 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between shrink-0">
        <div>
          {/* Admin Header Branding */}
          <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base font-extrabold tracking-tight text-white">iStudy Control</h1>
                <p className="text-[11px] text-slate-400 font-medium">Supabase Cloud Engine</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              title="Return to Public Site"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Groups */}
          <div className="p-4 space-y-6">
            
            {/* Content Group */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-2">
                Content Management
              </p>
              {sectionConfigs
                .filter((s) => s.group === 'content')
                .map((sec) => {
                  const IconComp = sec.icon;
                  const isActive = activeSection === sec.key;
                  return (
                    <button
                      key={sec.key}
                      onClick={() => setActiveSection(sec.key)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all group ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`} />
                        <span>{sec.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-200" />}
                    </button>
                  );
                })}
            </div>

            {/* Leads Group */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-2">
                Leads & Applications
              </p>
              {sectionConfigs
                .filter((s) => s.group === 'leads')
                .map((sec) => {
                  const IconComp = sec.icon;
                  const isActive = activeSection === sec.key;
                  return (
                    <button
                      key={sec.key}
                      onClick={() => setActiveSection(sec.key)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all group ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}`} />
                        <span>{sec.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-indigo-200" />}
                    </button>
                  );
                })}
            </div>

          </div>
        </div>

        {/* Database Status Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60">
          <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-300">Supabase Storage Active</span>
            </div>
            <Database className="w-4 h-4 text-slate-500" />
          </div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 bg-slate-900/50 min-h-screen flex flex-col">
        
        {/* Workspace Header Bar */}
        <header className="px-6 py-5 border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-blue-400">
              <activeConfig.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">{activeConfig.label}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-extrabold text-[11px]">
                  {items.length} records
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">{activeConfig.description}</p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search database..."
                className="w-48 sm:w-64 pl-10 pr-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => loadSectionData(activeSection)}
              disabled={loading}
              title="Refresh Supabase Data"
              className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-400' : ''}`} />
            </button>

            {/* Add Record Primary Button */}
            <button
              onClick={handleOpenCreate}
              className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Record</span>
            </button>
          </div>
        </header>

        {/* Workspace Content Body */}
        <div className="p-6 sm:p-8 flex-1 space-y-6 max-w-7xl w-full mx-auto">

          {/* Media Asset Quick Uploader Card */}
          <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-950 border border-indigo-800/60 flex items-center justify-center text-indigo-400 shrink-0">
                <CloudUpload className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Supabase Storage Direct Uploader</h4>
                <p className="text-[11px] text-slate-400">Upload images or videos directly to Supabase cloud storage.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <label className="flex-1 md:flex-none px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-bold text-slate-200 cursor-pointer flex items-center justify-center gap-2 transition-colors">
                <CloudUpload className="w-4 h-4 text-blue-400" />
                <span>{globalUploading ? 'Uploading to Supabase...' : 'Choose File to Upload'}</span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleGlobalAssetUpload(e.target.files[0])}
                  disabled={globalUploading}
                />
              </label>

              {lastUploadedUrl && (
                <button
                  type="button"
                  onClick={handleAutoFillImage}
                  className="px-4 py-2.5 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs hover:bg-emerald-600/30 transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Auto-Fill Form Image</span>
                </button>
              )}
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="bg-rose-950/60 border border-rose-800 p-4 rounded-3xl flex items-center gap-3 text-xs text-rose-200">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Data List Cards & Table */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            {loading ? (
              <div className="p-12 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
                <p className="text-xs font-semibold text-slate-400">Loading records from Supabase database...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="p-16 text-center space-y-4">
                <Database className="w-12 h-12 text-slate-600 mx-auto" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">No records found in "{activeConfig.label}"</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Click the "Add Record" button above to insert a new entry into Supabase.
                  </p>
                </div>
                <button
                  onClick={handleOpenCreate}
                  className="px-5 py-2.5 rounded-2xl bg-blue-600 text-white font-bold text-xs inline-flex items-center gap-2 hover:bg-blue-500 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create First Record</span>
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-800/60">
                {filteredItems.map((item, idx) => {
                  const title = item.name || item.title || item.authorName || item.studentName || item.full_name || item.question || `Record #${idx + 1}`;
                  const subtitle = item.category || item.position || item.phone || item.email || item.course || item.address || item.readTime || '';
                  const mediaImage = item.image || item.photo || item.avatar;

                  return (
                    <div
                      key={item.id || idx}
                      className="p-5 hover:bg-slate-900/60 transition-colors flex items-center justify-between gap-4 group"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        {mediaImage ? (
                          <img
                            src={mediaImage}
                            alt={title}
                            className="w-12 h-12 rounded-2xl object-cover border border-slate-700/80 shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 font-extrabold text-sm shrink-0">
                            {title.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                            {title}
                          </h4>
                          {subtitle && (
                            <p className="text-xs text-slate-400 truncate mt-0.5">{subtitle}</p>
                          )}
                          {item.created_at && (
                            <span className="text-[10px] text-slate-500 block mt-1">
                              Created: {new Date(item.created_at).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-bold text-slate-200 hover:text-white transition-colors flex items-center gap-1.5"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => setDeleteTarget(item)}
                          className="px-3 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-xs font-bold text-rose-300 transition-colors flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal / Slide-over Structured Form Editor */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end">
          <div className="w-full max-w-2xl bg-slate-900 border-l border-slate-800 h-full overflow-y-auto flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            
            {/* Editor Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/90 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">
                    {editingItem ? `Edit ${activeConfig.label} Entry` : `Create New ${activeConfig.label}`}
                  </h3>
                  <p className="text-xs text-slate-400">Structured form input directly targeting Supabase schema.</p>
                </div>
              </div>

              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dynamic Structured Form Body */}
            <form id="editor-form" onSubmit={handleSaveItem} className="p-6 space-y-6 flex-1">
              
              {/* Dynamic Field Renderer */}
              {Object.keys(formState).map((fieldKey) => {
                if (fieldKey === 'id' || fieldKey === 'created_at' || fieldKey === 'updated_at') return null;

                const fieldValue = formState[fieldKey];
                const isMediaField = fieldKey === 'image' || fieldKey === 'photo' || fieldKey === 'avatar' || fieldKey === 'teacherAvatar' || fieldKey === 'videoUrl';

                // Inline Direct Upload Field Component for images & media
                if (isMediaField) {
                  return (
                    <div key={fieldKey} className="space-y-3 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                          <ImageIcon className="w-4 h-4" />
                          <span>{fieldKey} (Media Asset)</span>
                        </label>
                        <label className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5 transition-colors shadow-md shadow-blue-600/30">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{uploadingField === fieldKey ? 'Uploading...' : 'Upload Media File'}</span>
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            disabled={uploadingField === fieldKey}
                            onChange={(e) => e.target.files?.[0] && handleFieldUpload(fieldKey, e.target.files[0])}
                          />
                        </label>
                      </div>

                      {fieldValue && (
                        <div className="flex items-center gap-3 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                          <img
                            src={fieldValue}
                            alt="Media preview"
                            className="w-14 h-14 rounded-xl object-cover border border-slate-700 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] text-emerald-400 font-bold uppercase block">Uploaded URL</span>
                            <p className="text-[11px] text-slate-300 truncate">{fieldValue}</p>
                          </div>
                        </div>
                      )}

                      <input
                        type="text"
                        value={fieldValue || ''}
                        onChange={(e) => setFormState((prev) => ({ ...prev, [fieldKey]: e.target.value }))}
                        placeholder="Paste image/media URL or click upload button above..."
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  );
                }

                // Special handling for array of objects (like Course Syllabus)
                if (fieldKey === 'syllabus' && Array.isArray(fieldValue)) {
                  return (
                    <div key={fieldKey} className="space-y-3 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-blue-400">Syllabus Curriculum</label>
                        <button
                          type="button"
                          onClick={() => {
                            const newSyllabus = [...fieldValue, { week: `Week ${fieldValue.length + 1}`, title: '', topics: [''] }];
                            setFormState((prev) => ({ ...prev, syllabus: newSyllabus }));
                          }}
                          className="px-3 py-1 rounded-xl bg-blue-600/20 text-blue-300 border border-blue-500/30 text-xs font-bold hover:bg-blue-600/30"
                        >
                          + Add Week
                        </button>
                      </div>

                      {fieldValue.map((sItem: any, sIdx: number) => (
                        <div key={sIdx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              value={sItem.week || ''}
                              onChange={(e) => {
                                const copy = [...fieldValue];
                                copy[sIdx].week = e.target.value;
                                setFormState((prev) => ({ ...prev, syllabus: copy }));
                              }}
                              placeholder="Week title (e.g. Week 1 - 2)"
                              className="w-1/3 p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                            />
                            <input
                              type="text"
                              value={sItem.title || ''}
                              onChange={(e) => {
                                const copy = [...fieldValue];
                                copy[sIdx].title = e.target.value;
                                setFormState((prev) => ({ ...prev, syllabus: copy }));
                              }}
                              placeholder="Topic header (e.g. IELTS Speaking Mastery)"
                              className="flex-1 p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const copy = fieldValue.filter((_: any, i: number) => i !== sIdx);
                                setFormState((prev) => ({ ...prev, syllabus: copy }));
                              }}
                              className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }

                // Special handling for array of strings (like Features or Certificates)
                if ((fieldKey === 'features' || fieldKey === 'certificates') && Array.isArray(fieldValue)) {
                  return (
                    <div key={fieldKey} className="space-y-3 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-blue-400">{fieldKey}</label>
                        <button
                          type="button"
                          onClick={() => {
                            setFormState((prev) => ({ ...prev, [fieldKey]: [...fieldValue, ''] }));
                          }}
                          className="px-3 py-1 rounded-xl bg-blue-600/20 text-blue-300 border border-blue-500/30 text-xs font-bold hover:bg-blue-600/30"
                        >
                          + Add Item
                        </button>
                      </div>

                      {fieldValue.map((strVal: string, sIdx: number) => (
                        <div key={sIdx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={strVal}
                            onChange={(e) => {
                              const copy = [...fieldValue];
                              copy[sIdx] = e.target.value;
                              setFormState((prev) => ({ ...prev, [fieldKey]: copy }));
                            }}
                            placeholder={`Enter ${fieldKey} item...`}
                            className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const copy = fieldValue.filter((_: any, i: number) => i !== sIdx);
                              setFormState((prev) => ({ ...prev, [fieldKey]: copy }));
                            }}
                            className="p-2 rounded-xl text-rose-400 hover:bg-rose-950/40"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }

                // Special handling for Socials object
                if (fieldKey === 'socials' && typeof fieldValue === 'object' && fieldValue !== null) {
                  return (
                    <div key={fieldKey} className="space-y-3 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <label className="text-xs font-bold uppercase tracking-wider text-blue-400">Social Media Links</label>
                      <div className="grid grid-cols-1 gap-3">
                        <input
                          type="text"
                          value={fieldValue.instagram || ''}
                          onChange={(e) => setFormState((prev) => ({ ...prev, socials: { ...prev.socials, instagram: e.target.value } }))}
                          placeholder="Instagram URL"
                          className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={fieldValue.telegram || ''}
                          onChange={(e) => setFormState((prev) => ({ ...prev, socials: { ...prev.socials, telegram: e.target.value } }))}
                          placeholder="Telegram URL"
                          className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={fieldValue.linkedin || ''}
                          onChange={(e) => setFormState((prev) => ({ ...prev, socials: { ...prev.socials, linkedin: e.target.value } }))}
                          placeholder="LinkedIn URL"
                          className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  );
                }

                // Long text fields
                if (fieldKey === 'description' || fieldKey === 'fullDescription' || fieldKey === 'bio' || fieldKey === 'content' || fieldKey === 'summary' || fieldKey === 'answer' || fieldKey === 'quote' || fieldKey === 'message' || fieldKey === 'target_goal') {
                  return (
                    <div key={fieldKey} className="space-y-1.5">
                      <label className="block text-xs font-semibold capitalize text-slate-300">{fieldKey}</label>
                      <textarea
                        rows={4}
                        value={fieldValue || ''}
                        onChange={(e) => setFormState((prev) => ({ ...prev, [fieldKey]: e.target.value }))}
                        className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  );
                }

                // Default string / number / select input
                return (
                  <div key={fieldKey} className="space-y-1.5">
                    <label className="block text-xs font-semibold capitalize text-slate-300">{fieldKey}</label>
                    <input
                      type={fieldKey === 'rating' ? 'number' : 'text'}
                      value={fieldValue ?? ''}
                      onChange={(e) => setFormState((prev) => ({ ...prev, [fieldKey]: e.target.value }))}
                      className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                );
              })}

            </form>

            {/* Editor Footer */}
            <div className="p-6 border-t border-slate-800 bg-slate-900/90 flex items-center justify-end gap-3 sticky bottom-0 z-10">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                form="editor-form"
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{editingItem ? 'Save Changes' : 'Create Record'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Delete Confirmation Animated Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-md w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-3xl bg-rose-950 border border-rose-800/80 flex items-center justify-center text-rose-400 mx-auto">
              <Trash2 className="w-7 h-7" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-extrabold text-white">Delete Record Permanently?</h3>
              <p className="text-xs text-slate-400">
                Are you sure you want to remove <strong className="text-slate-200">{deleteTarget.name || deleteTarget.title || deleteTarget.studentName || 'this record'}</strong> from Supabase? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={loading}
                className="flex-1 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all"
              >
                {loading ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
