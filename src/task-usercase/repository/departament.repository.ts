import { InjectRepository } from "@nestjs/typeorm";
import { DepartamentEntity } from "../models/departament.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DepartamentRepository {
    constructor(
        @InjectRepository(DepartamentEntity)
        private readonly repository: Repository<DepartamentEntity>
    ) { }

    async findOne(id: string): Promise<DepartamentEntity> {
        const departament = await this.repository.findOneBy({ id });
        if (!departament) {
            throw new Error(`Departament ${id} not found!`)
        }
        return departament
    }

    countByDepartament() {
        return this.repository.createQueryBuilder("departament")
            .select("departament.name", "departament")
            .addSelect("count(distinct employee.id)", "employees")
            .addSelect("count(distinct task.id)", "tasks")
            .leftJoin("departament.task", "task")
            .leftJoin("task.employee", "employee")
            .groupBy("departament.name")
            .getRawMany()
    }

    insert(departament: DepartamentEntity): Promise<DepartamentEntity> {
        return this.repository.save(departament)
    }

}