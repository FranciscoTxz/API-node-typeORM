import express from "express";
import cors from "cors";
import morgan from "morgan";

import estudiantesRoutes from './routes/estudiantesRoutes';
import profesoresRoutes from './routes/profesoresRoutes';
import cursosRoutes from './routes/cursosRoutes';

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
    res.json({ error: "---404---" });
});

app.use('/estudiantes', estudiantesRoutes);
app.use('/profesores', profesoresRoutes);
app.use('/cursos', cursosRoutes);

app.listen(3500, () => {
    console.log("Server is running on http://localhost:3500");
});