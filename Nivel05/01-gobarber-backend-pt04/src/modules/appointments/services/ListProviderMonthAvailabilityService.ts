import { inject, injectable } from "tsyringe";
import { getDaysInMonth, getDate } from "date-fns";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

// import User from "@modules/users/infra/typeorm/entities/User";
// import IUsersRepository from "@modules/users/repositories/IUsersRepository";

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

// Forma de declarar um tipo.
type IResponse = Array<{
  day: number;
  available: boolean;
}>;

/**
 * [
 * {day: 1, available: false},
 * {day: 1, available: false},
 * {day: 1, available: false},
 * ]
 */

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    year,
    month
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      { provider_id, year, month }
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    // Função para criar um array com um tamanho e
    // função de criação.
    const eachDayArray = Array.from(
      {
        length: numberOfDaysInMonth
      },
      (_, index) => index + 1
    );

    // 8 até 17hrs.
    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        // Modo Gambiarra
        available: appointmentsInDay.length < 10
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
