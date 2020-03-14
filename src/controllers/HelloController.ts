import { Path, GET, PathParam } from 'typescript-rest';

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
    return { name }
  }

}
