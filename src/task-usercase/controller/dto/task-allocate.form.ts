import { IsUUID } from "class-validator";

export class TaskAllocateForm {
    @IsUUID()
    employeeId: string
}