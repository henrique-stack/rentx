import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppErrors } from "@error/AppErrors";
import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    }
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        ) { }
    async execute({ email, password }: IRequest): Promise<IResponse> {
        
        const user = await this.usersRepository.findByEmail(email);
        const { secret_refresh_token, secret_token, expires_in, expires_in_refresh_token, expires_refresh_token_days } = auth;

        if (!user) {
            throw new AppErrors("User doesn't exists")
        };

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppErrors("Passoword or Email incorrect!")
        };

        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in
        });

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        });

        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token: refresh_token,
            expires_date: this.dateProvider.addDays(expires_refresh_token_days)
        });

        const tokenReturn: IResponse = {
            user: {
                name: user.name,
                email: user.email,
            },
            token,
            refresh_token
        };
        
        return tokenReturn;
    };
};

export { AuthenticateUseCase };
