import IMailProvider from "../models/IMailProvider";

// Nosso provider sempre é executado uma unica vez.
// Inicialmente, para utilizar o EtherealMailProvider, inicialmente
// pricesamos criar uuma conta gratuita.
export default class EtherealMailProvider implements IMailProvider {
  constructor() {}

  public async sendMail(to: string, body: string): Promise<void> {}
}
