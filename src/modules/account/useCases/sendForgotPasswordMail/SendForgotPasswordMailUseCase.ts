import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { AppErrors } from "@shared/infra/http/error/AppErrors";
import { inject, injectable } from "tsyringe";
import { randomUUID } from "crypto";

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepositoy: IUsersRepository,
        @inject("UsersTokensRepository")
        private userTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider
    ) { }

    async execute(email: string): Promise<void> {
       const user = await this.usersRepositoy.findByEmail(email);
        
       if(!user) {
           throw new AppErrors("User doesn's exists!");
       };

       const token = randomUUID();
       const expires_date = this.dateProvider.addHours(3);

       await this.userTokensRepository.create({
           refresh_token: token,
           user_id: user.id,
           expires_date,
       });

       await this.mailProvider.sendMail(
       email, 
       "Recuperação de senha", 
       `o link para o reset é: ${token}`
       );
    };
};
export { SendForgotPasswordMailUseCase };

