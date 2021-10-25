import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';

import { MapperService } from '../../shared/mapper.service';

import { User } from './entities/user.entity';
import { UserDetails } from './entities/user.details.entity';
import { Role } from '../role/entities/role.entity';

import { UserRepository } from './repositories/user.repository';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
        private readonly _mapperService: MapperService
    ){}

    async getAll(): Promise<UserDto[]>{


        const users: User[] = await this._userRepository.find({
            where: {status: 'ACTIVE'}
        });

        return this._mapperService.mapCollection<User, UserDto>(users, new UserDto);
    }

    async getOne(id: number): Promise<UserDto>{

        if(!id){
            throw new BadRequestException('You have to send a valid id');
        }

        const user: User = await this._userRepository.findOne(id, {
            where: {status: 'ACTIVE'}
        });

        if(!user){
            throw new NotFoundException();
        }

        return this._mapperService.map<User, UserDto>(user, new UserDto);
    }

    async create(user: User): Promise<UserDto> {
        const detail = new UserDetails();
        user.detail = detail;

        const repo = getConnection().getRepository(Role);
        const defaultRole = await repo.findOne({ where : {name : 'GENERAL'}})

        user.roles = [defaultRole];

        const newUser = await this._userRepository.save(user);
        return this._mapperService.map<User, UserDto>(newUser, new UserDto);
    }

    async update(id: number, user: User): Promise<void> {
        await this._userRepository.update(id, user);
    }

    async delete(id: number): Promise<void> {

        const user: User = await this._userRepository.findOne(id, {
            where: {status: 'ACTIVE'}
        });

        if(!user){
            throw new NotFoundException();
        }

        await this._userRepository.update(id, {status: 'INACTIVE'});

    }
}
