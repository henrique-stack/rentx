import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { AppErrors } from "@shared/infra/http/error/AppErrors";
import { inject, injectable } from "tsyringe";

dayjs.extend(utc); 

interface IRequest {
    car_id: string;
    user_id: string;
    expected_return_date: Date;
};

@injectable()
class CreateRentalsUseCase {
    constructor(
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
    ) { }
    async execute({car_id, user_id, expected_return_date}: IRequest): Promise<Rental> {
        const minimumHour = 24;
        const carUnvailable = await this.rentalsRepository.findOpenRentalByCar(car_id);
        
        if(carUnvailable) {
            throw new AppErrors("car unavailable");
        };

        const rentalOpenToUse = await this.rentalsRepository.findOpenRentalByUser(user_id);
        
        if(rentalOpenToUse) {
            throw new AppErrors("there's a rental in progress for another user");
        };

        const dateStart = this.dateProvider.dateNow();
        const compare = this.dateProvider.compareInHours(
            dateStart,
            expected_return_date,
        );

        if(compare < minimumHour){
            throw new AppErrors("Invalid return time!");
        };

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });
        return rental;
    };
};

export { CreateRentalsUseCase };