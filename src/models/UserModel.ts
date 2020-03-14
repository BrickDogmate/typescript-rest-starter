import { getManager } from 'typeorm';
import { UserInfoInterface } from '../common/interface/UserInfoInterface';
import { UserInfoEntity } from './entity/UserInfoEntity';

export class UserModel {
  async getUserList(): Promise<UserInfoInterface[]> {
    return await getManager().find(UserInfoEntity, {
      order: { userId: 'DESC' }
    })
  }
}
