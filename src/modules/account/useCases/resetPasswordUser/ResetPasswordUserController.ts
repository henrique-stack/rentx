import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

class ResetPasswordUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { password } = request.body;
        const { token } = request.query;

        const resePasswordUserUseCase = container.resolve(ResetPasswordUserUseCase);

        await resePasswordUserUseCase.execute({
        token: String(token),
        password,
        });

        return response.send();
    }
};

export { ResetPasswordUserController };