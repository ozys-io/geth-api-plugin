import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { exec } from "child_process";
import { Client } from "node-json-rpc";

@Injectable()
export class AppService implements OnModuleInit {
  client: Client;
  onModuleInit(): void {
    this.client = new Client({
      port: Number(process.env.RPC_PORT),
      host: process.env.RPC_HOST,
      strict: false,
    });
  }

  async importChainFromString(blockRlp: string): Promise<string> {
    const rlpFileName = "block.rlp";
    const base64String = Buffer.from(blockRlp.slice(2), "hex").toString("base64");
    await this.wrappedExec(`echo ${blockRlp} | base64 -d > ${rlpFileName}`);
    // https://geth.ethereum.org/docs/interacting-with-geth/rpc/ns-admin
    const result = await this.rpcCall({ jsonrpc: "2.0", method: "admin_importChain", params: [rlpFileName] });

    return blockRlp;
  }

  private rpcCall(rpc: { jsonrpc; method; params }) {
    return new Promise((resolve, reject) => {
      this.client.call(rpc, (error, res, stderr) => {
        if (error) {
          Logger.error(error, stderr);
          reject(error);
        }
        resolve(res);
      });
    });
  }

  private async wrappedExec(command: string): Promise<string> {
    return await new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error != null) {
          Logger.error(stderr, error);
          reject(error);
          return;
        }
        resolve(stdout);
      });
    });
  }
}
