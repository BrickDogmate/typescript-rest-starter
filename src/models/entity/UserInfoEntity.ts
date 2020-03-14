import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { UserInfoInterface } from '../../common/interface/UserInfoInterface';

@Entity('user_info')
export class UserInfoEntity implements UserInfoInterface {

  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @Column({ name: 'user_name' })
  userName: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

}
