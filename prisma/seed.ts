import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Crear categorías
  const terror = await prisma.category.upsert({
    where: { name: "Terror" },
    update: {},
    create: { name: "Terror" },
  });

  const comedy = await prisma.category.upsert({
    where: { name: "Comedia" },
    update: {},
    create: { name: "Comedia" },
  });

  const suspenso = await prisma.category.upsert({
    where: { name: "Suspenso" },
    update: {},
    create: { name: "Suspenso" },
  });

  const drama = await prisma.category.upsert({
    where: { name: "Drama" },
    update: {},
    create: { name: "Drama" },
  });

  const user1 = await prisma.user.upsert({
    where: { email: "jfelipemendez2103@gmail.com" },
    update: {},
    create: {
      name: "Juan Mendez",
      email: "jfelipemendez2103@gmail.com",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "alex18@hotmail.com" },
    update: {},
    create: {
      name: "Alex Pinzon",
      email: "alex18@hotmail.com",
    },
  });

  // Crear películas
  const movies = await prisma.movie.createMany({
    data: [
      {
        title: "Mad Max: Fury Road",
        description: "En un futuro post-apocalíptico, Max une fuerzas con Furiosa.",
        premiereDate: new Date("2025-09-15"),
        categoryId: terror.id,
      },
      {
        title: "Superbad",
        description: "Dos amigos intentan disfrutar de una fiesta antes de la universidad.",
        premiereDate: new Date("2007-08-17"),
        categoryId: comedy.id,
      },
      {
        title: "El Conjuro",
        description: "Investigadores paranormales ayudan a una familia aterrorizada.",
        premiereDate: new Date("2013-07-19"),
        categoryId: terror.id,
      },
      {
        title: "Shutter Island",
        description: "Un marshal investiga la desaparición de una paciente en un hospital psiquiátrico.",
        premiereDate: new Date("2010-02-19"),
        categoryId: suspenso.id,
      },
      {
        title: "The Pursuit of Happyness",
        description: "Un hombre lucha por sobrevivir y criar a su hijo.",
        premiereDate: new Date("2006-12-15"),
        categoryId: drama.id,
      },
    ],
  });

  console.log(`Películas creadas: ${movies.count}`);

  // Asignar películas vistas a usuarios
  const madMax = await prisma.movie.findFirst({ where: { title: "Mad Max: Fury Road" } });
  const superbad = await prisma.movie.findFirst({ where: { title: "Superbad" } });

  if (madMax && superbad) {
    await prisma.userWatchedMovie.createMany({
      data: [
        {
          userId: user1.id,
          movieId: madMax.id,
          watchedAt: new Date(),
        },
        {
          userId: user1.id,
          movieId: superbad.id,
          watchedAt: new Date(),
        },
        {
          userId: user2.id,
          movieId: superbad.id,
          watchedAt: new Date(),
        },
      ],
    });
  }
}

main()
  .then(async () => {
    console.log("Categorías, usuarios, películas y relaciones cargadas satisfactoriamente!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error en el seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
