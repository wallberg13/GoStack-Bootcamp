import {
  ObjectID,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ObjectIdColumn
} from "typeorm";

/**
 * No mongo, o Schema é definido em nível de aplicação, mas as definições de repositórios,
 * ou integração que já estavamos utilizando com o Typeorm continuam as mesmas.
 */

// Nome do schema
@Entity("notifications")
class Notification {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  content: string;

  @Column("uuid")
  recipient_id: string;

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notification;
