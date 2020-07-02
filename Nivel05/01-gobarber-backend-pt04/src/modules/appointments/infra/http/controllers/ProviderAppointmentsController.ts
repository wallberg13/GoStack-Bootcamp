import { Request, Response } from "express";
import { container } from "tsyringe";

import ListProviderAppointmentsService from "@modules/appointments/services/ListProviderAppointmentsService";

export default class ProviderAppointmensController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: provider_id } = request.user;
    const { day, month, year } = request.query;

    const listProviders = container.resolve(ListProviderAppointmentsService);

    const appointments = await listProviders.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
      day: Number(day)
    });

    return response.json(appointments);
  }
}
