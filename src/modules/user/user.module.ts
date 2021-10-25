import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from '../../shared/shared.module';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repositories/user.repository';


@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        SharedModule
    ],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {}
