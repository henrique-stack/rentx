import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";
import { Categories } from "@modules/cars/infra/typeorm/entities/Categories";

class CategoryRepositoryInMemory implements ICategoriesRepository {
    categories: Categories[] = [];

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Categories();
    Object.assign(category, {
    name,
    description,
    });
    this.categories.push(category);
  };

    async findByName(name: string): Promise<Categories> {
    const result = this.categories.find(user => user.name === name);
    return result;
  };

    async list(): Promise<Categories[]> {
    const list = this.categories;
    return list;
  };
};

export { CategoryRepositoryInMemory };