import { Injectable } from "@nestjs/common";
import { UserEntity } from "../models/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {

    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>
    ) { }

    insert(entity: UserEntity): Promise<UserEntity> {
        return this.repository.save(entity)
    }

    update(entity: UserEntity, id: string) {
        return this.repository.update(id, entity);
    }

    findOne(where = {}): Promise<UserEntity> {
        return this.repository.findOne({ where: { ...where } })
    }

    findAll(where = {}): Promise<UserEntity[]>{
        return this.repository.find({ where: { ...where } })
    }
}