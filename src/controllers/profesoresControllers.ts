import { Request, Response } from "express";
import { AppDataSource } from "../db/conexion";
import { Profesor } from "../models/profesoresModel";

class ProfesoresController {
    constructor(){

    }

    async consultar(req: Request, res: Response){
        try {
            const data = await AppDataSource.manager.find(Profesor);
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
            const registro = await AppDataSource.manager.findOne(Profesor, { where: { id: Number(id) } });
            if (registro){
                res.status(200).json({OK: registro});
            }
            else {
                res.status(404).json({ message: "Profesor no encontrado" });
            }
        } catch (err) {
            if (err instanceof Error){
                res.status(500).send(err.message); 
            }
        }
    }

    async ingresar(req: Request, res: Response){
        try {
            const registro = await AppDataSource.manager.save(Profesor, req.body);
            if (registro){
                res.status(201).json({OK: registro});
            }
            else {
                res.status(404).json({ Error: "Profesor no ingresado" });
            }
        } catch (err) {
            if (err instanceof Error){
                res.status(500).send(err.message); 
            }
        }
    }

    async actualizar(req: Request, res: Response){
        const {id} = req.params;
        try {
            const registro = await AppDataSource.manager.findOne(Profesor, { where: { id: Number(id) } });
            if (registro){
                await AppDataSource.manager.update(Profesor, id, req.body);
                res.status(200).json({OK: "Profesor actualizado"});
            }
            else {
                res.status(404).json({ message: "Profesor no encontrado" });
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
            const registro = await AppDataSource.manager.findOne(Profesor, { where: { id: Number(id) } });
            if (registro){
                await AppDataSource.manager.delete(Profesor, id);
                res.status(200).json({OK: "Profesor eliminado"});
            }
            else {
                res.status(404).json({ message: "Profesor no encontrado" });
            }
        } catch (err) {
            if (err instanceof Error){
                res.status(500).send(err.message); 
            }
        }
    }
}

export default new ProfesoresController();