import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Role } from '../role/entities/role.entity';

import { RoleRepository } from './repositories/role.repository';

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository,
    ){}

    async getAll(): Promise<Role[]>{


        const roles: Role[] = await this._roleRepository.find({
            where: {status: 'ACTIVE'}
        });

        return roles;
    }

    async getOne(id: number): Promise<Role>{

        if(!id){
            throw new BadRequestException('You have to send a valid id');
        }

        const role: Role = await this._roleRepository.findOne(id, {
            where: {status: 'ACTIVE'}
        });

        if(!role){
            throw new NotFoundException();
        }

        return role;
    }

    async create(role: Role): Promise<Role> {

        const newRole = await this._roleRepository.save(role);
        return newRole;
    }

    async update(id: number, role: Role): Promise<void> {
        await this._roleRepository.update(id, role);
    }

    async delete(id: number): Promise<void> {

        const role: Role = await this._roleRepository.findOne(id, {
            where: {status: 'ACTIVE'}
        });

        if(!role){
            throw new NotFoundException();
        }

        await this._roleRepository.update(id, {status: 'INACTIVE'});

    }
}

