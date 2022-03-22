import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuidV4} from "uuid"; 

@Entity("rentals")
class Rental {
    @PrimaryColumn()
    id: string; 
    
    @ManyToOne(() => Cars)
    @JoinColumn({ name: "car_id" })
    car: Cars;

    @Column()
    car_id: string;
    
    @Column()
    user_id: string;
    
    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    total: number;

    @Column()
    expected_return_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidV4();
        };
    };
};
export { Rental };