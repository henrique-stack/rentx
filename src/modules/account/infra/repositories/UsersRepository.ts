import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { Users } from "@modules/account/infra/typeorm/entities/Users";
import { getRepository, Repository } from "typeorm";

class UsersRepository implements IUsersRepository {
    private repository: Repository<Users>;

    constructor() {
        this.repository = getRepository(Users);
    }
// acho que não tem necessidade de acrescentar id para nosso repositório de criação
    async create({ name, email, password, drive_license, avatar }: ICreateUserDTO ): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            password,
            drive_license,
            avatar
        });
    await this.repository.save(user);
    };

    async findByEmail(email: string): Promise<Users> {
    const user = await this.repository.findOne({ email });

    return user;
    };

    async findById(id: string) {
    const user = await this.repository.findOne({ id });

    return user;
    };
};

export { UsersRepository }; 
