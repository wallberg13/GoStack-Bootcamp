import { getMongoRepository, MongoRepository } from "typeorm";

import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import ICreateNotificationDTO from "@modules/notifications/dtos/ICreateNotificiationDTO";
import Notification from "../schemas/Notification";

/**
 * Em relação ao banco relacional, o mongodb irá possuir suas peculariades pois ele é bem peculiar.
 * Como tal, o mesmo possui a sua propria definição de repositório, como exemplo.
 */

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, "mongo");
  }

  public async create({
    content,
    recipient_id
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({ content, recipient_id });
    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
