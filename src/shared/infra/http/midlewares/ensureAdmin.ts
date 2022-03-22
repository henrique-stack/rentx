import { UsersRepository } from "@modules/account/infra/repositories/UsersRepository";
import { NextFunction, Request, Response } from "express";
import { AppErrors } from "@error/AppErrors";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    const { id } = request.user;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);
  
    if(!user.isAdmin) {
        throw new AppErrors("User isn't admin!");
    };
   next();
};