import { randomUUID as uuidV4 } from "crypto";
import createConnection from "../index";
import { hash } from "bcrypt";

async function create() {
    const id = uuidV4();
    const password = await hash("admin", 8);

    const connection = await createConnection("database")
    await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, drive_license)
    values('${id}', 'admin', 'admin@.com', '${password}', true, 'now()', 'RRR-RRR')`);

    await connection.close();
};
create().then(() => console.log(`user admin created!`));
