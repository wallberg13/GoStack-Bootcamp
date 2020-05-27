import path from "path";
import crypto from "crypto";
import multer from "multer";

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

export default {
  // Local onde os arquivos "ficam".
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, "uploads"),
  // Armazenando as imagens em nuvem.
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
};
