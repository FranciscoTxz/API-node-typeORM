import { Request, Response } from "express";

class EstudiantesController {
    constructor(){

    }

    consultar(req: Request, res: Response){
        try {
            res.json({ message: "Consultar" });
        } catch (err) {
            if (err instanceof Error){
                res.status(500).send(err.message); 
            }
        }
    }

    consultarDetalle(req: Request, res: Response){
        try {
            res.json({ message: "Consultar detalle" });
        } catch (err) {
            if (err instanceof Error){
                res.status(500).send(err.message); 
            }
        }
    }

    ingresar(req: Request, res: Response){
        try {
            res.json({ message: "Ingresar" });
        } catch (err) {
            if (err instanceof Error){
                res.status(500).send(err.message); 
            }
        }
    }

    actualizar(req: Request, res: Response){
        const {id} = req.params;
        try {
            res.json({ message: "Actualizar" });
        } catch (err) {
            if (err instanceof Error){
                res.status(500).send(err.message); 
            }
        }
    }

    borrar(req: Request, res: Response){
        const {id} = req.params;
        try {
            res.json({ message: "Borrar" });
        } catch (err) {
            if (err instanceof Error){
                res.status(500).send(err.message); 
            }
        }
    }
}

export default new EstudiantesController();