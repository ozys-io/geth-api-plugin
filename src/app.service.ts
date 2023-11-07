import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { exec } from "child_process";
import { Client } from "node-json-rpc";
import * as fs from "fs";

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
    const rlpFilePath = process.env.RLP_FILE_DIR;
    const base64String = Buffer.from(blockRlp.slice(2), "hex").toString("base64");
    fs.writeFileSync(rlpFileName, base64String);
    await this.wrappedExec(`cat ${rlpFileName} | base64 -d > ${rlpFileName}`);
    // https://geth.ethereum.org/docs/interacting-with-geth/rpc/ns-admin
    try {
      const result = String(await this.rpcCall({ jsonrpc: "2.0", method: "admin_importChain", params: [`${rlpFilePath}/${rlpFileName}`] }));
      return result;
    } catch (e) {
      return (e as Error).message;
    }
  }

  private rpcCall(rpc: { jsonrpc; method; params }) {
    return new Promise((resolve, reject) => {
      let result;
      let err;
      this.client.call(rpc, (error, res, stderr) => {
        err = error;
        result = res;
        if (error) {
          Logger.error(error, stderr);
        }
        return;
      });
      if (err) reject(err);
      resolve(result);
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
