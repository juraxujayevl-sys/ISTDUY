export interface Course {
  id: string;
  name: string;
  category: 'english' | 'prep' | 'tech' | 'design';
  categoryLabel: string;
  description: string;
  fullDescription: string;
  duration: string;
  lessonsPerWeek: string;
  level: string;
  badge?: string;
  price: string;
  pricePeriod: string;
  teacherId: string;
  teacherName: string;
  teacherRole: string;
  teacherAvatar: string;
  image: string;
  syllabus: { week: string; title: string; topics: string[] }[];
  features: string[];
}

export interface Teacher {
  id: string;
  name: string;
  position: string;
  experience: string;
  specialization: string;
  certificates: string[];
  scoreBadge?: string;
  photo: string;
  bio: string;
  education: string;
  socials: {
    instagram?: string;
    telegram?: string;
    linkedin?: string;
  };
}

export interface StudentResult {
  id: string;
  studentName: string;
  photo: string;
  score: string;
  testType: 'IELTS' | 'CEFR' | 'SAT' | 'University';
  detailBadge: string;
  universityAdmitted?: string;
  previousScore?: string;
  durationInAcademy: string;
  quote: string;
  courseTaken: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'classrooms' | 'graduation' | 'events' | 'activities';
  image: string;
  type: 'image' | 'video';
  videoUrl?: string;
  date: string;
}

export interface Testimonial {
  id: string;
  authorName: string;
  role: 'Student' | 'Parent' | 'Alumni';
  course: string;
  avatar: string;
  rating: number;
  text: string;
  videoUrl?: string;
  achievement?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: 'Announcement' | 'Event' | 'Blog' | 'Success';
  image: string;
  readTime: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Courses' | 'Payments' | 'Schedule';
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  metro: string;
  hours: string;
  coordinates: { lat: number; lng: number };
}

export interface LevelTestQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
