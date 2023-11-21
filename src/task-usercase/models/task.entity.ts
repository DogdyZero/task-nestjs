import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DepartamentEntity } from "./departament.entity";
import { EmployeeEntity } from "./employee.entity";

@Entity("task")
export class TaskEntity {

    @PrimaryGeneratedColumn()
    id:number
    @Column()
    title:string;
    @Column()
    description:string;
    @Column()
    deadline:Date;
    @Column()
    duration:number;
    @Column()
    finished:boolean;
    @ManyToOne(() => DepartamentEntity, (departament) => departament.task)
    @JoinColumn({ name: "departament_id" })
    departament: DepartamentEntity

    @ManyToOne(() => EmployeeEntity, (employee) => employee.task)
    @JoinColumn({ name: "employee_id" })
    employee: EmployeeEntity
}