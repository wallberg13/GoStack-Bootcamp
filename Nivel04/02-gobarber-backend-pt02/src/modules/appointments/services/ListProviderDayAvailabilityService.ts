import { inject, injectable } from "tsyringe";
import { getHours, isAfter } from "date-fns";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

// Forma de declarar um tipo.
type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

/**
 * [
 * {hour: 1, available: false},
 * {hour: 1, available: false},
 * {hour: 1, available: false},
 * ]
 */

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      { provider_id, year, month, day }
    );

    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        // Além do horario está disponível, a data do agendamento deve ser depois da data atual.
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate)
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
