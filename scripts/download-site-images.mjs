/**
 * Descarga assets locales una sola vez (evita hotlinks rotos de Unsplash).
 * Ejecutar desde la raíz: node scripts/download-site-images.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");

const q = "auto=format&fit=crop&q=85";
const u = (id, w) =>
  `https://images.unsplash.com/photo-${id}?${q}&w=${w}`;

/** Solo IDs verificados (HEAD/GET 200) para evitar 404 en build/deploy */
const jobs = [
  ["public/images/hero/home-kitchen.jpg", u("1556911220-e15b29be8c8f", 1920)],
  ["public/images/pages/nosotros-hero.jpg", u("1414235077428-338989a2e8c0", 1920)],
  ["public/images/pages/nosotros-mesa.jpg", u("1504674900247-0877df9cc836", 1600)],
  ["public/images/pages/pizzellas-hero.jpg", u("1486427944299-d1955d23e34d", 1920)],
  ["public/images/pages/reparaciones.jpg", u("1542838132-92c53300491e", 1600)],
  ["public/images/pages/contacto.jpg", u("1528605248644-14dd04022da1", 1600)],
  ["public/images/home/pizzelle-feature.jpg", u("1509440159596-0249088772ff", 1600)],
  ["public/images/home/repairs-teaser.jpg", u("1604908176997-125f25cc6f3d", 1600)],
  ["public/images/categories/ollas.jpg", u("1604908176997-125f25cc6f3d", 1400)],
  ["public/images/categories/vajilla.jpg", u("1603199506016-b9a594b593c0", 1400)],
  ["public/images/categories/cocina.jpg", u("1556910103-1c02745aae4d", 1400)],
  ["public/images/categories/decoracion.jpg", u("1578662996442-48f60103fc96", 1400)],
  ["public/images/categories/pizzellas.jpg", u("1509440159596-0249088772ff", 1400)],
  ["public/images/categories/sartenes.jpg", u("1544986581-efac024faf62", 1400)],
  ["public/images/products/cast-iron-cocotte.jpg", u("1604908176997-125f25cc6f3d", 1200)],
  ["public/images/products/steel-pan-grill.jpg", u("1544986581-efac024faf62", 1200)],
  ["public/images/products/ceramic-dinnerware.jpg", u("1603199506016-b9a594b593c0", 1200)],
  ["public/images/products/espresso-cups.jpg", u("1514228742587-6b1558fcca3d", 1200)],
  ["public/images/products/terracotta-casserole.jpg", u("1547592166-23ac45744acd", 1200)],
  ["public/images/products/artisan-plate.jpg", u("1576045057995-568f588f82fb", 1200)],
  ["public/images/products/whisk-utensils.jpg", u("1590794056226-79ef3a8147e1", 1200)],
  ["public/images/products/wood-board-spread.jpg", u("1504674900247-0877df9cc836", 1200)],
  ["public/images/products/pepper-mill-walnut.jpg", u("1596040033229-a9821ebd058d", 1200)],
  ["public/images/products/waffle-press.jpg", u("1555507036-ab1f4038808a", 1200)],
  ["public/images/products/golden-bread.jpg", u("1509440159596-0249088772ff", 1200)],
  ["public/images/products/dough-bench.jpg", u("1615937657715-bc7b4b7962c1", 1200)],
  ["public/images/products/bakery-racks.jpg", u("1486427944299-d1955d23e34d", 1200)],
  ["public/images/products/pastry-table.jpg", u("1517248135467-4c7edcad34c4", 1200)],
  ["public/images/products/kitchen-counter.jpg", u("1556910103-1c02745aae4d", 1200)],
  ["public/images/products/copper-still-life.jpg", u("1522335789203-aabd1fc54bc9", 1200)],
];

for (const [rel, url] of jobs) {
  const out = join(root, rel);
  await mkdir(dirname(out), { recursive: true });
  const res = await fetch(url, {
    headers: {
      Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      "User-Agent": "CasaTestaAssetBot/1.0",
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(out, buf);
  console.log("ok", rel, buf.length);
}
