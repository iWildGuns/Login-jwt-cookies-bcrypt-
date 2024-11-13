import { DataSource } from "typeorm";
import { Users } from "./entity/Users";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "users",
  synchronize: true,
  logging: true,
  entities: [Users],
});
