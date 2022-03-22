import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

class ListAvailableCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { brand, name, category_id } = request.query;

        const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase);
        const result = await listAvailableCarsUseCase.execute({
            name: name as string,
            category_id: category_id as string,
            brand: brand as string
        });
        return response.json(result);
    };
};

export { ListAvailableCarsController };