import { UserInfoInterface } from '../interface/UserInfoInterface';

export interface UserListResponseDto {
  userList: UserResponseType[]
}

export type UserResponseType = Pick<UserInfoInterface, 'userId'|'userName'>