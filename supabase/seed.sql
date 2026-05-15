-- Casa Testa — seed inicial (generado con scripts/generate-seed.mjs)
-- Ejecutar en SQL Editor después de la migración inicial

truncate table public.product_images, public.products, public.pizzella_images, public.pizzella_molds, public.repair_services, public.categories cascade;

insert into public.categories (id, name, slug, description, featured) values
  ('11111111-1111-4111-8111-000000000001', 'Ollas', 'ollas', 'Cocción lenta y aromas que vuelven a casa.', true),
  ('11111111-1111-4111-8111-000000000002', 'Sartenes', 'sartenes', 'Sellado preciso para el gesto diario.', true),
  ('11111111-1111-4111-8111-000000000003', 'Vajilla', 'vajilla', 'Mesas que invitan a quedarse un poco más.', true),
  ('11111111-1111-4111-8111-000000000004', 'Cocina', 'cocina', 'Herramientas nobles para el ritual cotidiano.', true),
  ('11111111-1111-4111-8111-000000000005', 'Decoración', 'decoracion', 'Detalles con presencia suave y carácter italiano.', false),
  ('11111111-1111-4111-8111-000000000006', 'Pizzellas', 'pizzellas', 'El crujido que hereda la nonna.', true);

insert into public.products (id, name, slug, description, short_description, price, compare_at_price, sku, stock, featured, category_id) values
  ('22222222-1111-4111-8111-000000000001', 'Cocotte Vicenza Crema', 'cocotte-vicenza-crema', 'Pensada para guisos que piden tiempo y para el horno que perfuma la casa entera. El esmalte crema amortigua la luz y el cuerpo retiene el calor con la calma de la cocina del norte de Italia.', 'Hierro fundido esmaltado: calor parejo, mesa serena.', 289500, 315000, 'CT-OLL-001', 4, true, '11111111-1111-4111-8111-000000000001'),
  ('22222222-1111-4111-8111-000000000002', 'Cazuela Modena Terra', 'cazuela-modena-terra', 'Borde generoso, tapa que pesa lo justo y un interior crema que no compite con los sabores. Ideal para pastas al horno, risottos finales y verduras que se doran sin prisa.', 'Terracota esmaltada para gratins y arroces lentos.', 92800, null, 'CT-OLL-002', 3, false, '11111111-1111-4111-8111-000000000001'),
  ('22222222-1111-4111-8111-000000000003', 'Olla a vapor Bergamo', 'olla-vapore-bergamo', 'Insertos perforados que respetan el vapor y los colores. Para pescados delicados, vegetales de huerta y ese menú liviano del mediodía que aún así huele a domingo.', 'Cocción en niveles: nutrientes que no se apuran.', 198400, null, 'CT-OLL-003', 2, false, '11111111-1111-4111-8111-000000000001'),
  ('22222222-1111-4111-8111-000000000004', 'Risottiera Parma Ramé', 'risottiera-parma-rame', 'El cobre responde al gesto del fuego y el interior estañado cuida el fondo sin dramas. Para risottos mantecosos y reducciones que piden atención, no afán.', 'Forma baja y amplia: el arroz abraza el calor.', 342900, null, 'CT-OLL-004', 2, false, '11111111-1111-4111-8111-000000000001'),
  ('22222222-1111-4111-8111-000000000005', 'Padella Riviera Lucida', 'padella-riviera-lucida', 'Curva amplia para pescados enteros y verduras que no se amontonan. El fondo retiene el calor y el borde alto contiene el aceite con elegancia.', 'Acero multicapa: sellado limpio, mantequilla feliz.', 138600, null, 'CT-SAR-001', 5, true, '11111111-1111-4111-8111-000000000002'),
  ('22222222-1111-4111-8111-000000000006', 'Grilliera Genova Bassa', 'grilliera-genova-bassa', 'Para carnes que merecen costra y verduras que quieren líneas de brasa sin mentir. El hierro pide curado y recompensa con sabor profundo.', 'Canales de jugo, marcas finas, carácter honesto.', 156200, null, 'CT-SAR-002', 3, false, '11111111-1111-4111-8111-000000000002'),
  ('22222222-1111-4111-8111-000000000007', 'Crêpiere Verona Seta', 'crepiere-verona-seta', 'Pensada para crespelle, filloas y esos bordes que se quiebran al primer mordisco. El mango largo aleja el calor y el peso equilibra el movimiento circular.', 'Superficie lisa para impastos finos y dorado uniforme.', 124900, null, 'CT-SAR-003', 4, false, '11111111-1111-4111-8111-000000000002'),
  ('22222222-1111-4111-8111-000000000008', 'Servizio Convivio Notte', 'servizio-convivio-notte', 'Plato hondo, plato playo y bowl con borde orgánico. Cada pieza varía levemente en el esmalte: es la firma del horno, no un defecto.', 'Gres reactivo: tonos profundos, tacto sedoso.', 118400, null, 'CT-VAJ-001', 6, true, '11111111-1111-4111-8111-000000000003'),
  ('22222222-1111-4111-8111-000000000009', 'Coppette Siena Miele', 'coppette-siena-miele', 'Para yogur matinal, helado de crema y frutas de estación. El borde ligeramente irregular invita a sostenerlas con las dos manos.', 'Tres alturas, un mismo abrazo de gres cálido.', 54600, null, 'CT-VAJ-002', 8, false, '11111111-1111-4111-8111-000000000003'),
  ('22222222-1111-4111-8111-000000000010', 'Tazze Espresso Orovelo', 'tazze-espresso-orovelo', 'Para el espresso corto que abre la mañana o cierra la cena. El borde fino guía el labio y el platillo recoge la gota que no quiere manchar el mantel.', 'Porcelana fina, asa delgada, silueta alta.', 32400, null, 'CT-VAJ-003', 12, false, '11111111-1111-4111-8111-000000000003'),
  ('22222222-1111-4111-8111-000000000011', 'Piatto Pasta Ancona', 'piatto-pasta-ancona', 'Pensado para tallarines, tagliatelle y salsas que merecen superficie. El esmalte satinado no grita: deja que el color del plato sea protagonista.', 'Hondo, ancho: el twirl del tenedor tiene espacio.', 21900, null, 'CT-VAJ-004', 10, false, '11111111-1111-4111-8111-000000000003'),
  ('22222222-1111-4111-8111-000000000012', 'Set Utensili Mantova', 'set-utensili-mantova', 'Cucharón, espumadera y cazo pequeño para reducciones. El cobre conduce con prontitud y el acero interior cuida los sabores delicados.', 'Cobre y acero: brillo cálido, gesto preciso.', 98500, null, 'CT-COC-001', 4, false, '11111111-1111-4111-8111-000000000004'),
  ('22222222-1111-4111-8111-000000000013', 'Macina Pepe Aosta', 'macina-pepe-aosta', 'La pimienta recién molida se adelanta al plato con aroma casi musical. El cuerpo pesa en la mano y el ajuste fino permite pasar del polvo nieve al grano valiente.', 'Núcleo cerámico, nogal templado, molienda ajustable.', 41200, null, 'CT-COC-002', 7, true, '11111111-1111-4111-8111-000000000004'),
  ('22222222-1111-4111-8111-000000000014', 'Frusta Como Nuvola', 'frusta-como-nuvola', 'Para salsas que piden constancia y claras que suben con orgullo. El equilibrio entre mango y varillas evita la muñeca tensa.', 'Acero 18/10 y mango de nogal: merengues sin fatiga.', 26800, null, 'CT-COC-003', 9, false, '11111111-1111-4111-8111-000000000004'),
  ('22222222-1111-4111-8111-000000000015', 'Vaso Nebbia Murano', 'vaso-nebbia-murano', 'Funciona con una rama sola o vacío, como escultura sobre la mesa baja. Los tonos lechosos dialogan con la terracota y el lino crudo del salón.', 'Vidrio grueso, luz que se detiene adentro.', 72300, null, 'CT-DEC-001', 3, false, '11111111-1111-4111-8111-000000000005'),
  ('22222222-1111-4111-8111-000000000016', 'Vassoio Rovere Valcamonica', 'vassoio-rovere-valcamonica', 'Para quesos curados, frutas de estación y pan que todavía habla del horno. Un objeto que mejora con el aceite de mantenimiento.', 'Roble europeo, bisel suave, vetas que cuentan.', 61500, null, 'CT-DEC-002', 5, false, '11111111-1111-4111-8111-000000000005'),
  ('22222222-1111-4111-8111-000000000017', 'Ferro Stella d''Abruzzo', 'ferro-stella-abruzzo', 'La stella se marca con claridad cuando el fuego está en su punto justo. Bisagra firme, mango largo y superficie que pide mantequilla clarificada.', 'Hierro fundido, relieve clásico, peso que guía.', 128900, null, 'CT-PIZ-001', 4, true, '11111111-1111-4111-8111-000000000006'),
  ('22222222-1111-4111-8111-000000000018', 'Doppio Ferro Ligure', 'doppio-ferro-ligure', 'Para cuando la mesa pide dos pizzellas a la vez y nadie quiere esperar el segundo round. El aluminio forjado distribuye el calor sin arrebatos.', 'Dos cavidades simétricas, ritmo de merienda familiar.', 149200, null, 'CT-PIZ-002', 3, false, '11111111-1111-4111-8111-000000000006');

