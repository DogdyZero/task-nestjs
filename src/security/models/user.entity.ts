import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmployeeEntity } from "../../task-usercase/models/employee.entity";
import { Exclude } from "class-transformer";

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    username: string

    @Exclude()
    @Column({ nullable: false })
    password: string

    @OneToOne(() => EmployeeEntity, (employee) => employee.user)
    employee: EmployeeEntity
}