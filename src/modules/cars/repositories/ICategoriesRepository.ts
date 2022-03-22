import { Categories } from "../infra/typeorm/entities/Categories";

interface ICreateCategoryDTO {
    name: string;
    description: string;
    created_at?: Date;
};

interface ICategoriesRepository {
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
    findByName(name: string): Promise<Categories>;
    list(): Promise<Categories[]>;
};

export { ICreateCategoryDTO, ICategoriesRepository };