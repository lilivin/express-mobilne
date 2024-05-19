import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ActorService } from './actor.service';
import { Actors } from './actors';
import { Actor } from './actor';
import { ApiTags } from '@nestjs/swagger';
import { Films } from 'src/film/films';

@ApiTags('Actor')
@Controller('actor')
export class ActorController {
    constructor(private readonly actorService: ActorService) {}

    @Get()
    async index(): Promise<Actors>{
        return this.actorService.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: string): Promise<Actors> {
        return this.actorService.find(id);
    }

    @Get(':id/films')
    async findFilms(@Param('id') id: string): Promise<Films> {
        return this.actorService.findFilms(id);
    }

    @Post()
    create(@Body() actor: Actor) {
        this.actorService.create(actor);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        this.actorService.delete(id);
    }

    @Put()
    put(@Body() actor: Actor) {
        this.actorService.put(actor);
    }
}
