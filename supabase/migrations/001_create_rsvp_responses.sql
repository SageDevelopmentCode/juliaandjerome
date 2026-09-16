create table public.rsvp_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  passport_expires_before_2028 boolean not null,
  attending text not null check (attending in ('yes', 'maybe', 'no')),
  address text,
  note text
);

alter table public.rsvp_responses enable row level security;

create policy "Anyone can submit RSVP"
  on public.rsvp_responses
  for insert
  to anon, authenticated
  with check (true);
