import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import ListProviderDayAvailabilityService from "./ListProviderDayAvailabilityService";

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe("ListProviderDayAvailabilityService", () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository
    );
  });

  it("should be able to list the day availability from provider", async () => {
    // New Date, Month inicia com 5
    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 8, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 10, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 12, 0, 0)
    });
    const availability = await listProviderDayAvailability.execute({
      provider_id: "user",
      year: 2020,
      month: 5,
      day: 20 // Para o mês de Maio
    });

    // Espero que seja um array
    // 20 e 21 com available: true
    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
        { hour: 12, available: false }
      ])
    );
  });
});
