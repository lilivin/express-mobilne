import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { Platforms } from './platforms';
import { Platform } from './platform';
import { ApiTags } from '@nestjs/swagger';
import { Films } from 'src/film/films';

@ApiTags('Platform')
@Controller('platform')
export class PlatformController {
    constructor(private readonly platformService: PlatformService) {}

    @Get()
    async index(): Promise<Platforms>{
        return this.platformService.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: string): Promise<Platforms> {
        return this.platformService.find(id);
    }

    @Get(':id/films')
    async findFilms(@Param('id') id: string): Promise<Films[]> {
        return this.platformService.findFilms(id);
    }

    @Post()
    create(@Body() platform: Platform) {
        this.platformService.create(platform);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        this.platformService.delete(id);
    }

    @Put()
    put(@Body() platform: Platform) {
        this.platformService.put(platform);
    }
}
