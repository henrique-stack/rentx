import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import createConnection from "../index";

async function create() {
  const connection = await createConnection();

  const id = randomUUID();
  const password = await hash("admin", 8);

  await connection.query(
     `INSERT INTO USERS(id, name, email, password, avatar, "isAdmin", created_at, drive_license) 
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', null, true, 'now()', 'XXXXXX')`
  );

  await connection.close();
}

create().then(() => console.log("User admin created!"));
