import { supabase } from '../supabaseClient';
import {
  Course,
  Teacher,
  GalleryItem,
  NewsArticle,
  FAQItem,
  Branch,
  Testimonial,
  StudentResult,
} from '../types';

const storageBucket = 'assets';

const parseError = (error: any) => {
  if (error) {
    console.error('Supabase Operation Error:', error);
    const msg = error.message || error.details || error.hint || (typeof error === 'string' ? error : JSON.stringify(error));
    throw new Error(msg);
  }
};

export const uploadMedia = async (file: File, folder = 'uploads') => {
  const fileExt = file.name.includes('.') ? file.name.substring(file.name.lastIndexOf('.')) : '';
  const baseName = file.name.includes('.') ? file.name.substring(0, file.name.lastIndexOf('.')) : file.name;
  
  // Sanitize base name to allow only ASCII alphanumeric characters, hyphens, and underscores
  const sanitizedBase = baseName
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');

  const safeExtension = fileExt.toLowerCase().replace(/[^a-z0-9.]/g, '');
  const fileName = `${Date.now()}_${sanitizedBase || 'asset'}${safeExtension || '.png'}`;
  const filePath = `${folder}/${fileName}`;

  const { error } = await supabase.storage.from(storageBucket).upload(filePath, file, {
    upsert: true,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(storageBucket).getPublicUrl(filePath);
  if (!data?.publicUrl) {
    throw new Error('Unable to get public URL for uploaded file.');
  }

  return { path: filePath, url: data.publicUrl };
};

export const deleteMedia = async (path: string) => {
  const { error } = await supabase.storage.from(storageBucket).remove([path]);
  if (error) throw error;
};

// Mappers for snake_case (DB) <-> camelCase (App)
const mapCourseFromDB = (row: any): Course => ({
  id: row.id,
  name: row.name || '',
  category: row.category || 'english',
  categoryLabel: row.category_label || row.categoryLabel || '',
  description: row.description || '',
  fullDescription: row.full_description || row.fullDescription || '',
  duration: row.duration || '',
  lessonsPerWeek: row.lessons_per_week || row.lessonsPerWeek || '',
  level: row.level || '',
  badge: row.badge || '',
  price: row.price || '',
  pricePeriod: row.price_period || row.pricePeriod || '',
  teacherId: row.teacher_id || row.teacherId || '',
  teacherName: row.teacher_name || row.teacherName || '',
  teacherRole: row.teacher_role || row.teacherRole || '',
  teacherAvatar: row.teacher_avatar || row.teacherAvatar || '',
  image: row.image || '',
  syllabus: Array.isArray(row.syllabus) ? row.syllabus : [],
  features: Array.isArray(row.features) ? row.features : [],
});

const mapCourseToDB = (item: Partial<Course>): any => {
  const payload: any = { ...item };
  if (item.categoryLabel !== undefined) payload.category_label = item.categoryLabel || '';
  if (item.fullDescription !== undefined) payload.full_description = item.fullDescription || '';
  if (item.lessonsPerWeek !== undefined) payload.lessons_per_week = item.lessonsPerWeek || '';
  if (item.pricePeriod !== undefined) payload.price_period = item.pricePeriod || '';
  if (item.teacherId !== undefined) {
    payload.teacher_id = (item.teacherId && item.teacherId.trim() !== '') ? item.teacherId : null;
  }
  if (item.teacherName !== undefined) payload.teacher_name = item.teacherName || '';
  if (item.teacherRole !== undefined) payload.teacher_role = item.teacherRole || '';
  if (item.teacherAvatar !== undefined) payload.teacher_avatar = item.teacherAvatar || '';

  delete payload.categoryLabel;
  delete payload.fullDescription;
  delete payload.lessonsPerWeek;
  delete payload.pricePeriod;
  delete payload.teacherId;
  delete payload.teacherName;
  delete payload.teacherRole;
  delete payload.teacherAvatar;

  // Ensure invalid UUIDs are converted to null
  if (payload.teacher_id === '' || payload.teacher_id === undefined) {
    payload.teacher_id = null;
  }

  return payload;
};

const mapTeacherFromDB = (row: any): Teacher => ({
  id: row.id,
  name: row.name || '',
  position: row.position || '',
  experience: row.experience || '',
  specialization: row.specialization || '',
  certificates: Array.isArray(row.certificates) ? row.certificates : [],
  scoreBadge: row.score_badge || row.scoreBadge || '',
  photo: row.photo || '',
  bio: row.bio || '',
  education: row.education || '',
  socials: typeof row.socials === 'object' && row.socials !== null ? row.socials : {},
});

const mapTeacherToDB = (item: Partial<Teacher>): any => {
  const payload: any = { ...item };
  if (item.scoreBadge !== undefined) payload.score_badge = item.scoreBadge;
  delete payload.scoreBadge;
  return payload;
};

const mapGalleryFromDB = (row: any): GalleryItem => ({
  id: row.id,
  title: row.title || '',
  category: row.category || 'classrooms',
  image: row.image || '',
  type: row.type || 'image',
  videoUrl: row.video_url || row.videoUrl || '',
  date: row.date || '',
});

const mapGalleryToDB = (item: Partial<GalleryItem>): any => {
  const payload: any = { ...item };
  if (item.videoUrl !== undefined) payload.video_url = item.videoUrl;
  delete payload.videoUrl;
  return payload;
};

const mapNewsFromDB = (row: any): NewsArticle => ({
  id: row.id,
  title: row.title || '',
  summary: row.summary || '',
  content: row.content || '',
  date: row.date || '',
  category: row.category || 'Announcement',
  image: row.image || '',
  readTime: row.read_time || row.readTime || '',
});

const mapNewsToDB = (item: Partial<NewsArticle>): any => {
  const payload: any = { ...item };
  if (item.readTime !== undefined) payload.read_time = item.readTime;
  delete payload.readTime;
  return payload;
};

const mapTestimonialFromDB = (row: any): Testimonial => ({
  id: row.id,
  authorName: row.author_name || row.authorName || '',
  role: row.role || 'Student',
  course: row.course || '',
  avatar: row.avatar || '',
  rating: Number(row.rating) || 5,
  text: row.text || '',
  videoUrl: row.video_url || row.videoUrl || '',
  achievement: row.achievement || '',
});

const mapTestimonialToDB = (item: Partial<Testimonial>): any => {
  const payload: any = { ...item };
  if (item.authorName !== undefined) payload.author_name = item.authorName;
  if (item.videoUrl !== undefined) payload.video_url = item.videoUrl;
  delete payload.authorName;
  delete payload.videoUrl;
  return payload;
};

const mapResultFromDB = (row: any): StudentResult => ({
  id: row.id,
  studentName: row.student_name || row.studentName || '',
  photo: row.photo || '',
  score: row.score || '',
  testType: row.test_type || row.testType || 'IELTS',
  detailBadge: row.detail_badge || row.detailBadge || '',
  universityAdmitted: row.university_admitted || row.universityAdmitted || '',
  previousScore: row.previous_score || row.previousScore || '',
  durationInAcademy: row.duration_in_academy || row.durationInAcademy || '',
  quote: row.quote || '',
  courseTaken: row.course_taken || row.courseTaken || '',
});

const mapResultToDB = (item: Partial<StudentResult>): any => {
  const payload: any = { ...item };
  if (item.studentName !== undefined) payload.student_name = item.studentName;
  if (item.testType !== undefined) payload.test_type = item.testType;
  if (item.detailBadge !== undefined) payload.detail_badge = item.detailBadge;
  if (item.universityAdmitted !== undefined) payload.university_admitted = item.universityAdmitted;
  if (item.previousScore !== undefined) payload.previous_score = item.previousScore;
  if (item.durationInAcademy !== undefined) payload.duration_in_academy = item.durationInAcademy;
  if (item.courseTaken !== undefined) payload.course_taken = item.courseTaken;
  delete payload.studentName;
  delete payload.testType;
  delete payload.detailBadge;
  delete payload.universityAdmitted;
  delete payload.previousScore;
  delete payload.durationInAcademy;
  delete payload.courseTaken;
  return payload;
};

// Fetchers
export const fetchCourses = async () => {
  const { data, error } = await supabase.from('courses').select('*').order('name');
  parseError(error);
  return (data ?? []).map(mapCourseFromDB);
};

export const fetchTeachers = async () => {
  const { data, error } = await supabase.from('teachers').select('*').order('name');
  parseError(error);
  return (data ?? []).map(mapTeacherFromDB);
};

export const fetchGalleryItems = async () => {
  const { data, error } = await supabase.from('gallery_items').select('*').order('date', { ascending: false });
  parseError(error);
  return (data ?? []).map(mapGalleryFromDB);
};

export const fetchNewsArticles = async () => {
  const { data, error } = await supabase.from('news_articles').select('*').order('date', { ascending: false });
  parseError(error);
  return (data ?? []).map(mapNewsFromDB);
};

export const fetchFaqs = async () => {
  const { data, error } = await supabase.from('faqs').select('*').order('question');
  parseError(error);
  return (data ?? []) as FAQItem[];
};

export const fetchBranches = async () => {
  const { data, error } = await supabase.from('branches').select('*').order('name');
  parseError(error);
  return (data ?? []) as Branch[];
};

export const fetchTestimonials = async () => {
  const { data, error } = await supabase.from('testimonials').select('*').order('author_name');
  parseError(error);
  return (data ?? []).map(mapTestimonialFromDB);
};

export const fetchResults = async () => {
  const { data, error } = await supabase.from('results').select('*').order('student_name');
  parseError(error);
  return (data ?? []).map(mapResultFromDB);
};

export const fetchContactRequests = async () => {
  const { data, error } = await supabase.from('contact_requests').select('*').order('created_at', { ascending: false });
  parseError(error);
  return data ?? [];
};

export const fetchRegistrations = async () => {
  const { data, error } = await supabase.from('registrations').select('*').order('created_at', { ascending: false });
  parseError(error);
  return data ?? [];
};

// CRUD Operations
export const createRegistration = async (payload: {
  full_name: string;
  phone: string;
  course_id?: string;
  course_name: string;
  branch_id?: string;
  branch_name: string;
  shift: string;
  target_goal: string;
}) => {
  const { error } = await supabase.from('registrations').insert([payload]);
  parseError(error);
};

export const updateRegistration = async (id: string, payload: any) => {
  const { error } = await supabase.from('registrations').update(payload).eq('id', id);
  parseError(error);
};

export const deleteRegistration = async (id: string) => {
  const { error } = await supabase.from('registrations').delete().eq('id', id);
  parseError(error);
};

export const createContactRequest = async (payload: {
  name: string;
  phone: string;
  course: string;
  branch: string;
  message: string;
}) => {
  const { error } = await supabase.from('contact_requests').insert([payload]);
  parseError(error);
};

export const updateContactRequest = async (id: string, payload: any) => {
  const { error } = await supabase.from('contact_requests').update(payload).eq('id', id);
  parseError(error);
};

export const deleteContactRequest = async (id: string) => {
  const { error } = await supabase.from('contact_requests').delete().eq('id', id);
  parseError(error);
};

export const subscribeNewsletter = async (email: string) => {
  const { error } = await supabase.from('newsletter_subscriptions').insert([{ email }]);
  parseError(error);
};

// Generic helper for table operations
export const createCourse = async (course: Partial<Course>) => {
  const payload = mapCourseToDB(course);
  const { error } = await supabase.from('courses').insert([payload]);
  parseError(error);
};

export const updateCourse = async (id: string, course: Partial<Course>) => {
  const payload = mapCourseToDB(course);
  const { error } = await supabase.from('courses').update(payload).eq('id', id);
  parseError(error);
};

export const deleteCourse = async (id: string) => {
  const { error } = await supabase.from('courses').delete().eq('id', id);
  parseError(error);
};

export const createTeacher = async (teacher: Partial<Teacher>) => {
  const payload = mapTeacherToDB(teacher);
  const { error } = await supabase.from('teachers').insert([payload]);
  parseError(error);
};

export const updateTeacher = async (id: string, teacher: Partial<Teacher>) => {
  const payload = mapTeacherToDB(teacher);
  const { error } = await supabase.from('teachers').update(payload).eq('id', id);
  parseError(error);
};

export const deleteTeacher = async (id: string) => {
  const { error } = await supabase.from('teachers').delete().eq('id', id);
  parseError(error);
};

export const createGalleryItem = async (item: Partial<GalleryItem>) => {
  const payload = mapGalleryToDB(item);
  const { error } = await supabase.from('gallery_items').insert([payload]);
  parseError(error);
};

export const updateGalleryItem = async (id: string, item: Partial<GalleryItem>) => {
  const payload = mapGalleryToDB(item);
  const { error } = await supabase.from('gallery_items').update(payload).eq('id', id);
  parseError(error);
};

export const deleteGalleryItem = async (id: string) => {
  const { error } = await supabase.from('gallery_items').delete().eq('id', id);
  parseError(error);
};

export const createNewsArticle = async (article: Partial<NewsArticle>) => {
  const payload = mapNewsToDB(article);
  const { error } = await supabase.from('news_articles').insert([payload]);
  parseError(error);
};

export const updateNewsArticle = async (id: string, article: Partial<NewsArticle>) => {
  const payload = mapNewsToDB(article);
  const { error } = await supabase.from('news_articles').update(payload).eq('id', id);
  parseError(error);
};

export const deleteNewsArticle = async (id: string) => {
  const { error } = await supabase.from('news_articles').delete().eq('id', id);
  parseError(error);
};

export const createFaq = async (faq: Partial<FAQItem>) => {
  const { error } = await supabase.from('faqs').insert([faq]);
  parseError(error);
};

export const updateFaq = async (id: string, faq: Partial<FAQItem>) => {
  const { error } = await supabase.from('faqs').update(faq).eq('id', id);
  parseError(error);
};

export const deleteFaq = async (id: string) => {
  const { error } = await supabase.from('faqs').delete().eq('id', id);
  parseError(error);
};

export const createBranch = async (branch: Partial<Branch>) => {
  const { error } = await supabase.from('branches').insert([branch]);
  parseError(error);
};

export const updateBranch = async (id: string, branch: Partial<Branch>) => {
  const { error } = await supabase.from('branches').update(branch).eq('id', id);
  parseError(error);
};

export const deleteBranch = async (id: string) => {
  const { error } = await supabase.from('branches').delete().eq('id', id);
  parseError(error);
};

export const createTestimonial = async (testimonial: Partial<Testimonial>) => {
  const payload = mapTestimonialToDB(testimonial);
  const { error } = await supabase.from('testimonials').insert([payload]);
  parseError(error);
};

export const updateTestimonial = async (id: string, testimonial: Partial<Testimonial>) => {
  const payload = mapTestimonialToDB(testimonial);
  const { error } = await supabase.from('testimonials').update(payload).eq('id', id);
  parseError(error);
};

export const deleteTestimonial = async (id: string) => {
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  parseError(error);
};

export const createResult = async (result: Partial<StudentResult>) => {
  const payload = mapResultToDB(result);
  const { error } = await supabase.from('results').insert([payload]);
  parseError(error);
};

export const updateResult = async (id: string, result: Partial<StudentResult>) => {
  const payload = mapResultToDB(result);
  const { error } = await supabase.from('results').update(payload).eq('id', id);
  parseError(error);
};

export const deleteResult = async (id: string) => {
  const { error } = await supabase.from('results').delete().eq('id', id);
  parseError(error);
};
