import { Specifications } from "@modules/cars/infra/typeorm/entities/Specifications";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListSpecificationsUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specifationRepository: ISpecificationsRepository
    ) {}
    async execute(): Promise<Specifications[]> {
    const specifications = await this.specifationRepository.list();
    
    return specifications;
    };
};

export { ListSpecificationsUseCase };