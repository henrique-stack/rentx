import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";
import { Categories } from "@modules/cars/infra/typeorm/entities/Categories";
import { getRepository, Repository } from "typeorm";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Categories>;

    constructor() {
        this.repository = getRepository(Categories);
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            name,
            description,
        });

        await this.repository.save(category);
    };

    async list(): Promise<Categories[]> {
        const categories = await this.repository.find();
        
        return categories;
    };

    async findByName(name: string): Promise<Categories> {
        const category = await this.repository.findOne({ name });

        return category;
    };
};
export { CategoriesRepository };