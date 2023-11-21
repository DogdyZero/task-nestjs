import { IsNumber } from "class-validator";

export class TaskAllocateForm {
    @IsNumber()
    employeeId: number
}