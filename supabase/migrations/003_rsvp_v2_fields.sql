-- Soft RSVP v2: the seven questions from the redesigned site.
alter table public.rsvp_responses
  add column arrival text,
  add column travel_after text,
  add column dietary text,
  add column has_valid_passport boolean,
  add column passport_expiry text,
  add column questions text;

-- The v1 passport question is no longer asked; keep the column for existing rows.
alter table public.rsvp_responses
  alter column passport_expires_before_2028 drop not null;
