import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppErrors } from "@shared/infra/http/error/AppErrors";
import { inject, injectable } from "tsyringe";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

interface IRequest {
    user_id: string;
    car_id: string;
};

@injectable()
class CreateDevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
    ) { }

        async execute({ user_id }: IRequest): Promise<Rental> {
           const rental = await this.rentalRepository.findById(user_id);
           let minimun_dayle = 1;
           const car = await this.carsRepository.findById(rental.car_id);

           if(!rental) {
            throw new AppErrors("retal does not exists");
           };

           const dateNow = this.dateProvider.dateNow();

           let dayle = this.dateProvider.compareInDays(
            rental.start_date,
            dateNow
           )
           
           const delay = this.dateProvider.compareInHours(
            dateNow,
            rental.expected_return_date
           );

           if(dayle <= 0) {
               dayle = minimun_dayle;
           };

           let total = 0;
           if(delay > 0) {
               const calculate_fine = delay * car.fine_amount
                total = calculate_fine;
           };

           total += dayle * car.dayle_rate;

           rental.end_date = this.dateProvider.dateNow();
           rental.total = total;
        
           await this.rentalRepository.create(rental);
           await this.carsRepository.updateAvailable(car.id, true);

           return rental;
        };
};
export { CreateDevolutionRentalUseCase };
