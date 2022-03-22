import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";
import { AppErrors } from "@error/AppErrors";
import { inject, injectable } from "tsyringe";
import { Categories } from "@modules/cars/infra/typeorm/entities/Categories";

interface IRequest {
    name: string;
    description: string;
};

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoryRepository: ICategoriesRepository) { }

    async execute({ name, description }: IRequest): Promise<void> {
        const alreadyExistCategory = await this.categoryRepository.findByName(name);

        if (alreadyExistCategory) {
            throw new AppErrors("Category already exists");
        };
        await this.categoryRepository.create({
            name,
            description,
        });
    };
};

export { CreateCategoryUseCase };