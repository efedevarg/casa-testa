-- Casa Testa — refinamientos operativos internos

-- Orden manual simple
alter table public.categories
  add column if not exists sort_order integer not null default 0;

alter table public.products
  add column if not exists sort_order integer not null default 0;

create index if not exists categories_sort_order_idx on public.categories (sort_order, created_at);
create index if not exists products_sort_order_idx on public.products (sort_order, created_at);

-- Workflow de consultas
alter table public.contact_inquiries
  add column if not exists status text not null default 'nueva'
  check (status in ('nueva', 'respondida', 'archivada'));

alter table public.repair_inquiries
  add column if not exists status text not null default 'nueva'
  check (status in ('nueva', 'respondida', 'archivada'));

alter table public.contact_inquiries
  add column if not exists phone text;

alter table public.repair_inquiries
  add column if not exists phone text;

create index if not exists contact_inquiries_status_created_idx
  on public.contact_inquiries (status, created_at desc);

create index if not exists repair_inquiries_status_created_idx
  on public.repair_inquiries (status, created_at desc);
