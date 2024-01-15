import { Injectable } from "@nestjs/common"
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserPasswordService {
    readonly SALT_SIZE = 10;

    encryptPassword(password: string) {
        const salt = bcrypt.genSaltSync(this.SALT_SIZE);
        return  bcrypt.hashSync(password, salt)
    }

    checkPassword(password: string, encryptPassword: string) {
        return bcrypt.compareSync(password, encryptPassword);
    }
}