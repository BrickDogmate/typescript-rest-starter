import { Inject } from 'typescript-ioc';
import { UserListResponseDto } from '../common/dto/UserResponseDto';
import { UserModel } from '../models/UserModel';

export class UserService {
  @Inject private model: UserModel;

  async getUserList(): Promise<UserListResponseDto> {
    const userInfoList = await this.model.getUserList()
    return {
      userList: userInfoList.map(userInfo => ({
        userId: userInfo.userId,
        userName: userInfo.userName,
      }))
    }
  }
}