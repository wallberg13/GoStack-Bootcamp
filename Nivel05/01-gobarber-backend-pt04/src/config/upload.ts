import path from "path";
import crypto from "crypto";
import multer, { StorageEngine } from "multer";

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

interface IUploadConfig {
  driver: "s3" | "disk";
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,
  // Local onde os arquivos "ficam".
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, "uploads"),
  // Armazenando as imagens em nuvem.

  multer: {
    storage: multer.diskStorage({
      // Onde os arquivos irao ficar
      destination: tmpFolder,
      // Nome do arquivo que será padrão
      // gerando uma funcao
      filename(request, file, callback) {
        // Gerando string aleatória
        const fileHash = crypto.randomBytes(10).toString("HEX");
        // padrão do nome do arquivo.
        const fileName = `${fileHash}-${file.originalname}`;

        console.log("Upload de Arquivo");
        return callback(null, fileName);
      }
    })
  },

  config: {
    aws: {
      bucket: "app-gobarber-wall"
    }
  }
} as IUploadConfig;
