import { Path, GET } from 'typescript-rest';
import { Inject } from 'typescript-ioc';
import { UserService } from '../services/UserService';
import { UserListResponseDto } from '../common/dto/UserResponseDto';

@Path('/users')
export class UserController {
  @Inject private service: UserService;

  @GET
  async find(): Promise<UserListResponseDto> {
    return await this.service.getUserList()
  }

}
