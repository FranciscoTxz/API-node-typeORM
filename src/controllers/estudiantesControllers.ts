import { Request, Response } from "express";
import { Estudiante } from "../models/estudiantesModel";
import { AppDataSource } from "../db/conexion";


class EstudiantesController {
    constructor(){
    }

    async consultar(req: Request, res: Response){
        try {
            const data = await AppDataSource.manager.find(Estudiante);
            if (data.length === 0){
                res.status(404).json({ message: "No hay registros" });
            }
            else {
                res.status(200).json({OK: data});
            }
        } catch (err) {
            if (err instanceof Error){
                res.status(500).send(err.message); 
            }
        }
    }

    async consultarDetalle(req: Request, res: Response){
        try {
            const {id} = req.params;
            const registro = await AppDataSource.manager.findOne(Estudiante, { where: { id: Number(id) } });
            if (registro){
                res.status(200).json({OK: registro});
            }
            else {
                res.status(404).json({ message: "Estudiante no encontrado" });
            }
        } catch (err) {
            if (err instanceof Error){
                res.status(500).send(err.message); 
            }
        }
    }

    async ingresar(req: Request, res: Response){
        try {
            const registro = await AppDataSource.manager.save(Estudiante, req.body);
            if (registro){
                res.status(201).json({OK: registro});
            }
            else {
                res.status(404).json({ Error: "Estudiante no ingresado" });
            }
        } catch (err) {
            if (err instanceof Error){
                res.status(500).send(err.message); 
            }
        }
    }

    async actualizar(req: Request, res: Response){
        try {
            const {id} = req.params;
            const registro = await AppDataSource.manager.update(Estudiante, {id: Number(id)}, req.body);
            if (registro.affected != 0){
                res.status(200).json({OK: "Estudiante actualizado"});
            }
            else {
                res.status(404).json({ message: "Estudiante no encontrado" });
            }
        } catch (err) {
            if (err instanceof Error){
                res.status(500).send(err.message); 
            }
        }
    }

    async borrar(req: Request, res: Response){
        try {
            const {id} = req.params;
            const registro = await AppDataSource.manager.delete(Estudiante, {id: Number(id)});
            if (registro.affected != 0){
                res.status(200).json({ OK: "Estudiante eliminado" });
            }
            else {
                res.status(404).json({ message: "Estudiante no encontrado" });
            }
        } catch (err) {
            if (err instanceof Error){
                res.status(500).send(err.message); 
            }
        }
    }
}

export default new EstudiantesController();