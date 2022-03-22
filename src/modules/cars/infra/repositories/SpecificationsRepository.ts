import { ICreateSpecificationDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { Specifications } from "@modules/cars/infra/typeorm/entities/Specifications";
import { getRepository, Repository } from "typeorm";

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specifications>;

    constructor() {
        this.repository = getRepository(Specifications);
    };

    async create({ name, description }: ICreateSpecificationDTO ): Promise<Specifications> {
        const specifications = new  Specifications();

        Object.assign(specifications, {
            name,
            description,
            created_at: new Date()
        });
        await this.repository.save(specifications);
        return specifications;
    };
    
    async findByName(name : string): Promise<Specifications> {
        const specifications = await this.repository.findOne({name});
        return specifications;
    };

    async findByIds(ids: string[]): Promise<Specifications[]> {
        const specifications = await this.repository.findByIds(ids);
        return specifications;
    };
};

export { SpecificationsRepository };