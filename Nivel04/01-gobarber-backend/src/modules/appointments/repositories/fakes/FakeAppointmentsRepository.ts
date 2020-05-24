import { uuid } from "uuidv4";
import { isEqual } from "date-fns";

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import Appointment from "../../infra/typeorm/entities/Appointment";

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(
    date: Date,
    provider_id: string
  ): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date)
    );

    return findAppointment;
  }

  /**
   * Criando com a nossa função de criação de appointments somente em memoria.
   * Isso é bom, pois na hora de criar os testes, não precisamos executar
   * isso em banco de dados e sim localmente.
   * @param param0
   */
  public async create({
    date,
    provider_id
  }: ICreateAppointmentDTO): Promise<Appointment> {
    // Por mais que seja uma classe do typeorm, o Appointment
    // continua sendo uma classe tradicional do javascript.
    const appointment = new Appointment();

    /**
     * Função que permite "unir" um objeto com outras propriedades,
     * é a mesma coisa de fazer:
     * appointment.id = id
     */
    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
