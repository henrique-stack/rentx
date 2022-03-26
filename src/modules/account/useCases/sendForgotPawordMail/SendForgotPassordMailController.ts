import { SendForgotPasswordMailUseCase } from "./SendForgotPassordMailUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

class SendForgtPasswordMailController {
    async handle(request: Request, response: Response) {
        const { email } = request.body;

        const sendForgotPasswordMailController = container.resolve(SendForgotPasswordMailUseCase);

        return response.send(email);
    };
};

export { SendForgtPasswordMailController };