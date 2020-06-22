import { container } from "tsyringe";
import mailConfig from "@config/mail";

import IStorageProvider from "./StorageProvider/models/IStorageProvider";
import DiskStorageProvider from "./StorageProvider/implementations/DiskStorageProvider";

import IMailProvider from "./MailProvider/models/IMailProvider";
import EtherealMailProvider from "./MailProvider/implementations/EtherealMailProvider";
import SESMailProvider from "./MailProvider/implementations/SESMailProvider";

import IMailTemplateProvider from "./MailTemplateProvider/models/IMailTemplateProvider";
import HandlebarsMailTemplateProvider from "./MailTemplateProvider/implementations/HandlebarsMailTemplateProvider";

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  DiskStorageProvider
);

// Como o MailProvider depende do MailTemplateProvider, o mesmo deve vim após
// ao MailTemplateProvider para obedecer a ordem das dependências.
container.registerSingleton<IMailTemplateProvider>(
  "MailTemplateProvider",
  HandlebarsMailTemplateProvider
);

const mailDriver = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider)
};

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailDriver[mailConfig.driver]
);
