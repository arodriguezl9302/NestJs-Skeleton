import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {

    constructor(
        private readonly _userService: UserService
    ){}

    @Get()
    async getUsers(): Promise<UserDto[]> {

        const users = await this._userService.getAll();
        return users;
    }

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {

        const user = this._userService.getOne(id);
        return user;
    }

    @Post()
    async createUser(@Body() user: User): Promise<UserDto> {

        const createdUser = this._userService.create(user);
        return createdUser;
    }

    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User): Promise<boolean> {

        const updatedUser = this._userService.update(id,user);
        return true;
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<boolean> {

        await this._userService.delete(id);
        return true
    }
}
