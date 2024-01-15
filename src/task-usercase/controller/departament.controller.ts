import { Body, Controller, Get, Post } from "@nestjs/common";
import { DepartamentService } from "../services/departament.service";
import { DepartamentForm } from "./dto/departament.form";
import { Roles } from "src/security/dto/roles.decorator";

@Controller('departaments')
export class DepartamentControlller {
    constructor(private readonly service: DepartamentService) { }

    @Get()
    @Roles(['admin'])
    list() {
        return this.service.countByDepartament()
    }

    @Post()
    @Roles(['admin'])
    create(@Body()dto: DepartamentForm){
        return this.service.create(dto)
    }

}