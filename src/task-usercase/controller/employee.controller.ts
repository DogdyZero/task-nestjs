import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { EmployeeForm } from "./dto/employee.form";
import { EmployeeService } from "../services/employee.service";
import { SpendingQuery } from "./dto/spending.query";

@Controller('/employees')
export class EmployeeController {

    constructor(private readonly employeeService: EmployeeService) { }

    @Get()
    listAll() {
        return this.employeeService.findAll()
    }

    @Get('sum')
    listAnSumByTask() {
        return this.employeeService.findAndSumByTask()
    }

    @Get('spend')
    spending(@Query() query: SpendingQuery) {
        return this.employeeService.spending(query)
    }

    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.employeeService.findOne(id)
    }


    @Post()
    add(@Body() form: EmployeeForm) {
        return this.employeeService.create(form)
    }

    @Put('/:id')
    update(@Body() form: EmployeeForm, @Param('id') id: number) {
        return this.employeeService.update(form, id)
    }
}