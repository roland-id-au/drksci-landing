-- Create the collab_edits table
create table if not exists public.collab_edits (
  id uuid primary key default gen_random_uuid(),
  article_id text not null,
  username text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Enable Row Level Security
alter table public.collab_edits enable row level security;

-- Allow anyone to insert/select (public collaboration)
create policy "Allow public insert" on public.collab_edits
  for insert using (true);
create policy "Allow public select" on public.collab_edits
  for select using (true); 