insert into public.product_images (product_id, image_url, alt_text, sort_order) values
  ('22222222-1111-4111-8111-000000000001', '/images/products/cast-iron-cocotte.jpg', 'Cocotte de hierro fundido con tapa y asas metálicas', 0),
  ('22222222-1111-4111-8111-000000000002', '/images/products/terracotta-casserole.jpg', 'Cazuela de terracota con guiso dorado', 0),
  ('22222222-1111-4111-8111-000000000003', '/images/products/kitchen-counter.jpg', 'Encimera con olla de acero y utensilios ordenados', 0),
  ('22222222-1111-4111-8111-000000000004', '/images/products/copper-still-life.jpg', 'Cacerola de cobre con asas laterales', 0),
  ('22222222-1111-4111-8111-000000000005', '/images/products/steel-pan-grill.jpg', 'Sartén de acero con superficie de cocción amplia', 0),
  ('22222222-1111-4111-8111-000000000006', '/images/products/steel-pan-grill.jpg', 'Plancha grill con marcas de cocción uniformes', 0),
  ('22222222-1111-4111-8111-000000000007', '/images/products/steel-pan-grill.jpg', 'Sartén baja de acero con mango ergonómico', 0),
  ('22222222-1111-4111-8111-000000000008', '/images/products/ceramic-dinnerware.jpg', 'Vajilla de gres en tonos arena y grafito', 0),
  ('22222222-1111-4111-8111-000000000009', '/images/products/ceramic-dinnerware.jpg', 'Bowls de cerámica apilados con tonos tierra', 0),
  ('22222222-1111-4111-8111-000000000010', '/images/products/espresso-cups.jpg', 'Tazas de espresso sobre platillo de porcelana', 0),
  ('22222222-1111-4111-8111-000000000011', '/images/products/artisan-plate.jpg', 'Plato hondo de cerámica artesanal', 0),
  ('22222222-1111-4111-8111-000000000012', '/images/products/copper-still-life.jpg', 'Utensilios de cobre y acero dispuestos en mesada', 0),
  ('22222222-1111-4111-8111-000000000013', '/images/products/pepper-mill-walnut.jpg', 'Molinillo de pimienta de madera noble', 0),
  ('22222222-1111-4111-8111-000000000014', '/images/products/whisk-utensils.jpg', 'Batidor de varillas y utensilios sobre mesada', 0),
  ('22222222-1111-4111-8111-000000000015', '/images/products/pastry-table.jpg', 'Mesa con pastelería y objetos de vidrio suave', 0),
  ('22222222-1111-4111-8111-000000000016', '/images/products/wood-board-spread.jpg', 'Tabla de roble con pan y quesos', 0),
  ('22222222-1111-4111-8111-000000000017', '/images/products/waffle-press.jpg', 'Prensa de hierro para masa fina en cocina luminosa', 0),
  ('22222222-1111-4111-8111-000000000018', '/images/products/golden-bread.jpg', 'Pan dorado y textura crocante sobre tabla', 0);

