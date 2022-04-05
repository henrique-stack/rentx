import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

class ListSpecificationsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const repositorySpecifications = container.resolve(ListSpecificationsUseCase);

        const result = await repositorySpecifications.execute();
        return response.json(result);
    };
};

export { ListSpecificationsController };