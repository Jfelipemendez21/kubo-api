import prisma from "../../config/database";
import { ApiError } from "../../utils/apiError";
import { CreateMovieDto, UpdateMovieDto, MovieResponse } from "./movie.types";

export const moviesService = {
    
  async findAll(filters: { [key: string]: any }): Promise<MovieResponse[]> {
    const limit = filters.limit ? filters.limit : 10  
    const page = filters.page ? filters.page : 1
    const skip = limit * (page - 1) 
    let where : { [key: string]: any } = {} 

    if(filters.category){ 
      const category = filters.category.toString().toLowerCase();
      where.category = {
        name: {
          equals: category,
          mode: "insensitive"
        }
      }
    }
    if(filters.title){
      const title = filters.title.toString().toLowerCase();
      where.title = {
          contains: title,
          mode: "insensitive",
      };
    }
    const order = filters.orderBy ? "desc" : "asc";
    const sortBy = filters.orderBy ? filters.orderBy : "id"

    return await prisma.movie.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: order
      },
      include: {
        category: true,
      },
    });
  },

  async getById(id: number): Promise<MovieResponse | null> {
    const movie = await prisma.movie.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
    return movie;
  },

  async create(data: CreateMovieDto): Promise<MovieResponse> {
    const movieExist = await prisma.movie.findFirst({
      where: {
        title: {
          equals: data.title,
          mode: "insensitive",
        },
      }
    })

    if(movieExist) throw new ApiError(409, `Ya existe una pelicula con el titulo ${movieExist.title}`)

    const categoryExists = await prisma.category.findUnique({
        where: { id: data.categoryId }
    });

    if (!categoryExists) {
        throw new ApiError(404,`Category not found with id ${data.categoryId}`);
    }

    return await prisma.movie.create({
      data: {
        ...data,
        premiereDate: new Date(data.premiereDate),
      },
      include: {
        category: true,
      },
    });
  },

  async update(id: number, data: UpdateMovieDto): Promise<MovieResponse> {
    if(data.categoryId){
        const categoryExists = await prisma.category.findUnique({
            where: { id: data.categoryId }
        });
    
        if (!categoryExists) {
            throw new ApiError(404, `Category not found with id ${data.categoryId}`);
        }
    }
    return await prisma.movie.update({
      where: { id },
      data: {
        ...data,
        ...(data.premiereDate && { premiereDate: new Date(data.premiereDate) }),
      },
      include: {
        category: true,
      },
    });
  },

  async getNewsMovies(): Promise<MovieResponse[]> {
    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);
    threeWeeksAgo.setHours(0, 0, 0, 0);

    return await prisma.movie.findMany({
      where: { premiereDate: {
        gte: threeWeeksAgo,
      },},
      include: {
        category: true,
      },
    });
  },

}