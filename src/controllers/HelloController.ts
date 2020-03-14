import { Path, GET, PathParam, Errors } from 'typescript-rest';
import { ERROR_MESSAGE } from '../common/ErrorMessages';

interface HelloResponseDto {
  name: string
}

@Path('/hello')
export class HelloController {

  @Path('/error')
  @GET
  throwError(): void {
    throw new Error('error test')
  }

  @Path('/:name')
  @GET
  sayHello( @PathParam('name') name: string ): HelloResponseDto {
    if (!/^[a-zA-Z0-9\-\_ ]+$/.test(name)) throw new Errors.NotAcceptableError(ERROR_MESSAGE.WRONG_USER_NAME);
    return { name }
  }

}
