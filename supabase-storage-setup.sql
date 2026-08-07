 =========================================================
-- =========================================================
-- Supabase Storage & Updated Database Schema for iStudy
-- Run these queries in your Supabase SQL Editor
-- =========================================================

-- 1. Create Public Storage Bucket 'assets' for Media (Images, Videos, Avatars)
insert into storage.buckets (id, name, public)
values ('assets', 'assets', true)
on conflict (id) do update set public = true;

-- 2. Storage Bucket Security Policies (Allow Public Read, Insert, Update, Delete)
drop policy if exists "Public Access Assets" on storage.objects;
create policy "Public Access Assets" on storage.objects
  for select using (bucket_id = 'assets');

drop policy if exists "Public Insert Assets" on storage.objects;
create policy "Public Insert Assets" on storage.objects
  for insert with check (bucket_id = 'assets');

drop policy if exists "Public Update Assets" on storage.objects;
create policy "Public Update Assets" on storage.objects
  for update using (bucket_id = 'assets');

drop policy if exists "Public Delete Assets" on storage.objects;
create policy "Public Delete Assets" on storage.objects
  for delete using (bucket_id = 'assets');

-- 3. Ensure Table Columns Support Rich Media & Flexible Types
-- Alter tables if needed for optional nullability or extended text fields

alter table teachers alter column photo drop not null;
alter table courses alter column image drop not null;
alter table courses alter column teacher_id drop not null;
alter table courses alter column teacher_name drop not null;
alter table courses alter column teacher_role drop not null;
alter table courses alter column teacher_avatar drop not null;
alter table courses alter column category_label drop not null;
alter table courses alter column full_description drop not null;
alter table courses alter column lessons_per_week drop not null;
alter table courses alter column price_period drop not null;
alter table courses alter column badge drop not null;

alter table gallery_items alter column image drop not null;
alter table news_articles alter column image drop not null;
alter table testimonials alter column avatar drop not null;
alter table results alter column photo drop not null;

-- Enable Row Level Security (RLS) policies on all tables for public access (or anon access)
alter table branches enable row level security;
alter table teachers enable row level security;
alter table courses enable row level security;
alter table gallery_items enable row level security;
alter table news_articles enable row level security;
alter table faqs enable row level security;
alter table testimonials enable row level security;
alter table results enable row level security;
alter table registrations enable row level security;
alter table contact_requests enable row level security;

-- Create Permissive RLS Policies for Anon & Public Usage
do $$
declare
  t text;
begin
  for t in select table_name from information_schema.tables where table_schema = 'public' and table_type = 'BASE TABLE'
  loop
    execute format('drop policy if exists "Allow Public Access %I" on %I', t, t);
    execute format('create policy "Allow Public Access %I" on %I for all using (true) with check (true)', t, t);
  end loop;
end $$;
--