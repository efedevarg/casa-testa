-- Casa Testa — Storage buckets, site_content, categories.image_url

-- ---------------------------------------------------------------------------
-- categories.image_url
-- ---------------------------------------------------------------------------
alter table public.categories
  add column if not exists image_url text;

-- ---------------------------------------------------------------------------
-- site_content
-- ---------------------------------------------------------------------------
create table public.site_content (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text not null default '',
  description text,
  updated_at timestamptz not null default now()
);

create index site_content_key_idx on public.site_content (key);

create or replace function public.set_site_content_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger site_content_updated_at
  before update on public.site_content
  for each row
  execute function public.set_site_content_updated_at();

alter table public.site_content enable row level security;

create policy "site_content_select_anon"
  on public.site_content for select to anon, authenticated using (true);

-- Escritura vía service role (Server Actions admin) hasta panel con auth

-- ---------------------------------------------------------------------------
-- Storage buckets (públicos — lectura anon)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('products', 'products', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
  ('categories', 'categories', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
  ('pizzellas', 'pizzellas', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
  ('brand', 'brand', true, 2097152, array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
  ('site', 'site', true, 8388608, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Lectura pública por bucket
create policy "storage_public_read_products"
  on storage.objects for select to public
  using (bucket_id = 'products');

create policy "storage_public_read_categories"
  on storage.objects for select to public
  using (bucket_id = 'categories');

create policy "storage_public_read_pizzellas"
  on storage.objects for select to public
  using (bucket_id = 'pizzellas');

create policy "storage_public_read_brand"
  on storage.objects for select to public
  using (bucket_id = 'brand');

create policy "storage_public_read_site"
  on storage.objects for select to public
  using (bucket_id = 'site');

-- Contenido inicial (textos + rutas de imagen; /public o paths en bucket site/)
insert into public.site_content (key, value, description) values
  ('hero_eyebrow', 'Casa Testa · Caseros', 'Hero — línea superior'),
  ('hero_title', 'Cocina italiana, elegida pieza por pieza', 'Hero — título principal'),
  ('hero_subtitle', 'En Av. San Martín elegimos ollas, sartenes, vajilla y moldes con el criterio de quien cocina en casa: materiales nobles, gesto lento y un taller que restaura lo que ya tiene historia.', 'Hero — subtítulo'),
  ('hero_cta', 'Ver selección', 'Hero — texto botón principal'),
  ('hero_image_url', '/images/hero/home-kitchen.jpg', 'Hero — imagen (path /public o Storage site/)'),
  ('hero_image_alt', 'Cocina luminosa con ingredientes frescos y gesto hogareño', 'Hero — alt imagen'),
  ('curaduria_title', 'Seis maneras de habitar la cocina', 'Home curaduría — título'),
  ('curaduria_subtitle', 'Elegimos por familia, no por volumen: piezas que se sienten en la mano, duran en el tiempo y tienen historia que contar en el salón.', 'Home curaduría — descripción'),
  ('home_pizzelle_title', 'El crujido que heredás sin saber de quién', 'Home pizzellas — título'),
  ('home_pizzelle_description', 'Moldes con peso real, hierro curado y gres esmaltado. Te ayudamos a elegir según tu fogón y tu impasto.', 'Home pizzellas — descripción'),
  ('home_pizzelle_image_url', '/images/home/pizzelle-feature.jpg', 'Home pizzellas — imagen'),
  ('home_pizzelle_image_alt', 'Pan artesanal dorado en ambiente cálido', 'Home pizzellas — alt'),
  ('home_repairs_image_url', '/images/home/repairs-teaser.jpg', 'Home reparaciones — imagen'),
  ('home_repairs_image_alt', 'Hierro fundido y piezas de cocina con carácter', 'Home reparaciones — alt'),
  ('reparaciones_intro', 'No acumulamos pedidos sin criterio: miramos la pieza, escuchamos la historia y decidimos juntos si vale la pena intervenir. Cuando decimos que sí, trabajamos con tiempo, diagnóstico claro y manos que conocen el oficio.', 'Página reparaciones — intro'),
  ('reparaciones_image_url', '/images/pages/reparaciones.jpg', 'Página reparaciones — imagen'),
  ('reparaciones_image_alt', 'Detalle de cocina con utensilios nobles y metal cuidado', 'Página reparaciones — alt'),
  ('pizzellas_intro', 'Moldes artesanales con relieve clásico, hierro curado y gres que respetan el fuego lento. Elegimos cada pieza en el salón para que el ritual de la merienda tenga el peso y el aroma que merece.', 'Página pizzellas — intro'),
  ('pizzellas_hero_image_url', '/images/pages/pizzellas-hero.jpg', 'Página pizzellas — hero imagen'),
  ('pizzellas_hero_image_alt', 'Panadería con dorados suaves y atmósfera de taller', 'Página pizzellas — alt'),
  ('about_intro', 'Casa Testa empezó como un gesto doméstico que fue creciendo: primero las ollas que curábamos para vecinos, después las pizzellas que salían a la merienda, después el deseo de elegir piezas con nombre propio y contar por qué estaban ahí.', 'Página nosotros — intro principal'),
  ('nosotros_hero_image_url', '/images/pages/nosotros-hero.jpg', 'Página nosotros — hero'),
  ('nosotros_hero_image_alt', 'Mesa servida con luz cálida, invitación a compartir', 'Página nosotros — alt hero'),
  ('contacto_image_url', '/images/pages/contacto.jpg', 'Página contacto — imagen'),
  ('contacto_image_alt', 'Personas compartiendo mesa y conversación', 'Página contacto — alt')
on conflict (key) do update set
  value = excluded.value,
  description = excluded.description,
  updated_at = now();
