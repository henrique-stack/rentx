import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Users } from "./Users";
import { randomUUID as uuid } from "crypto";

@Entity("users_tokens")
class UserTokens {
  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;
  
  @Column()
  user_id: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "user_id"})
  user: Users;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  create_at: Date;

  constructor() {
      if(!this.id) {
          this.id = uuid()
      };
  };
};

export { UserTokens };