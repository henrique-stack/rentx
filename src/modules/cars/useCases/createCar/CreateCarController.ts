import { CreateCarUseCase } from "./CreateCarUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateCarController {
    async handle(request: Request, response: Response): Promise<Response> {

    const { 
        name, 
        description,
        category_id, 
        license_plate,
        brand,
        fine_amount, 
        dayle_rate
    } = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);
    const car = await createCarUseCase.execute({
    name,
    description,
    category_id,
    license_plate,
    brand,
    fine_amount,
    dayle_rate
});
    return response.status(201).json(car);
  };
};