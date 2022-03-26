import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";
import { Specifications } from "@modules/cars/infra/typeorm/entities/Specifications";

export class SpecificationRepositoryInMemory implements ISpecificationsRepository {

    specifications: Specifications[] = [];

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specifications> {
        const specification = new Specifications();
        Object.assign(specification, {
            name,
            description,
        });
        this.specifications.push(specification);
        return specification;
    };
    async findByName(name: string): Promise<Specifications> {
        return this.specifications.find(specification => specification.name === name);
    };
    async findByIds(ids: string[]): Promise<Specifications[]> {
        return this.specifications.filter(specification => ids.includes(specification.id));
    };

    async verifyById(id: string): Promise<Specifications> {
     return this.specifications.find(specification => specification.id === id)
    };
};