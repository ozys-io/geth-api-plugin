import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config as dotenvConfig } from "dotenv";
import { ENV_PATH } from "./constants";
import { json, urlencoded } from "express";

async function bootstrap() {
  dotenvConfig({ override: true, path: ENV_PATH });
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ limit: "50mb", extended: true }));

  await app.listen(Number(process.env.PORT ?? 3000));
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
