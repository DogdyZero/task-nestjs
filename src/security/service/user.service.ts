import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateUserForm, UserForm } from "../dto/user.form";
import { UserEntity } from "../models/user.entity";
import { UserRepository } from "../repository/user.repository";
import { UserPasswordService } from "./user.password.service";
import { UserList } from "../dto/user.list";

@Injectable()
export class UserService {

    constructor(
        private readonly userPasswordService: UserPasswordService,
        private readonly repository: UserRepository) { }

    async add(dto: UserForm) {
        const entity: UserEntity = new UserEntity();
        entity.password = this.userPasswordService.encryptPassword(dto.password)
        entity.username = dto.username;
        const result = await this.repository.insert(entity);
        return { username: result.username, id: result.id }
    }

    async update(dto: UpdateUserForm, id: string) {
        const entity = await this.repository.findOne({ id })
        if (!entity)
            throw new NotFoundException(`User ${id} not found!`)
        if (dto.oldPassword && dto.password) {
            const result = this.userPasswordService.checkPassword(dto.oldPassword, entity.password)
            if (result) {
                entity.password = this.userPasswordService.encryptPassword(dto.password);
            }
        }
        if (dto.username)
            entity.username = dto.username;

        return await this.repository.update(entity, id);
    }

    async list() {
        return (await this.repository.findAll()).map(user => new UserList(user.id, user.username));
    }
}