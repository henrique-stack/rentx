import { Specifications } from "../infra/typeorm/entities/Specifications";
import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO"

interface ISpecificationsRepository {
    create({ name, description }: ICreateSpecificationDTO ): Promise<Specifications>;
    findByName( name: string ): Promise<Specifications>;
    findByIds(ids: string[]): Promise<Specifications[]>;
    verifyById(id: string): Promise<Specifications>;
};

export { ICreateSpecificationDTO, ISpecificationsRepository };