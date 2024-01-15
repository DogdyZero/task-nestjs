import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DepartamentEntity } from "./departament.entity";
import { TaskEntity } from "./task.entity";
import { UserEntity } from "../../security/models/user.entity";

@Entity('employee')
export class EmployeeEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string

    @ManyToOne(() => DepartamentEntity, (departament) => departament.employee)
    @JoinColumn({ name: "departament_id" })
    departament: DepartamentEntity

    @OneToMany(() => TaskEntity, (task) => task.employee)
    task: TaskEntity

    @OneToOne(() => UserEntity, (user) => user.employee)
    @JoinColumn({ name: "user_id" })
    user: UserEntity
}