# Prueba Técnica - Desarrollador Backend  
**API REST con Node.js, Express y Prisma ORM**

---

## Visión General
Esta API permite gestionar una base de datos de **usuarios, películas y categorías**.  
El objetivo es cumplir con los requisitos de la prueba técnica:  
- Cargar categorías predefinidas (Terror, Suspenso, Drama, Comedia).  
- Crear y consultar películas con su categoría.  
- Filtrar películas por título, categoría y ordenar por estreno.  
- Paginar lista de peliculas 
- Permitir marcar películas como vistas por usuarios.  
- Consultar películas recientemente agregadas.

Hay otr grupo de endpoints fuera de los solicitados, los cuales nos aportan en lo siguiente:
- Listar y crear categorias
- Listar usuarios
- Obtener usuario por id  

---

## Tecnologías Utilizadas
- **Node.js (v18+)**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL**
- **TypeScript**
- **Vercel** (deploy)
- **Postman / Insomnia** (para pruebas)
- **dotenv** (manejo de variables de entorno)

---

## API en Producción
📍 **URL Base:**  
https://kubo-api-iota.vercel.app/api

---

## ⚙️ Instalación y Ejecución Local

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/Jfelipemendez21/kubo-api.git
cd kubo-api

2️⃣ Instalar dependencias
bash
npm install
3️⃣ Crear archivo .env
Copiar lo que esta a continuacion en el archivo .env para configurar la conexión a la base de datos local:

.env
DATABASE_URL=postgresql://postgres:posgre123@localhost:5432/kubo_db?schema=public&sslmode=disable
PORT=3003

4️⃣ Configurar la base de datos
Crear una base de datos en PostgreSQL llamada kubo_db.

sql
CREATE DATABASE kubo_db;

5️⃣ Ejecutar migraciones de Prisma
bash
npm prisma:migrate
Esto creará todas las tablas definidas en prisma/schema.prisma.

6️⃣ Ejecutar datos iniciales (seed)
Existen dos opciones:

✅ Opción A - Con comando seed (recomendado)
bash
npm prisma:seed
Esto insertará automáticamente las categorías, usuarios y películas base.

✅ Opción B - Con script SQL manual
Ejecutar manualmente el archivo seed.sql (incluido en el proyecto):

7️⃣ Levantar el servidor
bash
npm run dev
El servidor se ejecutará en:
http://localhost:3003/api