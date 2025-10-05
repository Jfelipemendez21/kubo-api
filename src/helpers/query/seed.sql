-- Limpiar datos existentes (opcional)
-- TRUNCATE TABLE "UserWatchedMovie", "Movie", "User", "Category" CASCADE;

-- Insertar categorías (con UPSERT usando ON CONFLICT)
INSERT INTO "Category" (name)
VALUES 
  ('Terror'),
  ('Comedia'),
  ('Suspenso'),
  ('Drama')
ON CONFLICT (name) DO NOTHING;

-- Insertar usuarios
INSERT INTO "User" (name, email, "createdAt")
VALUES 
  ('Juan Mendez', 'jfelipemendez2103@gmail.com', NOW()),
  ('Alex Pinzon', 'alex18@hotmail.com', NOW())
ON CONFLICT (email) DO NOTHING;

-- Insertar películas
INSERT INTO "Movie" (title, description, "premiereDate", "categoryId", "createdAt", "updatedAt")
VALUES 
  (
    'Mad Max: Fury Road',
    'En un futuro post-apocalíptico, Max une fuerzas con Furiosa.',
    '2015-05-15',
    (SELECT id FROM "Category" WHERE name = 'Terror' LIMIT 1),
    NOW(),
    NOW()
  ),
  (
    'Superbad',
    'Dos amigos intentan disfrutar de una fiesta antes de la universidad.',
    '2007-08-17',
    (SELECT id FROM "Category" WHERE name = 'Comedia' LIMIT 1),
    NOW(),
    NOW()
  ),
  (
    'El Conjuro',
    'Investigadores paranormales ayudan a una familia aterrorizada.',
    '2013-07-19',
    (SELECT id FROM "Category" WHERE name = 'Terror' LIMIT 1),
    NOW(),
    NOW()
  ),
  (
    'Shutter Island',
    'Un marshal investiga la desaparición de una paciente en un hospital psiquiátrico.',
    '2010-02-19',
    (SELECT id FROM "Category" WHERE name = 'Suspenso' LIMIT 1),
    NOW(),
    NOW()
  ),
  (
    'The Pursuit of Happyness',
    'Un hombre lucha por sobrevivir y criar a su hijo.',
    '2006-12-15',
    (SELECT id FROM "Category" WHERE name = 'Drama' LIMIT 1),
    NOW(),
    NOW()
  )
ON CONFLICT (title) DO NOTHING;

-- Insertar relaciones de películas vistas
INSERT INTO "UserWatchedMovie" ("userId", "movieId", "watchedAt")
VALUES 
  (
    (SELECT id FROM "User" WHERE email = 'jfelipemendez2103@gmail.com' LIMIT 1),
    (SELECT id FROM "Movie" WHERE title = 'Mad Max: Fury Road' LIMIT 1),
    NOW()
  ),
  (
    (SELECT id FROM "User" WHERE email = 'jfelipemendez2103@gmail.com' LIMIT 1),
    (SELECT id FROM "Movie" WHERE title = 'Superbad' LIMIT 1),
    NOW()
  ),
  (
    (SELECT id FROM "User" WHERE email = 'alex18@hotmail.com' LIMIT 1),
    (SELECT id FROM "Movie" WHERE title = 'Superbad' LIMIT 1),
    NOW()
  )
ON CONFLICT DO NOTHING;

-- Verificar los datos insertados
SELECT 'Categorías insertadas:' as info, COUNT(*) as total FROM "Category";
SELECT 'Usuarios insertados:' as info, COUNT(*) as total FROM "User";
SELECT 'Películas insertadas:' as info, COUNT(*) as total FROM "Movie";
SELECT 'Relaciones insertadas:' as info, COUNT(*) as total FROM "UserWatchedMovie";
