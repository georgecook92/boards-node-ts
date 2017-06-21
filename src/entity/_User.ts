import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {validate, IsNotEmpty} from "class-validator";

@Entity()
export class _User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    first_name: string;

    @Column()
    @IsNotEmpty()
    last_name: string;

    @Column()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsNotEmpty()
    password: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}