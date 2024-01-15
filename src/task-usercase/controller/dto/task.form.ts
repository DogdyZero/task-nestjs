import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsDate, IsUUID } from 'class-validator';
import { toDate } from '../../../common/helper/cast.helper'

export class TaskForm {
    @IsNotEmpty()
    title: string
    @IsOptional()
    description: string
    @IsDate()
    @Transform(({ value }) => toDate(value))
    deadline: Date
    @IsNumber()
    duration: number
    @IsUUID()
    departament: string
}