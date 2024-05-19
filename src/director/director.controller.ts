import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DirectorService } from './director.service';
import { Directors } from './directors';
import { Director } from './director';
import { Films } from 'src/film/films';

@ApiTags('Director')
@Controller('director')
export class DirectorController {
    constructor(private readonly directorService: DirectorService) {}

    @Get()
    async index(): Promise<Directors>{
        return this.directorService.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: string): Promise<Directors> {
        return this.directorService.find(id);
    }

    @Get(':id/films')
    async findFilms(@Param('id') id: string): Promise<Films> {
        return this.directorService.findFilms(id);
    }

    @Post()
    create(@Body() director: Director) {
        this.directorService.create(director);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        this.directorService.delete(id);
    }

    @Put()
    put(@Body() director: Director) {
        this.directorService.put(director);
    }
}
