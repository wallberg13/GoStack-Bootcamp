import { container } from "tsyringe";

import IMailTemplateProvider from "./models/IMailTemplateProvider";
import HandlebarsMailTemplateProvider from "./implementations/HandlebarsMailTemplateProvider";

// Como o MailProvider depende do MailTemplateProvider, o mesmo deve vim após
// ao MailTemplateProvider para obedecer a ordem das dependências.

container.registerSingleton<IMailTemplateProvider>(
  "MailTemplateProvider",
  HandlebarsMailTemplateProvider
);
