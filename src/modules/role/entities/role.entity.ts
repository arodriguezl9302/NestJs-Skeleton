import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';


@Entity('roles')
export class Role extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 20, nullable:false})
    name:string;

    @Column({type: 'text', nullable:false})
    description: string;

    @ManyToMany(type => User, user => user.roles )
    users: User[];

    @Column({ type: 'varchar', default: 'INACTIVE', length: 8})
    status: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at'})
    updatedAt: Date;
}