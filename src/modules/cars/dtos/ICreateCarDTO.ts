import { Specifications } from "../infra/typeorm/entities/Specifications";

 interface ICreateCarDTO {
    name: string;
    description: string;
    available?: boolean; 
    license_plate: string;
    dayle_rate: number;
    fine_amount: number;
    brand: string;
    category_id: string;
    specifications?: Specifications[];
};

export { ICreateCarDTO };