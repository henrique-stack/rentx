import { container } from "tsyringe";
import { CreateRefreshTokenUseCase } from "./CreateRefreshTokenUseCase";
import { Request, Response } from "express";

class CreateRefreshTokenController {
    async handle(request: Request, response: Response): Promise<Response> {
        const token = request.body.token || 
        request.headers["x-access-token"] ||
        request.query.token;

        const refreshTokenUseCase = container.resolve(CreateRefreshTokenUseCase);

        const refresh_token = await refreshTokenUseCase.execute(token);
    
        return response.json(refresh_token);
    };
};

export { CreateRefreshTokenController };