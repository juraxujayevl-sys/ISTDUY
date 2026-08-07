-- Supabase Schema for iStudy Academy

create extension if not exists "pgcrypto";

create table branches (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  phone text not null,
  metro text not null,
  hours text not null,
  coordinates jsonb not null default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table teachers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text not null,
  experience text not null,
  specialization text not null,
  certificates jsonb not null default '[]',
  score_badge text,
  photo text not null,
  bio text not null,
  education text not null,
  socials jsonb not null default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table courses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in ('english', 'prep', 'tech', 'design')),
  category_label text not null,
  description text not null,
  full_description text not null,
  duration text not null,
  lessons_per_week text not null,
  level text not null,
  badge text,
  price text not null,
  price_period text not null,
  teacher_id uuid references teachers(id) on delete set null,
  teacher_name text not null,
  teacher_role text not null,
  teacher_avatar text not null,
  image text not null,
  syllabus jsonb not null default '[]',
  features jsonb not null default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('classrooms', 'graduation', 'events', 'activities')),
  image text not null,
  type text not null check (type in ('image', 'video')),
  video_url text,
  date text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table news_articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null,
  content text not null,
  date text not null,
  category text not null check (category in ('Announcement', 'Event', 'Blog', 'Success')),
  image text not null,
  read_time text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text not null check (category in ('General', 'Courses', 'Payments', 'Schedule')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table testimonials (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  role text not null check (role in ('Student', 'Parent', 'Alumni')),
  course text not null,
  avatar text not null,
  rating integer not null check (rating between 1 and 5),
  text text not null,
  video_url text,
  achievement text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table results (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  photo text not null,
  score text not null,
  test_type text not null check (test_type in ('IELTS', 'CEFR', 'SAT', 'University')),
  detail_badge text not null,
  university_admitted text,
  previous_score text,
  duration_in_academy text not null,
  quote text not null,
  course_taken text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  course_id uuid,
  course_name text not null,
  branch_id uuid,
  branch_name text not null,
  shift text not null,
  target_goal text not null,
  created_at timestamptz default now()
);

create table contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  course text not null,
  branch text not null,
  message text,
  created_at timestamptz default now()
);

create table newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  subscribed_at timestamptz default now()
);
