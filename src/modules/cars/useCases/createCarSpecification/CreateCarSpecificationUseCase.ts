import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppErrors } from "@shared/infra/http/error/AppErrors";
import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    specification_id: string[];
};

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,

        @inject("SpecificationsRepository")
        private specificationRepository: ISpecificationsRepository,
    ) { }
    async execute({ car_id, specification_id }: IRequest): Promise<Cars> {
        const existCar = await this.carsRepository.findById(car_id);

        if (!existCar) {
            throw new AppErrors("car doesn't exist!");
        };

        const specifications = await this.specificationRepository.findByIds(specification_id);

        existCar.specifications = specifications;

        await this.carsRepository.create(existCar);
        return existCar;
    };
};
export { CreateCarSpecificationUseCase };
