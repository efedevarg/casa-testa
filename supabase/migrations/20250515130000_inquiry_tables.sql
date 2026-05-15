-- Consultas de contacto y reparación (solo inserción pública, sin panel admin aún)

create table public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  topic text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table public.repair_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  piece_description text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index contact_inquiries_created_at_idx on public.contact_inquiries (created_at desc);
create index repair_inquiries_created_at_idx on public.repair_inquiries (created_at desc);

alter table public.contact_inquiries enable row level security;
alter table public.repair_inquiries enable row level security;

create policy "contact_inquiries_insert_anon"
  on public.contact_inquiries for insert to anon, authenticated
  with check (true);

create policy "repair_inquiries_insert_anon"
  on public.repair_inquiries for insert to anon, authenticated
  with check (true);
