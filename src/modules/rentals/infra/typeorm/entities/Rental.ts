import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Cars } from "../../../../cars/infra/typeorm/entities/Cars"
import { randomUUID } from "crypto";

@Entity("rental")
class Rental {
    @PrimaryColumn()
    id: string; 

    @Column()
    car_id: string;

    @Column()
    user_id: string;
    
    @ManyToOne(() => Cars)
    @JoinColumn({ name: "car_id"})
    car: Cars;

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
            this.id = randomUUID()
        };
    };
};

export { Rental };