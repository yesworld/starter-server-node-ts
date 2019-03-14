import { Get, NotFoundError, JsonController } from 'routing-controllers'

@JsonController('/index')
export class IndexController {

  @Get('/')
  public async index(): Promise<any> {
    return 'Welcome to my Api'
  }

  @Get('/error')
  errors(): any {
    throw new NotFoundError('Page not found')
  }

}
