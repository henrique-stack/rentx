import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";
import { inject, injectable } from "tsyringe";

interface IRequest {
    category_id?: string;
    name?: string;
    brand?: string;
};

@injectable()
export class ListAvailableCarsUseCase {
    constructor(
        @inject("ListAvailableCars")  
        private carsRepository: ICarsRepository
        ) { }

    async execute({ category_id, name, brand }: IRequest): Promise<Cars[]> {
    const cars = await this.carsRepository.findAvailable(
        category_id,
        name,
        brand
    );
    return cars;
    };
};
