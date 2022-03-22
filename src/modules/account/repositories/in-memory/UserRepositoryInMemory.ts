import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { Users } from "@modules/account/infra/typeorm/entities/Users";
import { IUsersRepository } from "../IUsersRepository";
    
    export class UserRepositoryInMemory implements IUsersRepository {
        users: Users[] = [];

        async create({
        name,
        email, 
        password, 
        drive_license
    }: ICreateUserDTO ): Promise<void> {
        const user = new Users();
        Object.assign(user, {
        name,
        email,
        password,
        drive_license
        });
        this.users.push(user);
    };
        
        async findByEmail(email: string): Promise<Users> {
        return this.users.find((user) => user.email === email);
        };
        
        async findById(id: string): Promise<Users> {
        return this.users.find((user) => user.id === id);        
        };
    };