insert into public.pizzella_molds (id, model_name, slug, description, dimensions, material, price, featured) values
  ('33333333-1111-4111-8111-000000000001', 'Ferro della Nonna', 'ferro-della-nonna', 'Hierro fundido, peso honesto, dorado profundo.

El hierro guarda memoria de fuego lento. Cada pizzella sale con borde crocante y corazón tierno, como cuando la casa entera esperaba el olor antes de ver la mesa.

Calor: Gas, horno, inducción con difusor', '12 cm', 'Hierro fundido curado', 128900, true),
  ('33333333-1111-4111-8111-000000000002', 'Ceramica Ligure', 'ceramica-ligure', 'Gres esmaltado, tacto cálido, dorado suave.

Para impastos delicados y rellenos dulces que no piden costra agresiva. El esmalto crema guía el desmoldado sin ansiedad.

Calor: Placa eléctrica, horno', '11 cm', 'Gres esmaltado', 98500, false),
  ('33333333-1111-4111-8111-000000000003', 'Doppio Tradizione', 'doppio-tradizione', 'Doble cavidad, ritmo de taller familiar.

Dos pizzellas en una sola pasada: misma temperatura, misma paciencia. Ideal cuando la mesa está llena de manos pequeñas.

Calor: Gas, vitrocerámica', '10 cm (×2)', 'Aluminio forjado', 149200, true),
  ('33333333-1111-4111-8111-000000000004', 'Bruno di Siena', 'bruno-di-siena', 'Textura viva, costra audaz, carácter sureño.

Exige mantequilla clarificada y mano firme. La recompensa es una costra profunda, casi canción.

Calor: Gas, leña', '13 cm', 'Hierro colado envejecido', 112500, false),
  ('33333333-1111-4111-8111-000000000005', 'Oro Puglia', 'oro-puglia', 'Borde bajo, impasto fino, bronce alimentario.

Pensado para rellenos dulces y meriendas que saben a confitería de pueblo.

Calor: Gas suave', '9,5 cm', 'Bronce alimentario', 134800, false),
  ('33333333-1111-4111-8111-000000000006', 'Neve Alpina', 'neve-alpina', 'Acero pulido, línea limpia, cocina contemporánea.

Para cocinas actuales que no renuncian al ritual. Limpieza sencilla, resultado consistente.

Calor: Inducción, vitro', '11,5 cm', 'Acero inoxidable 18/10', 118600, false);

insert into public.pizzella_images (mold_id, image_url, alt_text) values
  ('33333333-1111-4111-8111-000000000001', '/images/products/golden-bread.jpg', 'Pan artesanal dorado sobre tabla de madera'),
  ('33333333-1111-4111-8111-000000000002', '/images/products/dough-bench.jpg', 'Masa trabajada sobre mesada con harina y luz lateral'),
  ('33333333-1111-4111-8111-000000000003', '/images/products/waffle-press.jpg', 'Prensa de cocina y preparación artesanal'),
  ('33333333-1111-4111-8111-000000000004', '/images/products/bakery-racks.jpg', 'Estantes de panadería con panes dorados'),
  ('33333333-1111-4111-8111-000000000005', '/images/products/pastry-table.jpg', 'Mesa de pastelería con mármol y detalles delicados'),
  ('33333333-1111-4111-8111-000000000006', '/images/products/kitchen-counter.jpg', 'Cocina moderna con utensilios metálicos ordenados');

insert into public.repair_services (id, title, slug, description, featured) values
  ('44444444-1111-4111-8111-000000000001', 'Ollas y cacerolas', 'ollas-cacerolas', 'Soldaduras fatigadas, mangos que bailan, tapas que ya no sellan y esmaltes lastimados. Evaluamos el hierro con lupa y proponemos una solución digna de otra década en tu cocina.', true),
  ('44444444-1111-4111-8111-000000000002', 'Sartenes y planchas', 'sartenes-planchas', 'Fondos combados, curado de hierro a recuperar y superficies que perdieron la danza del calor. Restauramos la geometría para que vuelva a sellar con precisión.', true),
  ('44444444-1111-4111-8111-000000000003', 'Moldes para pizzellas', 'moldes-pizzellas', 'Bisagras cansadas, relieve desgastado o calor desparejo entre mitades. Tratamos cada molde como herencia: ajustamos, alineamos y devolvemos el ritual.', true),
  ('44444444-1111-4111-8111-000000000004', 'Vajilla y gres de mesa', 'vajilla-gres', 'Microfisuras, chips en el borde o líneas de cocción que cambiaron el carácter. Distinguimos lo estético de lo estructural y te contamos la verdad con tacto.', false),
  ('44444444-1111-4111-8111-000000000005', 'Cuchillería y afilado', 'cuchilleria-afilado', 'Filos desdibujados, cabos descosidos o balance que ya no acompaña el gesto. Recuperamos el peso justo entre mango y hoja.', false);
