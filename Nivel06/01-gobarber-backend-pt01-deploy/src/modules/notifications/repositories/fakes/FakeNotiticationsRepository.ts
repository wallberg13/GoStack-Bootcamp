import { ObjectID } from "mongodb";
import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import ICreateNotificationDTO from "@modules/notifications/dtos/ICreateNotificiationDTO";
import Notification from "../../infra/typeorm/schemas/Notification";

/**
 * Em relação ao banco relacional, o mongodb irá possuir suas peculariades pois ele é bem peculiar.
 * Como tal, o mesmo possui a sua propria definição de repositório, como exemplo.
 */

class NotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();
    Object.assign(notification, { id: new ObjectID(), content, recipient_id });
    this.notifications.push(notification);
    return notification;
  }
}

export default NotificationsRepository;
