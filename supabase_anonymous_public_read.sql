-- Enable row level security on the site content tables
alter table if exists public.routes enable row level security;
alter table if exists public.departures enable row level security;
alter table if exists public.partners enable row level security;
alter table if exists public.blog_posts enable row level security;
alter table if exists public.faqs enable row level security;

-- Drop old policy if it exists
 drop policy if exists "Public can read routes" on public.routes;
 drop policy if exists "Public can read departures" on public.departures;
 drop policy if exists "Public can read partners" on public.partners;
 drop policy if exists "Public can read blog_posts" on public.blog_posts;
 drop policy if exists "Public can read faqs" on public.faqs;

-- Allow anonymous users to read public content
create policy "Public can read routes"
on public.routes
for select
using (true);

create policy "Public can read departures"
on public.departures
for select
using (true);

create policy "Public can read partners"
on public.partners
for select
using (true);

create policy "Public can read blog_posts"
on public.blog_posts
for select
using (true);

create policy "Public can read faqs"
on public.faqs
for select
using (true);
