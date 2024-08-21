import { Request, Response } from "express";
import { AppDataSource } from "../db/conexion";
import { Curso } from "../models/cursoModel";
import { Profesor } from "../models/profesoresModel";
import { Estudiante } from "../models/estudiantesModel";

class CursosController {
    constructor() {

    }

    async consultar(req: Request, res: Response) {
        try {
            const data = await AppDataSource.manager.find(Curso, { relations: ['profesor', 'estudiantes'] });
            if (data.length === 0) {
                res.status(404).json({ message: "No hay cursos" });
            }
            else {
                res.status(200).json({ OK: data });
            }
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async consultarDetalle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const registro = await AppDataSource.manager.findOne(Curso, { where: { id: Number(id) }, relations: ['profesor', 'estudiantes']  });
            if (registro) {
                res.status(200).json({ OK: registro });
            }
            else {
                res.status(404).json({ message: "Curso no encontrado" });
            }
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async ingresar(req: Request, res: Response) {
        try {
            const validar = await AppDataSource.manager.findOne(Profesor, { where: { id: req.body.profesor } });
            if (!validar) {
                res.status(404).json({ message: "Profesor no encontrado" });
                return;
            }
            else {
                const registro = await AppDataSource.manager.save(Curso, req.body);
                if (registro) {
                    res.status(201).json({ OK: registro });
                }
                else {
                    res.status(404).json({ Error: "Curso no ingresado" });
                }
            }
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async actualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const validar = await AppDataSource.manager.findOne(Profesor, { where: { id: req.body.profesor } });
            if (!validar) {
                res.status(404).json({ message: "Profesor no encontrado" });
                return;
            }
            else {
                const registro = await AppDataSource.manager.update(Curso, id, req.body);
                if (registro.affected != 0) {
                    res.status(200).json({ OK: "Curso actualizado" });
                }
                else {
                    res.status(404).json({ message: "Curso no encontrado" });
                }
            }
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async borrar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const registro = await AppDataSource.manager.delete(Curso, id);
            if (registro.affected != 0) {
                res.status(200).json({ OK: "Curso eliminado" });
            }
            else {
                res.status(404).json({ message: "Curso no encontrado" });
            }
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async asociarEstudiante(req: Request, res: Response) {
        try {
            const estudiante = await AppDataSource.manager.findOne(Estudiante, { where: { id: req.body.estudiante_id } });
            const curso = await AppDataSource.manager.findOne(Curso, { where: { id: req.body.curso_id } });
            if (!estudiante) {
                res.status(404).json({ message: "Estudiante no encontrado" });
                return;
            }
            if (!curso) {
                res.status(404).json({ message: "Curso no encontrado" });
                return;
            }

            console.log('llega');
            
            curso.estudiantes = curso.estudiantes || [];
            curso.estudiantes.push(estudiante);

            const registro = await AppDataSource.manager.save(curso);

            if (registro) {
                res.status(200).json({ OK: "Estudiante asociado al curso" });
            }
            else {
                res.status(400).json({ message: "Estudiante no asociado al curso" });
            }

        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

}

export default new CursosController();