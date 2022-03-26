import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { getRepository, Repository } from "typeorm";
import { Cars } from "../typeorm/entities/Cars";

export class CarsRepository implements ICarsRepository {
    private repository: Repository<Cars>;

    constructor() { 
        this.repository = getRepository(Cars);
    }
    ;
    
    async create({
        name,
        description,
        category_id,
        license_plate,
        brand,
        dayle_rate,
        available,
        specifications,
        fine_amount }: ICreateCarDTO): Promise<Cars> {
        const car = this.repository.create({
            name,
            description,
            category_id,
            available,
            license_plate,
            brand,
            fine_amount,
            specifications,
            dayle_rate
        });
        
        await this.repository.save(car);
        return car;
    };

    async findByLicensePlate(license_plate: string): Promise<Cars> {
        const car = await this.repository.findOne({license_plate});
        return car;
    };

    async findAvailable(
        brand?: string,
        name?: string,   
        category_id?: string,
    ): Promise<Cars[]> {
        const carsQuery = await this.repository.createQueryBuilder("c")
            .where("available = :available", { available: true });
            
        if (brand) {
            carsQuery.andWhere("brand = :brand", { brand });
        };

        if (name) {
            carsQuery.andWhere("name = :name", { name });
        };

        if (category_id) {
            carsQuery.andWhere("category_id = :category_id", { category_id });
        };
        
        const cars = await carsQuery.getMany();
        return cars;
    };
    
    async findById(id: string): Promise<Cars> {
        const car = await this.repository.findOne(id);
        return car;
    };

    async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
        .createQueryBuilder()
        .update()
        .set({ available })
        .where("id = :id")
        .setParameters({ id })
        .execute();
    };
};