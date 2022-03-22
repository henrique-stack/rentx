import { ICreateRentalsDTO } from "../dtos/ICreateRentalsDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
    findOpenRentalByUser(user_id: string): Promise<Rental>;
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findByUser(user_id: string): Promise<Rental[]>;
    create(date: ICreateRentalsDTO): Promise<Rental>;
    findById(id: string): Promise<Rental>;
};

export { IRentalsRepository };