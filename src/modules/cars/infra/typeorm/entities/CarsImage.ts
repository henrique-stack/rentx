import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
// esses nomes com '@' são as notations, são elas que utilizamos para especificar,
// configurar algo que vai para a tabela no banco de dados. e fazer relações entre tabelas etc...

@Entity("cars_image")
class CarsImage {
    @PrimaryColumn()
    id: string;

    @Column()
    car_id: string;

    @Column()
    image_name: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
    if(!this.id) {
    this.id = uuidV4();
    };
  };
};

export { CarsImage };