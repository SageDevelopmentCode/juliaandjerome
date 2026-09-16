create policy "Authenticated users can read RSVPs"
  on public.rsvp_responses
  for select
  to authenticated
  using (true);
