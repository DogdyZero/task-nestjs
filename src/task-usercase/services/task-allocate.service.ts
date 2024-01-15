import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskRepository } from "../repository/task.repository";
import { DepartamentRepository } from "../repository/departament.repository";
import { EmployeeRepository } from "../repository/employee.repository";

@Injectable()
export class TaskAllocateService {

    constructor(
        private readonly repository: TaskRepository,
        private readonly employeeRepository: EmployeeRepository
    ) { }

    async allocate(id: string, employeeId: string) {
        const employee = await this.employeeRepository.findOneWithDepartament({ id: employeeId })
        const task = await this.repository.findOneWithDepartament({ id })
        let message = null
        if (!employee) throw new NotFoundException(`Employee (${employeeId}) not found`)
        if (!task) throw new NotFoundException(`Task (${id}) not found`)
        if (task.finished)
            message = `Not allowed to allocate employee "${employee.name}" to task "${task.title}" due to is finished`
        else if (task.employee)
            message = `Not allowed to allocate employee "${employee.name}" to task "${task.title}" due to there's an employee doing that`
        else if (employee.departament.id === task.departament.id) {
            task.employee = employee
            this.repository.update(task, id)
            message = `Employee "${employee.name}" allocate in task "${task.title}"`
        } else
            message = `Not allowed to allocate employee "${employee.name}" to task "${task.title}"`
        return { message }
    }
}