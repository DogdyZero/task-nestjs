import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";
import { TaskEntity } from "../models/task.entity";

@Injectable()
export class TaskRepository {

    constructor(
        @InjectRepository(TaskEntity)
        private readonly repository: Repository<TaskEntity>
    ) { }

    insert(entity: TaskEntity): Promise<TaskEntity> {
        return this.repository.save(entity)
    }

    update(entity: TaskEntity, id: number) {
        return this.repository.update(id, entity);
    }

    findAll(): Promise<TaskEntity[]> {
        return this.repository.find();
    }
    findOne(where = {}): Promise<TaskEntity> {
        return this.repository.findOne({ where: { ...where } })
    }
    findOneWithDepartament(where = {}): Promise<TaskEntity> {
        return this.repository.findOne(
            {
                relations: { departament: true },
                where: { ...where }
            }
        );
    }

    list3OlderTasksWithNoOneAllocate() {
        return this.repository.find(
            {
                where: {
                    employee: IsNull()
                },
                order: { deadline: "DESC" },
                take: 3
            }
        )
    }
}