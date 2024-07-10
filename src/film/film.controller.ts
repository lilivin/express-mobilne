import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Films } from './films';
import { FilmService } from './film.service';
import { ApiTags } from '@nestjs/swagger';
import { Film, Review } from './film';
import { Actors } from 'src/actor/actors';
import { User } from 'src/user/user';

@ApiTags('Film')
@Controller('film')
export class FilmController {
    constructor(private readonly filmService: FilmService) {}

    @Get()
    async index(): Promise<Films>{
        return this.filmService.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: string): Promise<Films> {
        return this.filmService.find(id);
    }

    @Get(':id/actors')
    async findActors(@Param('id') id: string): Promise<Actors> {
        return this.filmService.findActors(id);
    }

    @Get(':id/reviews')
    async findReviews(@Param('id') id: string): Promise<any> {
        return this.filmService.findReviews(id);
    }

    @Post(':id/reviews')
    createReview(@Param('id') id: string, @Body() review: Review) {
        this.filmService.createReviews(id, review);
    }

    @Post()
    create(@Body() film: Film) {
        this.filmService.create(film);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        this.filmService.delete(id);
    }

    @Put()
    put(@Body() film: Film) {
        this.filmService.put(film);
    }
}
