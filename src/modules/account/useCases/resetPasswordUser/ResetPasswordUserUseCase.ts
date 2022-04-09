import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppErrors } from "@shared/infra/http/error/AppErrors";
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
interface IRequest {
    token: string;
    password: string;
  }
  
  @injectable()
  class ResetPasswordUserUseCase {
    constructor(
      @inject("UsersTokensRepository")
      private usersTokensRepository: IUsersTokensRepository,
      @inject("DayjsDateProvider")
      private dateProvider: IDateProvider,
      @inject("UsersRepository")
      private usersRepository: IUsersRepository
    ) {}
    async execute({ token, password }: IRequest): Promise<void> {
      const userToken = await this.usersTokensRepository.findByRefreshToken(
        token
      );
  
      if (!userToken) {
        throw new AppErrors("Token invalid!");
      }

      const before = userToken.expires_date;
      const after = this.dateProvider.dateNow();
      const result = this.dateProvider.compareIfBefore(before, after);

      if (result) {
        throw new AppErrors("Token expired!");
      };
  
      const user = await this.usersRepository.findById(userToken.user_id);
  
      user.password = await hash(password, 8);
  
      await this.usersRepository.create(user);
  
      await this.usersTokensRepository.deleteById(userToken.id);
    }
  }
  
export { ResetPasswordUserUseCase };
