import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { UpdateUserForm, UserForm } from "../dto/user.form";
import { Roles } from "../dto/roles.decorator";


@Controller('users')
export class UserControlller {
    constructor(private readonly service: UserService) { }

    @Post()
    add(@Body() dto: UserForm) {
        return this.service.add(dto);
    }

    @Put(':id')
    update(@Body() dto: UpdateUserForm, @Param('id') id: string) {
        return this.service.update(dto, id);
    }

    @Get()
    @Roles(['admin'])
    list(){
        return this.service.list();
    }
}