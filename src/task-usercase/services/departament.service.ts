import { Injectable } from "@nestjs/common";
import { DepartamentRepository } from "../repository/departament.repository";
import { DepartamentForm } from "../controller/dto/departament.form";
import { DepartamentEntity } from "../models/departament.entity";

@Injectable()
export class DepartamentService {
    constructor(private readonly repository: DepartamentRepository) { }
    async countByDepartament() {
        return await this.repository.countByDepartament()
    }

    async create(dto: DepartamentForm) {
        const entity = new DepartamentEntity()
        entity.name = dto.name;
        return this.repository.insert(entity)
    }
}