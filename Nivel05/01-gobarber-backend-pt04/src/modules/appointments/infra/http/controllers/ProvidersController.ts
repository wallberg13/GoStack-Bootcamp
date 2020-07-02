import { Request, Response } from "express";
import { container } from "tsyringe";

import ListProvidersService from "@modules/appointments/services/ListProvidersService";

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    let providers = await listProviders.execute({
      user_id
    });

    providers = providers.map(provider => {
      const auxProv = provider;
      delete auxProv.password;
      return auxProv;
    });

    return response.json(providers);
  }
}
