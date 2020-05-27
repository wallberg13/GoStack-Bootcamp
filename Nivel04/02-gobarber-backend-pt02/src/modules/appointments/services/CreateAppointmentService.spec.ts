import AppError from "@shared/errors/AppError";
import FakeAppointmentRepository from "../repositories/fakes/FakeAppointmentsRepository";
import CreateAppointmentService from "./CreateAppointmentService";

// CI - Continuos Integrations - Executar Teste
// Um teste unitário não pode depender de nada além dele mesmo.
// Testes unitários não tocam no banco de dados, eles devem ser isolados.
// Para nao fazer esse toque, vamos criar um fake repository.

// Describe cria uma categoria de teste
// Os decorators não muda em nada a nossa classe.
describe("CreateAppointment", () => {
  // IT - isso, isto
  // Serve como o test
  it("should be able to create a new appointment", async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository /* Disallow inconsistently-cased references to the same file. */
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: "1231231231"
    });

    // qual resultado estou esperando?
    expect(appointment).toHaveProperty("id");
    expect(appointment.provider_id).toBe("1231231231");
  });

  it("should not be able to create two appointment on the same time", async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository /* Disallow inconsistently-cased references to the same file. */
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: "1231231231"
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: "1231231231"
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
