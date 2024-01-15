import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SpendingQuery } from "../controller/dto/spending.query";
import { EmployeeEntity } from "../models/employee.entity";

@Injectable()
export class EmployeeRepository {

    constructor(
        @InjectRepository(EmployeeEntity)
        private readonly repository: Repository<EmployeeEntity>,
    ) { }

    insert(employee: EmployeeEntity): Promise<EmployeeEntity> {
        return this.repository.save(employee)
    }

    update(employee: EmployeeEntity, id: string) {
        return this.repository.update(id, employee);
    }

    findOne(where = {}): Promise<EmployeeEntity> {
        return this.repository.findOne({ where: { ...where } })
    }

    findAll(where = {}): Promise<EmployeeEntity[]> {
        return this.repository.find()
    }

    findOneWithDepartament(where = {}): Promise<EmployeeEntity> {
        return this.repository.findOne(
            {
                relations: { departament: true },
                where: { ...where }
            }
        );
    }

    findAndSumByTask() {
        return this.repository
            .createQueryBuilder("employee")
            .select("employee.name", "employee")
            .addSelect("departament.name", "departament")
            .addSelect("sum(task.duration)", "sum")
            .innerJoin("employee.departament", "departament")
            .innerJoin("employee.task", "task")
            .groupBy("employee.name, departament.name")
            .getRawMany()
    }

    spending(queryParams: SpendingQuery) {
        const query = []
        let params = {}
        if (queryParams.name){
            query.push("lower(employee.name) = :name")
            params['name'] = queryParams.name
        }
        if (queryParams.start){
            query.push("task.deadline >= :start")
            params['start'] = queryParams.start
        }
        if (queryParams.finish){
            query.push("task.deadline <= :finish")
            params['finish'] = queryParams.finish
        }
        const finalQuery = query ? query.join(" and ") : ""

        return this.repository
            .createQueryBuilder("employee")
            .select("employee.name", "employee")
            .addSelect("departament.name", "departament")
            .addSelect("round(avg(task.duration),2)", "avg")
            .innerJoin("employee.departament", "departament")
            .innerJoin("employee.task", "task")
            .where(finalQuery, params)
            .groupBy("employee.name,departament.name")
            .getRawMany()
    }
}