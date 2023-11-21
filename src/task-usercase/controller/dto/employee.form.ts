import { IsNotEmpty, IsNumber} from 'class-validator';

export class EmployeeForm {
    @IsNotEmpty()
    name: string;
    @IsNumber()
    departament: number
}