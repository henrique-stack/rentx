import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

class CreateSpecificationController {

    async handle(request: Request, response: Response ): Promise<Response> {
        const { name, description } = request.body;
        const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);
        
        const result = await createSpecificationUseCase.execute({ name, description });

        return response.status(201).json(result);
    };
};

export { CreateSpecificationController };