# API Kubo

# Link del repositorio

[GitHub - Jfelipemendez21/kubo-api](https://github.com/Jfelipemendez21/kubo-api.git)

---

# Categories

- **`[POST]` Category creation**
    
    
    | Description | Este endpoint **crea una nueva categoría** en la base de datos a partir de los datos recibidos. Recibe un objeto con la información de la categoría (por ejemplo, el nombre) y devuelve la categoría recién creada. |
    | --- | --- |
    | URL | /categories |
    
    ```json
    **Payload:
    {
      "name": "Suspenso"
    }
    ```
    
    - **✅ Response 200**
        
        ```jsx
        {
            "success": true,
            "content": {
                "id": 15,
                "name": "Suspenso"
            }
        }
        ```
        
    

---

- **`[GET]` Get all categories**
    
    
    | Description | Obtiene todas las categorias |
    | --- | --- |
    | URL | [/](https://jsonplaceholder.typicode.com/posts/1)categories |
    
    - **✅ Response 200**
        
        ```jsx
        {
            "success": true,
            "content": [
                {
                    "id": 9,
                    "name": "Terror"
                },
                {
                    "id": 10,
                    "name": "Comedia"
                },
                {
                    "id": 11,
                    "name": "Suspenso"
                },
                {
                    "id": 12,
                    "name": "Drama"
                },
                {
                    "id": 14,
                    "name": "Loquesea"
                }
            ]
        }
        ```
        
    

---

# Movies

- **`[POST]` Movie creation**
    
    
    | Description | Crea una nueva película en la base de datos. |
    | --- | --- |
    | URL | /movie |
    
    ```json
    **Payload:
    {
      "title": "Nueva Película",
      "description": "Descripción de la película",
      "premiereDate": "2025-10-04",
      "categoryId": 1
    }
    ```
    
    - **✅ Response 200**
        
        ```jsx
        {
            "success": true,
            "data": {
                "id": 7,
                "title": "Nueva Película",
                "description": "Descripción de la película",
                "premiereDate": "2025-10-04T00:00:00.000Z",
                "categoryId": 12,
                "createdAt": "2025-10-05T06:50:39.022Z",
                "updatedAt": "2025-10-05T06:50:39.022Z",
                "category": {
                    "id": 12,
                    "name": "Drama"
                }
            }
        }
        ```
        
    - **✅ Response 409**
        
        ```jsx
        {
            "success": false,
            "message": "Already exist one movie with the title Nueva Película"
        }
        ```
        
    - **✅ Response 404**
        
        ```jsx
        {
            "success": false,
            "message": "Category not found with id 1"
        }
        ```
        
    

---

- **`[GET]` Get all movies (optional filters)**
    
    
    | Description | Obtiene todas las películas de la base de datos, con la posibilidad de filtrar por título, categoría, paginación y orden por fecha de estreno. |
    | --- | --- |
    | Url | /movies |
    | Query Parameters (optional) | `title` → filtra por título de la película.`category` → filtra las peliculas por el nombre de una categoría.`page` → número de página para paginación.`limit` → cantidad de resultados por página.`orderBy=premiereDate`permite ordenar por `premiereDate` (fecha de estreno). |
    - **✅ Response 200**
        
        ```json
        {
          "success": true,
          "data": {
            "movies": [
              {
                "id": 1,
                "title": "Mad Max: Fury Road",
                "description": "En un futuro post-apocalíptico, Max une fuerzas con Furiosa.",
                "premiereDate": "2015-05-15T00:00:00.000Z",
                "categoryId": 1,
                "createdAt": "2025-10-05T04:09:46.741Z",
                "updatedAt": "2025-10-05T04:09:46.741Z",
                "category": {
                  "id": 1,
                  "name": "Terror"
                }
              },
              {
                "id": 2,
                "title": "Superbad",
                "description": "Dos amigos intentan disfrutar de una fiesta antes de la universidad.",
                "premiereDate": "2007-08-17T00:00:00.000Z",
                "categoryId": 2,
                "createdAt": "2025-10-05T04:09:46.741Z",
                "updatedAt": "2025-10-05T04:09:46.741Z",
                "category": {
                  "id": 2,
                  "name": "Comedia"
                }
              },
              {
                "id": 3,
                "title": "El Conjuro",
                "description": "Investigadores paranormales ayudan a una familia aterrorizada.",
                "premiereDate": "2013-07-19T00:00:00.000Z",
                "categoryId": 1,
                "createdAt": "2025-10-05T04:09:46.741Z",
                "updatedAt": "2025-10-05T04:09:46.741Z",
                "category": {
                  "id": 1,
                  "name": "Terror"
                }
              },
              {
                "id": 4,
                "title": "Shutter Island",
                "description": "Un marshal investiga la desaparición de una paciente en un hospital psiquiátrico.",
                "premiereDate": "2010-02-19T00:00:00.000Z",
                "categoryId": 3,
                "createdAt": "2025-10-05T04:09:46.741Z",
                "updatedAt": "2025-10-05T04:09:46.741Z",
                "category": {
                  "id": 3,
                  "name": "Suspenso"
                }
              },
              {
                "id": 5,
                "title": "The Pursuit of Happyness",
                "description": "Un hombre lucha por sobrevivir y criar a su hijo.",
                "premiereDate": "2006-12-15T00:00:00.000Z",
                "categoryId": 4,
                "createdAt": "2025-10-05T04:09:46.741Z",
                "updatedAt": "2025-10-05T04:09:46.741Z",
                "category": {
                  "id": 4,
                  "name": "Drama"
                }
              }
            ],
            "pagination": {
              "currentPage": 1,
              "limitPerPage": 10,
              "totalPages": 1,
              "totalMovies": 5
            }
          }
        }
        ```
        

---

- **`[GET]` Get one movie**
    
    
    | Description | Obtiene la información de una pelicula por su `id`. |
    | --- | --- |
    | Url | /movies/:id |
    - **✅ Response 200**
        
        ```jsx
        {
            "success": true,
            "data": {
                "id": 2,
                "title": "Mad Max: Fury Road",
                "description": "En un futuro post-apocalíptico, Max une fuerzas con Furiosa.",
                "premiereDate": "2015-05-15T00:00:00.000Z",
                "categoryId": 9,
                "createdAt": "2025-10-04T22:25:50.225Z",
                "updatedAt": "2025-10-04T22:25:50.225Z",
                "category": {
                    "id": 9,
                    "name": "Terror"
                }
            }
        }
        ```
        
    - **✅ Response 409**
        
        ```json
        {
            "success": false,
            "message": "The id should be a number"
        }
        ```
        

---

- **`[GET]` Get newly released movies (novedades)**
    
    
    | Description | Obtiene las películas más recientes con fecha de estreno no mayor a tres semanas. |
    | --- | --- |
    | Url | /movies/novedades/ |
    - **✅ Response 200**
        
        ```jsx
        {
            "success": true,
            "data": {
                "id": 2,
                "title": "Mad Max: Fury Road",
                "description": "En un futuro post-apocalíptico, Max une fuerzas con Furiosa.",
                "premiereDate": "2025-09-15T00:00:00.000Z",
                "categoryId": 9,
                "createdAt": "2025-10-04T22:25:50.225Z",
                "updatedAt": "2025-10-04T22:25:50.225Z",
                "category": {
                    "id": 9,
                    "name": "Terror"
                }
            }
        }
        ```
        

---

- **`[PATCH]` Update movie**
    
    
    | Description | Actualiza los datos de una película existente. |
    | --- | --- |
    | URL | /movies/:id |
    
    ```json
    **Payload:
    
    {
      "description": "Descripcion pelicula",
      "premiereDate": "2024-10-04",
      "categoryId": 1
    }
    ```
    
    - **✅ Response 200**
        
        ```jsx
        {
            "success": true,
            "data": {
                "id": 7,
                "title": "Nueva Película",
                "description": "Descripción película",
                "premiereDate": "2024-10-04T00:00:00.000Z",
                "categoryId": 12,
                "createdAt": "2025-10-05T06:50:39.022Z",
                "updatedAt": "2025-10-05T06:50:39.022Z",
                "category": {
                    "id": 1,
                    "name": "Fantasia"
                }
            }
        }
        ```
        
    - **✅ Response 404**
        
        ```jsx
        {
            "success": false,
            "message": "Category not found with id 1"
        }
        ```
        

---

---

# Users

- **`[POST]` User creation**
    
    
    | Description | Crea un nuevo usuario en la base de datos. |
    | --- | --- |
    | URL | /users |
    
    ```json
    **Payload:
    {
        "name": "Juan Mendez",
        "email": "loquesea@gmail.com"
    }
    ```
    
    - **✅ Response 200**
        
        ```jsx
        {
            "success": true,
            "content": {
                "id": 5,
                "name": "Juan Mendez",
                "email": "loquesea@gmail.com",
                "createdAt": "2025-10-05T07:13:16.806Z"
            }
        }
        ```
        
    - **✅ Response 409**
        
        ```jsx
        {
            "success": true,
            "message": "The user with email loquesea@gmail.com already exist"
        ```
        
    

---

- **`[POST]` User mark the movie like watched**
    
    
    | Description | Marca una película como vista por un usuario. Crea una relación entre el usuario y la película correspondiente. |
    | --- | --- |
    | URL | /users/:userId/movies/:movieId/watched |
    
    - **✅ Response 200**
        
        ```jsx
        {
            "success": true,
            "content": {
                "id": 4,
                "userId": 13,
                "movieId": 2,
                "watchedAt": "2025-10-05T07:19:58.107Z"
            }
        }
        ```
        
    - **✅ Response 404**
        
        ```jsx
        {
            "success": true,
            "message": "The movie with id 2 not exist"
        ```
        
    - **✅ Response 404**
        
        ```jsx
        {
            "success": true,
            "message": "The user with id 13 not exist"
        ```
        
    

---

- **`[GET]` Get all users**
    
    
    | Description | Obtiene la lista de todos los usuarios registrados y las peliculas vistas por cada uno |
    | --- | --- |
    | URL | [/](https://jsonplaceholder.typicode.com/posts/1)users |
    - **✅ Response 200**
        
        ```jsx
        {
            "success": true,
            "content": [
                {
                    "id": 3,
                    "name": "Juan Mendez",
                    "email": "jfelipemendez2103@gmail.com",
                    "createdAt": "2025-10-04T22:25:50.225Z",
                    "watched": [
                        {
                            "id": 1,
                            "userId": 3,
                            "movieId": 2,
                            "watchedAt": "2025-10-04T22:25:50.225Z",
                            "movie": {
                                "id": 2,
                                "title": "Loqueseaaa",
                                "description": "Descripción de la película",
                                "premiereDate": "2025-10-04T00:00:00.000Z",
                                "categoryId": 12,
                                "createdAt": "2025-10-04T22:25:50.225Z",
                                "updatedAt": "2025-10-05T07:01:42.495Z"
                            }
                        },
                        {
                            "id": 2,
                            "userId": 3,
                            "movieId": 3,
                            "watchedAt": "2025-10-04T22:25:50.225Z",
                            "movie": {
                                "id": 3,
                                "title": "Superbad",
                                "description": "Dos amigos intentan disfrutar de una fiesta antes de la universidad.",
                                "premiereDate": "2007-08-17T00:00:00.000Z",
                                "categoryId": 10,
                                "createdAt": "2025-10-04T22:25:50.225Z",
                                "updatedAt": "2025-10-04T22:25:50.225Z"
                            }
                        }
                    ]
                },
                {
                    "id": 4,
                    "name": "Alex Pinzon",
                    "email": "alex18@hotmail.com",
                    "createdAt": "2025-10-04T22:25:50.225Z",
                    "watched": [
                        {
                            "id": 3,
                            "userId": 4,
                            "movieId": 3,
                            "watchedAt": "2025-10-04T22:25:50.225Z",
                            "movie": {
                                "id": 3,
                                "title": "Superbad",
                                "description": "Dos amigos intentan disfrutar de una fiesta antes de la universidad.",
                                "premiereDate": "2007-08-17T00:00:00.000Z",
                                "categoryId": 10,
                                "createdAt": "2025-10-04T22:25:50.225Z",
                                "updatedAt": "2025-10-04T22:25:50.225Z"
                            }
                        }
                    ]
                }
            ]
        }
        ```
        
    

---

- **`[GET]` Get one user**
    
    
    | Description | Obtiene la información de un usuario por su `id`. |
    | --- | --- |
    | URL | /users/:id |
    - **✅ Response 200**
        
        ```jsx
        {
            "success": true,
            "content": [
                {
                    "id": 3,
                    "name": "Juan Mendez",
                    "email": "jfelipemendez2103@gmail.com",
                    "createdAt": "2025-10-04T22:25:50.225Z",
                    "watched": [
                        {
                            "id": 1,
                            "userId": 3,
                            "movieId": 2,
                            "watchedAt": "2025-10-04T22:25:50.225Z",
                            "movie": {
                                "id": 2,
                                "title": "Loqueseaaa",
                                "description": "Descripción de la película",
                                "premiereDate": "2025-10-04T00:00:00.000Z",
                                "categoryId": 12,
                                "createdAt": "2025-10-04T22:25:50.225Z",
                                "updatedAt": "2025-10-05T07:01:42.495Z"
                            }
                        },
                        {
                            "id": 2,
                            "userId": 3,
                            "movieId": 3,
                            "watchedAt": "2025-10-04T22:25:50.225Z",
                            "movie": {
                                "id": 3,
                                "title": "Superbad",
                                "description": "Dos amigos intentan disfrutar de una fiesta antes de la universidad.",
                                "premiereDate": "2007-08-17T00:00:00.000Z",
                                "categoryId": 10,
                                "createdAt": "2025-10-04T22:25:50.225Z",
                                "updatedAt": "2025-10-04T22:25:50.225Z"
                            }
                        }
                    ]
                }
            ]
        }
        ```
        
    - **✅ Response 409**
        
        ```jsx
        {
            "success": true,
            "message": "The id should be a number"
        ```
        

---

---