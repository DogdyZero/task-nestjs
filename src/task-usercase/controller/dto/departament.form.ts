import { IsNotEmpty } from "class-validator";

export class DepartamentForm {
    @IsNotEmpty()
    name: string;
}