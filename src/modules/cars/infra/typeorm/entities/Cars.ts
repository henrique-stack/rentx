import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Specifications } from "./Specifications";
import { Categories } from "./Categories";
import { randomUUID } from "crypto";

@Entity("cars")
class Cars {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    available: boolean;

    @Column()
    license_plate: string;

    @Column()
    dayle_rate: number;

    @Column()
    fine_amount: number;

    @Column()
    brand: string;

    @Column()
    category_id: string;
    
    @ManyToOne(() => Categories)
    @JoinColumn({ name: "category_id" })
    category: Categories;

    @ManyToMany(() => Specifications)
    @JoinTable({
    name: "specifications_car",
    joinColumns: [{ name: "car_id" }],
    inverseJoinColumns: [{ name: "specification_id" }]
    })
    specifications: Specifications[];

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = randomUUID();
            this.available = true;
        };
    };
};

export { Cars };