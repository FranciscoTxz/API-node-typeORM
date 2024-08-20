import { DataSource } from "typeorm/data-source/DataSource";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'MacBook-Air-de-Angel-2.local',
    port: 3306,
    username: 'root',
    password: 'Pato1234',
    database: 'cursos',
    logging: true,
    entities: [],
});
