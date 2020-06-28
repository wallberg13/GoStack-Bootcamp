import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import ListProviderAppointmentsService from "./ListProviderAppointmentsService";

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointments: ListProviderAppointmentsService;

describe("ListProviderAppointments", () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider
    );
  });

  it("should be able to list the appointments on a specific day", async () => {
    jest.spyOn(Date, "now").mockImplementation(() => {
      const date = new Date(2020, 4, 31, 10);
      return date.getTime();
    });

    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: "provider",
      user_id: "user_id",
      date: new Date(2020, 5, 10, 10, 0, 0)
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: "provider",
      user_id: "user_id",
      date: new Date(2020, 5, 10, 14, 0, 0)
    });

    const appointment3 = await fakeAppointmentsRepository.create({
      provider_id: "provider",
      user_id: "user_id",
      date: new Date(2020, 5, 10, 15, 0, 0)
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: "provider",
      year: 2020,
      month: 6,
      day: 10
    });

    expect(appointments).toEqual([appointment1, appointment2, appointment3]);
  });
});
