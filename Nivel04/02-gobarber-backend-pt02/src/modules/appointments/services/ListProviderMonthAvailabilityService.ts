// import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
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

    console.log(appointments);

    return [{ day: 1, available: false }];
  }
}

export default ListProviderMonthAvailabilityService;
