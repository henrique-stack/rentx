import { UsersRepository } from "@modules/account/infra/repositories/UsersRepository";
import { Request, Response, NextFunction } from "express";
import { AppErrors } from "@error/AppErrors";
import { verify } from "jsonwebtoken";
import { UsersTokensRepository } from "@modules/account/infra/repositories/UsersTokensRepository";
import auth from "@config/auth";

interface IPayload {
    sub: string;
};

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    const userTokensRepository = new UsersTokensRepository();

    if(!authHeader) {
       throw new AppErrors("Token missing!")
    };
    
    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
        token, 
        auth.secret_refresh_token
        ) as IPayload;
        
        const user = await userTokensRepository.findUserByIdAndRefreshToken(
            user_id,
            token
        );
        
        if(!user) {
            throw new AppErrors("User does not exists", 401)
        };

        request.user = {
            id: user_id,
        };

        next();

    } catch {
        throw new AppErrors("Token invalid!", 401);
    };
};