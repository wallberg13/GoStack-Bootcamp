import { startOfHour } from "date-fns";

import AppError from "@shared/errors/AppError";

// Não vale a pena o esforço de fazer o service enchegar um Appointments que não
// dependa dele.
import Appointment from "../infra/typeorm/entities/Appointment";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface IRequest {
  provider_id: string;
  date: Date;
}

/**
 * SOLI -D-
 * Dependacy Inversion Principe
 * O que é a inversão de dependências?
 * Ao invés do CreateAppointments depender de um arquivos, nós vamos fazer com o que quem
 * utilize o nosso arquivo dependa da nossa depêndencia.
 *
 */

class CreateAppointmentService {
  // Colocando o private dentro do parametro do constructor, essa variavel do appointmentsRepository
  // já vai está disponível no contexto.
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id
    );

    if (findAppointmentInSameDate) {
      throw new AppError("This appointment is already booked");
    }

    /**
     * O método create do TypeORM, ele cria uma instância do objeto dentro do banco
     * de dados, mas não salva, para salvar, basta um save.
     */
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    });

    return appointment;
  }
}

export default CreateAppointmentService;
