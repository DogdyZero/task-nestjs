import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeeEntity } from "./models/employee.entity";
import { EmployeeController } from "./controller/employee.controller";
import { DepartamentEntity } from "./models/departament.entity";
import { TaskEntity } from "./models/task.entity";
import { EmployeeService } from "./services/employee.service";
import { EmployeeRepository } from "./repository/employee.repository";
import { EmployeeMapper } from "./services/employee.mapper";
import { TaskService } from "./services/task.service";
import { DepartamentRepository } from "./repository/departament.repository";
import { TaskRepository } from "./repository/task.repository";
import { TaskController } from "./controller/task.controller";
import { DepartamentService } from "./services/departament.service";
import { DepartamentControlller } from "./controller/departament.controller";
import { TaskAllocateService } from "./services/task-allocate.service";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                DepartamentEntity,
                EmployeeEntity,
                TaskEntity
            ]
        ),
    ],
    controllers: [
        DepartamentControlller,
        EmployeeController,
        TaskController
    ],
    providers: [
        DepartamentService,
        DepartamentRepository,
        EmployeeService,
        EmployeeRepository,
        EmployeeMapper,
        TaskService,
        TaskRepository,
        TaskAllocateService
    ]
})
export class TaskCrudModule { }