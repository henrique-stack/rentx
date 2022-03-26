import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Cars } from "../infra/typeorm/entities/Cars";

export interface ICarsRepository {
    findById(id: string): Promise<Cars>;
    create(data: ICreateCarDTO): Promise<Cars>;
    findByLicensePlate(license_plate: string): Promise<Cars>;
    findAvailable(name?: string, brand?: string, category_id?: string): Promise<Cars[]>;
    updateAvailable(id: string, available?: boolean): Promise<void>; // did in format of return <void> because this
};                                                                   // method is only consult/update datas

//20 para 4;