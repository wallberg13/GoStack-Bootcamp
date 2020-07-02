import { Request, Response } from "express";
import { container } from "tsyringe";

import ListProviderAppointmentsService from "@modules/appointments/services/ListProviderAppointmentsService";

export default class ProviderAppointmensController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: provider_id } = request.user;
    const { day, month, year } = request.body;

    const listProviders = container.resolve(ListProviderAppointmentsService);

    const appointments = await listProviders.execute({
      provider_id,
      year,
      month,
      day
    });

    return response.json(appointments);
  }
}
