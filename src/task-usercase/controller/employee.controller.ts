import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { EmployeeService } from "../services/employee.service";
import { EmployeeForm } from "./dto/employee.form";
import { SpendingQuery } from "./dto/spending.query";
import { Roles } from "src/security/dto/roles.decorator";

@Controller('/employees')
export class EmployeeController {

    constructor(private readonly employeeService: EmployeeService) { }

    @Get()
    @Roles(['admin'])
    listAll() {
        return this.employeeService.findAll()
    }

    @Get('sum')
    @Roles(['admin'])
    listAnSumByTask() {
        return this.employeeService.findAndSumByTask()
    }

    @Get('spend')
    @Roles(['admin'])
    spending(@Query() query: SpendingQuery) {
        return this.employeeService.spending(query)
    }

    @Get('/:id')
    @Roles(['admin'])
    getOne(@Param('id') id: string) {
        return this.employeeService.findOne(id)
    }


    @Post()
    add(@Body() form: EmployeeForm) {
        return this.employeeService.create(form)
    }

    @Put('/:id')
    update(@Body() form: EmployeeForm, @Param('id') id: string) {
        return this.employeeService.update(form, id)
    }
}