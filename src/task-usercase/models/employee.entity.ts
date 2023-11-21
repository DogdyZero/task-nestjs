import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DepartamentEntity } from "./departament.entity";
import { TaskEntity } from "./task.entity";

@Entity('employee')
export class EmployeeEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string

    @ManyToOne(() => DepartamentEntity, (departament) => departament.employee)
    @JoinColumn({ name: "departament_id" })
    departament: DepartamentEntity

    @OneToMany(() => TaskEntity, (task) => task.employee)
    task: TaskEntity
}