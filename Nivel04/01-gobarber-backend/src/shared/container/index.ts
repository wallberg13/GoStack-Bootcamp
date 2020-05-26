import { container } from "tsyringe";

import "@modules/users/providers";
import "./providers";

/**
 * Quando utilizamos injeção de dependencias, alguem precisa fazer esse controle. Esse
 * kra é o container.
 */

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

// Garantindo que a variável que estamos passando no segundo parâmetro
// seja do mesmo tipo que o parâmetro de Tipagem, pois assim, ele não deixaria que isso acontecesse.
/**
 * Pq regiter Singleton: para a intância ser criada somente uma vez durante todo o ciclo de vida da aplicação.
 */
container.registerSingleton<IAppointmentsRepository>(
  "AppointmentsRepository",
  AppointmentsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
