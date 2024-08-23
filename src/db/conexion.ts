import { DataSource } from "typeorm/data-source/DataSource";
import { Estudiante } from "../models/estudiantesModel";
import { Profesor } from "../models/profesoresModel";
import { Curso } from "../models/cursoModel";

/* export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'MacBook-Air-de-Angel-2.local',
    port: 3306,
    username: 'root',
    password: 'Pato1234',
    database: 'cursos2',
    logging: true,
    entities: [Estudiante, Profesor, Curso],
    //synchronize: true
}); */

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'junction.proxy.rlwy.net',
    port: 40260,
    username: 'root',
    password: 'AXDBtOdwdjXUQnNnLRWNVtYboEcRCsNH',
    database: 'railway',
    logging: true,
    entities: [Estudiante, Profesor, Curso],
    //synchronize: true
});
