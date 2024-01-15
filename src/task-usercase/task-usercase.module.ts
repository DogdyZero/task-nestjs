import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthenticationModule } from "src/security/Authentication.module";
import { DepartamentControlller } from "./controller/departament.controller";
import { EmployeeController } from "./controller/employee.controller";
import { TaskController } from "./controller/task.controller";
import { DepartamentEntity } from "./models/departament.entity";
import { EmployeeEntity } from "./models/employee.entity";
import { TaskEntity } from "./models/task.entity";
import { DepartamentRepository } from "./repository/departament.repository";
import { EmployeeRepository } from "./repository/employee.repository";
import { TaskRepository } from "./repository/task.repository";
import { DepartamentService } from "./services/departament.service";
import { EmployeeMapper } from "./services/employee.mapper";
import { EmployeeService } from "./services/employee.service";
import { TaskAllocateService } from "./services/task-allocate.service";
import { TaskService } from "./services/task.service";
import { UserEntity } from "src/security/models/user.entity";


@Module({
    imports: [
        AuthenticationModule,
        TypeOrmModule.forFeature(
            [
                UserEntity,
                DepartamentEntity,
                EmployeeEntity,
                TaskEntity,
            ]
        ),
    ],
    controllers: [
        DepartamentControlller,
        EmployeeController,
        TaskController,
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
    ],
})
export class TaskCrudModule { }