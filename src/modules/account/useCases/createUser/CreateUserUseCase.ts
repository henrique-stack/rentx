import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { AppErrors } from "@shared/infra/http/error/AppErrors";
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { };

    async execute({
        name,
        email,
        password,
        drive_license
    }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppErrors("User already exists!");
        };

        const passwordHash = await hash(password, 8)

        await this.usersRepository.create({
            name,
            email,
            drive_license,
            password: passwordHash,
        });
    }
};

export { CreateUserUseCase };