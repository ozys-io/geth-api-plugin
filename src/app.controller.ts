import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("")
  healthCheck(): string {
    return "Ok";
  }

  @Post("importChainFromString")
  async importChainFromString(@Body("blockRlp") blockRlp: string): Promise<string> {
    return await this.appService.importChainFromString(blockRlp);
  }
}
