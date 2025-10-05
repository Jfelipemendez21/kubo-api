import { PrismaClient } from '@prisma/client';
import { ApiError } from '../../utils/apiError';
import { CreateCategoryDto } from './category.types';

const prisma = new PrismaClient();

export class CategoryService {
  async getAll() {
    return await prisma.category.findMany();
  }

  async create(data: CreateCategoryDto) {
    const categoryExist = await prisma.category.findUnique({where: {name: data.name}})
    if (categoryExist){
        throw new ApiError(409, `La categoria con nombre ${data.name} ya existe`);
    }
    return await prisma.category.create({ data });
  }
}

export const categoryService = new CategoryService();
