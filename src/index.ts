import app from "./app";
import { AppDataSource } from "./db/conexion";

async function main(){
    try {
        await AppDataSource.initialize();
        console.log("Database is connected");
        app.listen(3500, () => {
            console.log("Server is running on http://localhost:3500");
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
    
}

main();