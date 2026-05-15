#!/usr/bin/env sh
# Regenera lib/supabase/database.types.ts desde el proyecto remoto.
# Requiere: supabase login && supabase link --project-ref TU_REF
set -e
supabase gen types typescript --linked > lib/supabase/database.types.ts
echo "Tipos escritos en lib/supabase/database.types.ts"
