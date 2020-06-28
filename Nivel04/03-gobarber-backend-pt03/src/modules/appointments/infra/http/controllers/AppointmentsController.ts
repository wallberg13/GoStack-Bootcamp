import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const { id: user_id } = request.user;
    // const parsedDate = parseISO(date);

    // O Joi acaba já convertendo a nossa data para o formato correto, e portanto,
    // não precisamos mais utilziar o parseISO

    // Como nao tenho mais a injecao de dependencias, removo o que precisava passar como parâmetro
    // E ao inves de criar um objeto, eu faço um resolve, e a classe que estou colocando.
    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      user_id,
      provider_id,
      date
    });

    return response.json(appointment);
  }
}
