import { EntityRepository, Repository } from "typeorm";
import Appointment from "../models/Appointment";

// Apontando o repositório para o Appointments
@EntityRepository(Appointment)
// Extendendo o repositorio dizendo que o tipo de dado que será operado sera o Appointment
class AppointmentsRepository extends Repository<Appointment> {
  /**
   * Função asincrona sempre retorna uma promise, e no TypeScript, isso tem que
   * está bem definido, quando o tipo de retorno da mesma.
   * @param date
   */
  public async findByDate(
    date: Date,
    provider_id: string
  ): Promise<Appointment | null> {
    // const findAppointment = this.appointments.find(appointment =>
    //   isEqual(date, appointment.date)
    // );
    // findOne é bem parecido com o MongoDB
    const findAppointment = await this.findOne({
      where: {
        date,
        provider_id
      }
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
