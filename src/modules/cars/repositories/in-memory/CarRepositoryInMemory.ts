import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarsRepository } from "../ICarsRepository";

class CarRepositoryInMemory implements ICarsRepository {
    cars: Cars[] = [];

    async create({
        name,
        description,
        license_plate,
        dayle_rate,
        fine_amount,
        brand,
        category_id
    }: ICreateCarDTO): Promise<Cars> {
        const car = new Cars();

        Object.assign(car, {
            name,
            description,
            license_plate,
            dayle_rate,
            fine_amount,
            brand,
            category_id
        });

        this.cars.push(car);
        return car;
    };

    async findByLicensePlate(license_plate: string): Promise<Cars> {
        return this.cars.find(car => car.license_plate === license_plate);
    };

    async findAvailable(name?: string, brand?: string, category_id?: string): Promise<Cars[]> {
        const all = this.cars.filter(car => { 
                if (
                car.available === true ||
                name && (car.name === name ) || 
                brand && (car.brand === brand) ||
                category_id && (car.category_id === category_id)) {
                    return car;
                };
                return null;
            });
        return all;
    };

    async findById(id: string): Promise<Cars> {
        return this.cars.find((cars) => cars.id === id);
    };

    async updateAvailable(id: string): Promise<Cars> {
        return this.cars.find(cars => cars.id === id);
    };
};

export { CarRepositoryInMemory };