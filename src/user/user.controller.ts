import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserLogin } from './user';
import { Users } from './users';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async index(): Promise<Users>{
        return this.userService.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: string): Promise<Users> {
        return this.userService.find(id);
    }

    @Post()
    create(@Body() user: User) {
        this.userService.create(user);
    }

    @Post("/login")
    login(@Body() userLogin: UserLogin) {
        this.userService.login(userLogin.login, userLogin.password);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        this.userService.delete(id);
    }

    @Put()
    put(@Body() user: User) {
        this.userService.put(user);
    }
}
