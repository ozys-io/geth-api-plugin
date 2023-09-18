import { Body, Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("importChainFromString")
  async importChainFromString(@Body("blockRlp") blockRlp: string): Promise<string> {
    return await this.appService.importChainFromString(blockRlp);
  }
}
