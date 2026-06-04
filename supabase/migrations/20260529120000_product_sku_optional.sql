-- SKU opcional en productos (múltiples NULL permitidos en UNIQUE de Postgres)
alter table public.products
  alter column sku drop not null;

comment on column public.products.sku is 'Código interno opcional; único cuando está definido.';
