import { Controller, Get } from "@nestjs/common";
import { DepartamentService } from "../services/departament.service";

@Controller('departament')
export class DepartamentControlller{
    constructor(private readonly service : DepartamentService){}

    @Get()
    list(){
        return this.service.countByDepartament()
    }
}