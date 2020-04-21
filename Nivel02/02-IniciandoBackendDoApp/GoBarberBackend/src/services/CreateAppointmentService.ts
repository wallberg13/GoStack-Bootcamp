import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import AppError from "../errors/AppError";

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
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
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    });

    /**
     * Agora de fato, a informação será gravada dentro do banco de dados.
     */
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
