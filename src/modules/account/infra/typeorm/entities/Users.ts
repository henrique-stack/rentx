import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
class Users {   
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    isAdmin: boolean;

    @Column()
    type: 'text';
    avatar: string;

    @Column()
    drive_license: string;

    @CreateDateColumn()
    created_at: Date;
    
    constructor() {
        if(!this.id) {
            this.id = uuidV4();
        };
    };
};

export { Users };