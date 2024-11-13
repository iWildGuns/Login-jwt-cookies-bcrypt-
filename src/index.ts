import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./db";

const PORT = process.env.PORT ?? 3000;

async function main() {
  try {
    await AppDataSource.initialize();
    console.log(`database connected...`);
    app.listen(PORT, () =>
      console.log(`server listening in port http://localhost${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
}

main();
