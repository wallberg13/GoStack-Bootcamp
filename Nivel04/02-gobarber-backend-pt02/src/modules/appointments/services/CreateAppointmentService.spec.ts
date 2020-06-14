import AppError from "@shared/errors/AppError";
import FakeAppointmentRepository from "../repositories/fakes/FakeAppointmentsRepository";
import CreateAppointmentService from "./CreateAppointmentService";

// CI - Continuos Integrations - Executar Teste
// Um teste unitário não pode depender de nada além dele mesmo.
// Testes unitários não tocam no banco de dados, eles devem ser isolados.
// Para nao fazer esse toque, vamos criar um fake repository.

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

// Describe cria uma categoria de teste
// Os decorators não muda em nada a nossa classe.
describe("CreateAppointment", () => {
  // IT - isso, isto
  // Serve como o test

  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository /* Disallow inconsistently-cased references to the same file. */
    );
  });

  it("should be able to create a new appointment", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      const date = new Date(2020, 4, 10);
      return date.getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 5, 13, 15),
      user_id: "user_id",
      provider_id: "provider_id"
    });

    // qual resultado estou esperando?
    expect(appointment).toHaveProperty("id");
    expect(appointment.provider_id).toBe("provider_id");
  });

  it("should not be able to create two appointment on the same time", async () => {
    jest.spyOn(Date, "now").mockImplementation(() => {
      const date = new Date(2020, 4, 10);
      return date.getTime();
    });

    const appointmentDate = new Date(2020, 5, 13, 10);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: "user_id",
      provider_id: "provider_id"
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: "user_id",
        provider_id: "provider_id"
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create an appointment on a past date", async () => {
    jest.spyOn(Date, "now").mockImplementation(() => {
      const date = new Date(2020, 4, 16);
      return date.getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 12),
        user_id: "user_id",
        provider_id: "provider_id"
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create an appointment with same user as provider", async () => {
    const appointmentDate = new Date();
    appointmentDate.setHours(appointmentDate.getHours() + 5); // Garantindo sempre esta no futuro

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: "user-id",
        provider_id: "user-id"
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create an appointment before 8am and after 5pm", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      // Garantindo uma data que já passou
      const date = new Date(2020, 4, 10);
      return date.getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 13, 7),
        user_id: "user-id",
        provider_id: "provider-id"
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 13, 19),
        user_id: "user-id",
        provider_id: "provider-id"
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
