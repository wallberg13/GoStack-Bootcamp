import { startOfHour } from "date-fns";
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

/**
 * Dependency Inversion (SOLID): Inversão de dependências (ou injeção??)
 *
 * Sempre que o nosso service tiver uma dependência externa, ao
 * invés de instanciarmos uma nova classe de repositório no service, essa
 * dependência é passada como parametro no nosso contructor.
 */

/**
 * [x] Recebimento das informações
 * [x] Tratativas de erros/excessões
 * [x] Acesso ao repositório
 */

/**
 * SOLID
 * S : Single Responsability Principe -> Principio da Responsabilidade Unica
 * O :
 * L :
 * I :
 * D : Dependency Invertion Principe -> Principio da Inversão de dependência. A
 *     dependência é injetada, e eu não preciso criar muitas instâncias de um repositório.
 */

/**
 * Requisição provinda da rota / requisição.
 */
interface Request {
  provider: string;
  date: Date;
}

/**
 * Todo service possui apenas um único método
 */
class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw Error("This appointment is already booked");
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate
    });

    return appointment;
  }
}

export default CreateAppointmentService;
