import { AuthenticateUseCase } from "./AuthenticateUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { password, email } = request.body;

        const authenticateUseCase = container.resolve(AuthenticateUseCase);

        const token = await authenticateUseCase.execute({
            password,
            email
        });

        return response.json(token);
    };
};
// partido dessa parte aqui, iremos para as rotas.
// para que possamos enviar então para o serviço de nuvem/servidor;
export { AuthenticateUserController };
