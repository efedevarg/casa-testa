-- Casa Testa — esquema inicial (catálogo público, sin auth)
-- Ejecutar en Supabase SQL Editor o con Supabase CLI: supabase db push

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- categories
-- ---------------------------------------------------------------------------
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create index categories_slug_idx on public.categories (slug);
create index categories_featured_idx on public.categories (featured) where featured = true;

-- ---------------------------------------------------------------------------
-- products
-- ---------------------------------------------------------------------------
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null,
  short_description text not null,
  price integer not null check (price >= 0),
  compare_at_price integer check (compare_at_price is null or compare_at_price >= 0),
  sku text not null unique,
  stock integer not null default 0 check (stock >= 0),
  featured boolean not null default false,
  category_id uuid not null references public.categories (id) on delete restrict,
  created_at timestamptz not null default now()
);

create index products_slug_idx on public.products (slug);
create index products_category_id_idx on public.products (category_id);
create index products_featured_idx on public.products (featured) where featured = true;

-- ---------------------------------------------------------------------------
-- product_images
-- ---------------------------------------------------------------------------
create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  image_url text not null,
  alt_text text not null,
  sort_order integer not null default 0
);

create index product_images_product_id_idx on public.product_images (product_id);
create unique index product_images_product_sort_idx on public.product_images (product_id, sort_order);

-- ---------------------------------------------------------------------------
-- pizzella_molds
-- ---------------------------------------------------------------------------
create table public.pizzella_molds (
  id uuid primary key default gen_random_uuid(),
  model_name text not null,
  slug text not null unique,
  description text not null,
  dimensions text,
  material text,
  price integer check (price is null or price >= 0),
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create index pizzella_molds_slug_idx on public.pizzella_molds (slug);

-- ---------------------------------------------------------------------------
-- pizzella_images
-- ---------------------------------------------------------------------------
create table public.pizzella_images (
  id uuid primary key default gen_random_uuid(),
  mold_id uuid not null references public.pizzella_molds (id) on delete cascade,
  image_url text not null,
  alt_text text not null
);

create index pizzella_images_mold_id_idx on public.pizzella_images (mold_id);

-- ---------------------------------------------------------------------------
-- repair_services
-- ---------------------------------------------------------------------------
create table public.repair_services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  featured boolean not null default false
);

create index repair_services_slug_idx on public.repair_services (slug);

-- ---------------------------------------------------------------------------
-- RLS: lectura pública (anon) — escritura solo vía service role / futuro admin
-- ---------------------------------------------------------------------------
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.pizzella_molds enable row level security;
alter table public.pizzella_images enable row level security;
alter table public.repair_services enable row level security;

create policy "categories_select_anon"
  on public.categories for select to anon, authenticated using (true);

create policy "products_select_anon"
  on public.products for select to anon, authenticated using (true);

create policy "product_images_select_anon"
  on public.product_images for select to anon, authenticated using (true);

create policy "pizzella_molds_select_anon"
  on public.pizzella_molds for select to anon, authenticated using (true);

create policy "pizzella_images_select_anon"
  on public.pizzella_images for select to anon, authenticated using (true);

create policy "repair_services_select_anon"
  on public.repair_services for select to anon, authenticated using (true);
