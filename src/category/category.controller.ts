import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Categories } from './categories';
import { Category } from './category';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async index(): Promise<Categories>{
        return this.categoryService.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: string): Promise<Categories> {
        return this.categoryService.find(id);
    }

    @Get(':id/films')
    async findFilms(@Param('id') id: string): Promise<Categories> {
        return this.categoryService.findFilms(id);
    }

    @Post()
    create(@Body() category: Category) {
        this.categoryService.create(category);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        this.categoryService.delete(id);
    }

    @Put()
    put(@Body() category: Category) {
        this.categoryService.put(category);
    }
}
