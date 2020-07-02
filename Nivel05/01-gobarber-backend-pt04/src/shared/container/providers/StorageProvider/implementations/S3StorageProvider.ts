import fs from "fs";
import path from "path";
import { lookup } from "mime-types";
import aws, { S3 } from "aws-sdk";
import uploadConfig from "@config/upload";
import IStorageProvider from "../models/IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: "us-east-1"
    });
  }

  public async saveFile(file: string): Promise<string> {
    // Preciso do meu arquivo original
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = lookup(originalPath);

    if (!ContentType) {
      throw new Error("File not found");
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket, // Qual bucket vamos utilizar
        Key: file, // qual é o nome da chave do arquivo que iremos adicionar
        ACL: "public-read", // Quais permissões o nosso arquivo vai ter
        Body: fileContent, // Conteúdo do arquivo
        ContentType // Tipo de dado do arquivo.
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file
      })
      .promise();
  }
}

export default S3StorageProvider;
