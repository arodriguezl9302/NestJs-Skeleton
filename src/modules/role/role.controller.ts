import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';

@Controller('role')
export class RoleController {

    constructor(
        private readonly _roleService: RoleService
    ){}

    @Get()
    async getRoles(): Promise<Role[]> {

        const roles = await this._roleService.getAll();
        return roles;
    }

    @Get(':id')
    async getRole(@Param('id', ParseIntPipe) id: number): Promise<Role> {

        const role = this._roleService.getOne(id);
        return role;
    }

    @Post()
    async createRole(@Body() role: Role): Promise<Role> {

        const createdRole = this._roleService.create(role);
        return createdRole;
    }

    @Patch(':id')
    async updateRole(@Param('id', ParseIntPipe) id: number, @Body() role: Role): Promise<boolean> {

        const updatedRole = this._roleService.update(id,role);
        return true;
    }

    @Delete(':id')
    async deleteRole(@Param('id', ParseIntPipe) id: number): Promise<boolean> {

        await this._roleService.delete(id);
        return true
    }
}

