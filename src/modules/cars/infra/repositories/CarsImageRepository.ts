import { ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";
import { CarsImage } from "../typeorm/entities/CarsImage";
import { Repository, getRepository } from "typeorm";

export class CarsImageRepository implements ICarImageRepository {
    private repository: Repository<CarsImage>;
     
    constructor() { this.repository = getRepository(CarsImage) };
 
    async create(car_id: string, image_name: string): Promise<CarsImage> {
        const carsImage = this.repository.create({
            image_name,
            car_id,
        });

        await this.repository.save(carsImage);
        return carsImage;
    };  
};