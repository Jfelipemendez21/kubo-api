import { PrismaClient } from '@prisma/client';
import { CreateCategoryDto } from './category.types';

const prisma = new PrismaClient();

export class CategoryService {
  async getAll() {
    return await prisma.category.findMany();
  }

  async create(data: CreateCategoryDto) {
    return await prisma.category.create({ data });
  }
}

export const categoryService = new CategoryService();
