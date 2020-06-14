import { Request, Response } from "express";
import { parseISO } from "date-fns";
import { container } from "tsyringe";

import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const { id: user_id } = request.user;
    const parsedDate = parseISO(date);

    // Como nao tenho mais a injecao de dependencias, removo o que precisava passar como parâmetro
    // E ao inves de criar um objeto, eu faço um resolve, e a classe que estou colocando.
    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      user_id,
      provider_id,
      date: parsedDate
    });

    return response.json(appointment);
  }
}
