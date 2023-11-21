import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EmployeeEntity } from "./employee.entity";
import { TaskEntity } from "./task.entity";

@Entity("departament")
export class DepartamentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string

    @OneToMany(() => EmployeeEntity, (employee) => employee.departament)
    employee: EmployeeEntity

    @OneToMany(() => TaskEntity, (task) => task.departament)
    task: TaskEntity
}