import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppErrors } from "@shared/infra/http/error/AppErrors";
import { inject, injectable } from "tsyringe";
import { verify, sign } from "jsonwebtoken";

interface IPayload {
    sub: string;
    email: string;
};

interface IResponse {
    refresh_token: string;
    token: string;
};

const { 
    secret_refresh_token,
    expires_in_refresh_token, 
    expires_in_token, 
    expires_refresh_token_days, 
    secret_token 
      } = auth;

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ) { }
   async execute(token: string): Promise<IResponse> {
       const { email, sub } = verify(token, secret_refresh_token) as IPayload;
       
       const user_id = sub;

       const userToken = await this.usersTokensRepository.findUserByIdAndRefreshToken(
           user_id,
           token
           );

       if(!userToken) {
           throw new AppErrors("Refresh Token doesn't exists!");
       };

       await this.usersTokensRepository.deleteById(userToken.id);

       const refresh_token = sign({ email }, secret_refresh_token, {
           subject: sub,
           expiresIn: expires_in_refresh_token
       });

       const expires_date = this.dateProvider.addDays(
           expires_refresh_token_days
       );

       await this.usersTokensRepository.create({
           expires_date, 
           refresh_token,
           user_id,
       });

       const new_token = sign({}, secret_token, {
        subject: user_id,
        expiresIn: expires_in_token,
      });

       return { 
           refresh_token,
           token: new_token,
       };
    };
};
 
export { RefreshTokenUseCase };
