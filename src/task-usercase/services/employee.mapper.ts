import { Injectable } from "@nestjs/common";
import { EmployeeForm } from "../controller/dto/employee.form";
import { EmployeeEntity } from "../models/employee.entity";
import { DepartamentRepository } from "../repository/departament.repository";

@Injectable()
export class EmployeeMapper {
    constructor(private departamentRepository: DepartamentRepository) { }
    
    async toEntity(form: EmployeeForm): Promise<EmployeeEntity> {
        const employee: EmployeeEntity = new EmployeeEntity()
        employee.name = form.name
        const departament = await this.departamentRepository.findOne(form.departament)
        employee.departament = departament
        return employee;
    }
}