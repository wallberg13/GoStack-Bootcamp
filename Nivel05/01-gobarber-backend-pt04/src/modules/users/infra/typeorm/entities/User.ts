import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import { Exclude, Expose } from "class-transformer";

import uploadConfig from "@config/upload";

/**
 * KISS - Keep It Simple & Stupid
 */

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: "avatar_url" })
  get getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    const storageProviders = {
      disk: `${process.env.APP_API_URL}/files/${this.avatar}`,
      s3: `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`
    };

    return storageProviders[uploadConfig.driver];
  }
}

export default User;
