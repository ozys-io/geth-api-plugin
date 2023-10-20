import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config as dotenvConfig } from "dotenv";
import { ENV_PATH } from "./constants";

async function bootstrap() {
  dotenvConfig({ override: true, path: ENV_PATH });
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(process.env.PORT ?? 3000));
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
