import { Router } from "express";
import { parseISO } from "date-fns";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";
/**
 * parseISO: transforma string de data para um formato nativo Date.
 * startOfHour: joga a data em questão, para o começo daquela hora.
 *
 * Uma rota não deve possuir a responsabilidade de se conectar com a fonte de
 * dados de uma aplicação.
 *
 * SoS: Separation of Concerns (Separação de Preocupações)
 *
 *
 * DTO - Data Transfer Object
 * -> Passando informações de um lugar para outro (ou de um arquivo para outro,
 *    em forma de objeto). Ainda mais, se esse dado não for único.
 * -> A muito interessante, do javascript, é a desestruturação. Transferir objetos de
 *    de um lugar para o outro, é sempre ótimo ter uma notação bem definida, e essa notação
 *    é através de objeto. E tal objeto, deve ser nomeado, para que os argumentos das
 *    funções não fiquem em uma forma gigante.
 *    -> Mudando os parâmetros nomeados
 *
 * -> Diferença entre chamar função por argumento e por objeto;
 *  -> por argumento, o editor só vai apontar os erros dizendo que falta
 *     quantidade x de argumentos.
 *  -> por objeto (parametros nomeados) (com a desestruturação), o erro é apontado diretamente na ferida,
 *     onde o mesmo diz, qual é o argumento que falta.
 */
const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get("/", (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

// Rota completa: http://localhost:3333/appointments/
appointmentsRouter.post("/", (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository
    );

    const appointment = createAppointment.execute({
      provider,
      date: parsedDate
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

/**
 * 1 - Separação entre transformação de dados e regra de negócio
 * 2 - A preocupação da rota, é receber requisição e retornar resposta.
 *     Essa resposta é obtida atrás de uma chamada de um service.
 * 3 - Dentro do service, foi criado um único método execute,
 * 4 - O service abstrai
 */
export default appointmentsRouter;
