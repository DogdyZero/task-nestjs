import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskForm } from "../controller/dto/task.form";
import { TaskEntity } from "../models/task.entity";
import { DepartamentRepository } from "../repository/departament.repository";
import { TaskRepository } from "../repository/task.repository";
import { TaskAllocateService } from "./task-allocate.service";

@Injectable()
export class TaskService {
    constructor(
        private readonly taskAllocateService: TaskAllocateService,
        private readonly repository: TaskRepository,
        private readonly departamentRepository: DepartamentRepository,
    ) { }

    async find() {
        return await this.repository.findAll();
    }

    async findOne(id: number) {
        return await this.repository.findOne({ id });
    }

    async create(form: TaskForm) {
        const entity = new TaskEntity()
        const departament = await this.departamentRepository.findOne(form.departament)
        if (!departament) throw new NotFoundException(`Departament (${form.departament}) not found`)

        entity.title = form.title
        entity.description = form.description
        entity.duration = form.duration
        entity.deadline = form.deadline
        entity.finished = false
        entity.departament = departament

        return await this.repository.insert(entity);
    }

    async finishTask(id: number) {
        const entity = await this.findOne(id)
        if (!entity) throw new NotFoundException(`Task (${id}) not found`)

        if (!entity.employee)
            return { message: `Not Allowed to finish the task (${entity.title}) due to no employee allocate!` }
        entity.finished = true;
        return await this.repository.update(entity, id)
    }

    allocate(id: number, employeeId: number) {
        return this.taskAllocateService.allocate(id, employeeId)
    }

    async list3OlderTasksWithNoOneAllocate(){
        return await this.repository.list3OlderTasksWithNoOneAllocate()
    }
}