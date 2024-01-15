import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { TaskForm } from "./dto/task.form";
import { TaskService } from "../services/task.service";
import { TaskAllocateForm } from "./dto/task-allocate.form";
import { AuthenticationGuard } from "../../security/service/authentication.guard";
import { Roles } from "src/security/dto/roles.decorator";

@Controller('/tasks')
@UseGuards(AuthenticationGuard)
export class TaskController {

    constructor(private readonly service: TaskService) { }

    @Get()
    @Roles(['admin'])
    list() {
        return this.service.find()
    }
    @Get('pendents')
    @Roles(['admin'])
    listOlderTasks(){
        return this.service.list3OlderTasksWithNoOneAllocate();
    }

    @Get('/:id')
    @Roles(['admin'])
    getOne(@Param('id') id: string) {
        return this.service.findOne(id)
    }

    @Post()
    @Roles(['admin'])
    add(@Body() form: TaskForm) {
        return this.service.create(form)
    }

    @Put('allocate/:id')
    @Roles(['admin'])
    allocate(@Body() form: TaskAllocateForm, @Param('id') id: string) {
        const employeeId = form.employeeId
        return this.service.allocate(id, employeeId)
    }

    @Put('finish/:id')
    @Roles(['admin'])
    finishTask(@Param('id') id: string) {
        return this.service.finishTask(id)
    }

}