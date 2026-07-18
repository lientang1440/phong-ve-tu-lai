-- Sync legacy Supabase schema columns to the app's expected frontend field names
-- Run this in Supabase SQL Editor after the main schema has been created.

-- 1) routes: keep both historical and frontend-friendly names
alter table if exists public.routes
  add column if not exists image_url text,
  add column if not exists is_active boolean default true;

update public.routes
set image_url = image
where image_url is null and image is not null;

-- 2) departures: expose both legacy and frontend-friendly names
alter table if exists public.departures
  add column if not exists ferry_operator text,
  add column if not exists route_id uuid,
  add column if not exists departure_time text,
  add column if not exists price_label text,
  add column if not exists is_active boolean default true;

update public.departures
set ferry_operator = ferry_line,
    departure_time = departure_time,
    price_label = price_label
where ferry_operator is null and ferry_line is not null;

-- 3) partners: ensure image field matches the frontend loader
alter table if exists public.partners
  add column if not exists image_url text,
  add column if not exists is_active boolean default true;

update public.partners
set image_url = image_url
where image_url is null;

-- 4) blog_posts: align with frontend naming
alter table if exists public.blog_posts
  add column if not exists slug text,
  add column if not exists image_url text,
  add column if not exists publish_date text,
  add column if not exists read_time text,
  add column if not exists is_active boolean default true;

update public.blog_posts
set slug = id,
    image_url = image_url,
    publish_date = publish_date,
    read_time = read_time
where slug is null;

-- 5) faqs: no extra rename needed, but ensure visibility flag exists
alter table if exists public.faqs
  add column if not exists is_active boolean default true;

-- Optional: make table queries consistent with the app's expectations
-- all tables should remain readable by anonymous users
create policy if not exists "Public can read routes"
on public.routes
for select
using (true);

create policy if not exists "Public can read departures"
on public.departures
for select
using (true);

create policy if not exists "Public can read partners"
on public.partners
for select
using (true);

create policy if not exists "Public can read blog_posts"
on public.blog_posts
for select
using (true);

create policy if not exists "Public can read faqs"
on public.faqs
for select
using (true);
