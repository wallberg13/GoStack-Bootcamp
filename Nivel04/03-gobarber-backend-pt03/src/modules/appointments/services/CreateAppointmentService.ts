import { startOfHour, isBefore, getHours, format } from "date-fns";
import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";

// Não vale a pena o esforço de fazer o service enchegar um Appointments que não
// dependa dele.
import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
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
    private appointmentsRepository: IAppointmentsRepository,

    @inject("NotificationsRepository")
    private notificationsRepository: INotificationsRepository,

    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    provider_id,
    user_id,
    date
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }

    if (provider_id === user_id) {
      throw new AppError("You can't create an appointment with yourself.");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        "You can only create appointments between 8am and 5pm"
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

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");
    // Criando a notificação para o usuário
    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormatted}`
    });

    const cacheKey = `provider-appointments:${provider_id}:${format(
      appointmentDate,
      "yyyy-M-d"
    )}`;

    await this.cacheProvider.invalidate(cacheKey);

    return appointment;
  }
}

export default CreateAppointmentService;
