import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { Categories } from "@modules/cars/infra/typeorm/entities/Categories";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository
  ) { }

  async execute(): Promise<Categories[]> {
    const categories = await this.categoryRepository.list();

    return categories;
  };
};

export { ListCategoriesUseCase };
