import { CarsImage } from "../infra/typeorm/entities/CarsImage";

interface ICarImageRepository {
    create(car_id: string, name_image: string): Promise<CarsImage>;
};

export { ICarImageRepository };