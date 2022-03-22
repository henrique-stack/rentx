import { CreateRentalsUseCase } from "./CreateRentalsUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

class CreateRentalsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { car_id, expected_return_date } = request.body;
        const { id } = request.user;

        const createRentalsUseCase = container.resolve(CreateRentalsUseCase);

        const result = await createRentalsUseCase.execute({
            user_id: id,
            expected_return_date,
            car_id
        });

        return response.status(201).json(result);
    };
};
export { CreateRentalsController }