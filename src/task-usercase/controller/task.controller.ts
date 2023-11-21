import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { TaskForm } from "./dto/task.form";
import { TaskService } from "../services/task.service";
import { TaskAllocateForm } from "./dto/task-allocate.form";

@Controller('/tasks')
export class TaskController {

    constructor(private readonly service: TaskService) { }

    @Get()
    list() {
        return this.service.find()
    }
    @Get('pendents')
    listOlderTasks(){
        return this.service.list3OlderTasksWithNoOneAllocate();
    }

    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.service.findOne(id)
    }

    @Post()
    add(@Body() form: TaskForm) {
        return this.service.create(form)
    }

    @Put('allocate/:id')
    allocate(@Body() form: TaskAllocateForm, @Param('id') id: number) {
        const employeeId = form.employeeId
        return this.service.allocate(id, employeeId)
    }

    @Put('finish/:id')
    finishTask(@Param('id') id: number) {
        return this.service.finishTask(id)
    }

}