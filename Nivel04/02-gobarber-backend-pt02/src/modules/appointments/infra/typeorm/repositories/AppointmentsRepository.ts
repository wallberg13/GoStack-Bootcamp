import { getRepository, Repository, Raw } from "typeorm";

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IFindAllInMonthFromProviderDTO from "@modules/appointments/dtos/IFindAllInMonthFromProviderDTO";
import IFindAllInDayFromProviderDTO from "@modules/appointments/dtos/IFindAllInDayFromProviderDTO";
import Appointment from "../entities/Appointment";

// Liskov Substitution Principle
// Camadas de integrações com outras aplicações podem ser substituido
// definindo um conjunto de regras.
// O service não deve saber como os dados estão sendo persistidos na aplicação

// Apontando o repositório para o Appointments
// Extendendo o repositorio dizendo que o tipo de dado que será operado sera o Appointment
class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  /**
   * Função asincrona sempre retorna uma promise, e no TypeScript, isso tem que
   * está bem definido, quando o tipo de retorno da mesma.
   * @param date
   */
  public async findByDate(
    date: Date,
    provider_id: string
  ): Promise<Appointment | undefined> {
    // const findAppointment = this.appointments.find(appointment =>
    //   isEqual(date, appointment.date)
    // );
    // findOne é bem parecido com o MongoDB
    const findAppointment = await this.ormRepository.findOne({
      where: {
        date,
        provider_id
      }
    });

    return findAppointment || undefined;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, "0");

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        // Dentro do TypeORM, os campos podem ser gerados com prefixos
        // diferentes, e dentro desse Raw (que é um cara que faz querySQL pura) consegue
        // pegar a assinatura do campo interno.
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
        )
      }
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    month,
    year,
    day
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, "0");
    const parsedMonth = String(month).padStart(2, "0");

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
        )
      }
    });

    return appointments;
  }

  /**
   * Criando o nosso repositório que seja "independente" do typeorm, e que
   * os nossos services possam utilizar sem medo de ser feliz.
   */
  public async create({
    date,
    provider_id
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ date, provider_id });
    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
