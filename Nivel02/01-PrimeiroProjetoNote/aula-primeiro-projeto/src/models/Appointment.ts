import { uuid } from "uuidv4";

/**
 * Conceito novo do TS, o Omit na constructor.
 * O Omit serve para excluir uma propriedade dentro de um tipo (tirando
 * dele a sua obrigatoriedade).
 */
class Appointment {
  id: string;

  provider: string;

  date: Date;

  constructor({ provider, date }: Omit<Appointment, "id">) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
