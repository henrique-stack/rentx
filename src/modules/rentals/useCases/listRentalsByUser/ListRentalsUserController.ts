import { ListRentalsUserUseCase } from "./ListRentalsUserUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

class ListRentalsUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user
        const listRentalUserUseCase = container.resolve(ListRentalsUserUseCase);

        const result = await listRentalUserUseCase.execute(id);
        
        return response.json(result);
    };
};

export { ListRentalsUserController };
