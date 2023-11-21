import { Injectable } from "@nestjs/common";
import { DepartamentRepository } from "../repository/departament.repository";

@Injectable()
export class DepartamentService {
    constructor(private readonly repository: DepartamentRepository) { }
    async countByDepartament() {
        return await this.repository.countByDepartament()
    }
}