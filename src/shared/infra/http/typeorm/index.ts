import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "localhost"): Promise<Connection> => {
  const defaultConnection = await getConnectionOptions();

  return await createConnection(
    Object.assign(defaultConnection, {
      host: process.env.NODE_ENV === 'test' ? "localhost" : host,
      database: process.env.NODE_ENV === 'test' ? "rentx_test" : defaultConnection.database
     }),
  );
};