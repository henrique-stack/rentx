import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateCarSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { specification_id } = request.body;
        const { id } = request.params;
        
        const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);
        
        const car = await createCarSpecificationUseCase.execute({
            car_id: id,
            specification_id,
        });
        return response.json(car);
    };
};