import app from "./app";
import { AppDataSource } from "./db/conexion";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;

async function main(){
    try {
        await AppDataSource.initialize();
        console.log("Database is connected");
        app.listen(port, () => {
            console.log("Server is running on port:" + port);
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
}

main();