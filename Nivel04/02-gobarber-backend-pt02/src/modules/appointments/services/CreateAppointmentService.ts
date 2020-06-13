import { startOfHour } from "date-fns";
import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";

// Não vale a pena o esforço de fazer o service enchegar um Appointments que não
// dependa dele.
import Appointment from "../infra/typeorm/entities/Appointment";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface IRequest {
  provider_id: string;
  user_id: string;
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

/**
 * Marcando a classe como injetável.
 * Esse decorator é sempre necessário para quando precisamos fazer alguma injeção
 * dentro do arquivo.
 */
@injectable()
class CreateAppointmentService {
  // Colocando o private dentro do parametro do constructor, essa variavel do appointmentsRepository
  // já vai está disponível no contexto.
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    user_id,
    date
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (provider_id === user_id) {
      throw new AppError(
        "The provider of appointment not should be the same user."
      );
    }

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
      user_id,
      date: appointmentDate
    });

    return appointment;
  }
}

export default CreateAppointmentService;
