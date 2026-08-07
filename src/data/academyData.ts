import { Course, Teacher, StudentResult, GalleryItem, Testimonial, NewsArticle, FAQItem, Branch, LevelTestQuestion } from '../types';

export const TEACHERS: Teacher[] = [];
export const COURSES: Course[] = [];
export const GALLERY_ITEMS: GalleryItem[] = [];
export const NEWS_ARTICLES: NewsArticle[] = [];
export const FAQS: FAQItem[] = [];
export const BRANCHES: Branch[] = [];
export const TESTIMONIALS: Testimonial[] = [];
export const STUDENT_RESULTS: StudentResult[] = [];

export const LEVEL_TEST_QUESTIONS: LevelTestQuestion[] = [
  {
    id: 1,
    question: 'Choose the correct sentence to complete the idea:',
    options: [
      'If I will study hard, I will pass the exam.',
      'If I study hard, I will pass the exam.',
      'If I studied hard, I will pass the exam.',
      'If I would study hard, I pass the exam.'
    ],
    correctIndex: 1,
    explanation: 'First Conditional format: If + Present Simple, Will + Verb.'
  },
  {
    id: 2,
    question: 'Select the synonym for the word "RUDIMENTARY":',
    options: ['Elementary & Basic', 'Extremely Complex', 'Dangerous', 'Temporary'],
    correctIndex: 0,
    explanation: '"Rudimentary" means relating to basic facts or principles.'
  },
  {
    id: 3,
    question: 'By the time the professor arrived, the students _____ their presentation.',
    options: ['finished', 'have finished', 'had finished', 'were finishing'],
    correctIndex: 2,
    explanation: 'Past Perfect (had finished) is used for an action completed before another past event.'
  },
  {
    id: 4,
    question: 'In IELTS Writing Task 2, which connector best presents an opposing view?',
    options: ['Furthermore', 'Notwithstanding the fact that', 'Consequently', 'In addition'],
    correctIndex: 1,
    explanation: '"Notwithstanding the fact that" is a high-level academic concession transition.'
  },
  {
    id: 5,
    question: 'Which sentence has the correct punctuation and formal academic tone?',
    options: ['The results was surprising, it showed a big jump.', 'The results were surprising; they demonstrated a substantial increase.', 'The results were surprising, they demonstrated a big increase.', 'The results is surprising!'],
    correctIndex: 1,
    explanation: 'Correct subject-verb agreement (results were) and semicolon linking two independent clauses.'
  }
];
