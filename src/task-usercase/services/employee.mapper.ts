import { Injectable } from "@nestjs/common";
import { EmployeeForm } from "../controller/dto/employee.form";
import { EmployeeEntity } from "../models/employee.entity";
import { DepartamentRepository } from "../repository/departament.repository";
import { UserRepository } from "src/security/repository/user.repository";

@Injectable()
export class EmployeeMapper {
    constructor(
        private departamentRepository: DepartamentRepository,
        private userRepository: UserRepository
    ) { }

    async toEntity(form: EmployeeForm): Promise<EmployeeEntity> {
        const employee: EmployeeEntity = new EmployeeEntity()
        employee.name = form.name
        employee.user = await this.userRepository.findOne({id: form.user})
        employee.departament = await this.departamentRepository.findOne(form.departament)
        return employee;
    }
}