import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

class ListCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoryUseCase = container.resolve(ListCategoriesUseCase);

    const all = await listCategoryUseCase.execute();

    return response.send(all);
  };
};

export { ListCategoryController };