import { isEqual } from "date-fns";
import Appointment from "../models/Appointment";

/**
 *
 */
interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

/**
 * Uma classe Repository, possui a interconexão entre a nossa persistência
 * de dados e o resto da aplicação. Basicamente, é quem lida com os dados.
 * Somente essa classe é responsável por trabalhar com os dados que são armazenados
 * por este mesmo.
 */
class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date)
    );

    return findAppointment || null;
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
