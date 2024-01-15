import { IsNotEmpty, IsUUID} from 'class-validator';

export class EmployeeForm {
    @IsNotEmpty()
    name: string;
    @IsUUID()
    departament: string;
    @IsNotEmpty()
    user: string;
}