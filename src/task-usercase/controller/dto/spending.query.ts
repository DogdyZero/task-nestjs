import { IsDate, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { toDate, toLowerCaseAndTrim } from '../../../common/helper/cast.helper'

export class SpendingQuery {

    @IsOptional()
    @Transform(({ value }) => toLowerCaseAndTrim(value))
    name: string
    @IsDate()
    @Transform(({ value }) => toDate(value))
    @IsOptional()
    start: Date
    @IsDate()
    @Transform(({ value }) => toDate(value))
    @IsOptional()
    finish: Date
}