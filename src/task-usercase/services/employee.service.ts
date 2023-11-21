import { Injectable } from "@nestjs/common";
import { EmployeeForm } from "../controller/dto/employee.form";
import { EmployeeRepository } from "../repository/employee.repository";
import { EmployeeMapper } from "./employee.mapper";
import { SpendingQuery } from "../controller/dto/spending.query";

@Injectable()
export class EmployeeService {
    constructor(
        private readonly repository: EmployeeRepository,
        private readonly mapper: EmployeeMapper
    ) { }

    async findAll(){
        return await this.repository.findAll();
    }

    async findAndSumByTask() {
        return await this.repository.findAndSumByTask();
    }

    async findOne(id: number) {
        return await this.repository.findOne({ id });
    }

    async spending(query: SpendingQuery) {
        return await this.repository.spending(query)
    }

    async create(form: EmployeeForm) {
        const employee = await this.mapper.toEntity(form)
        return await this.repository.insert(employee);
    }

    async update(form: EmployeeForm, id: number) {
        const employee = await this.mapper.toEntity(form)
        return await this.repository.update(employee, id)
    }
}