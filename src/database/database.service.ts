import { TypeOrmModule } from '@nestjs/typeorm'
import { ConnectionOptions } from 'typeorm';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { Configuration } from '../config/config.keys';

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],

        async useFactory(config: ConfigService){
            return {

                type:     'mysql',
                host:     config.get(Configuration.DB_HOST),
                port:     parseInt(config.get(Configuration.DB_PORT)) || 3306,
                username: config.get(Configuration.DB_USERNAME),
                password: config.get(Configuration.DB_PASSWORD),
                database: config.get(Configuration.DB_DATABASE),
                //entities: [User, Role, UserDetails],
                entities: [__dirname + '/../**/*.entity{.js,.ts}'],
                migrations: [__dirname + '/migrations/*{.ts,.js}'],

            } as ConnectionOptions
        }
    })
]