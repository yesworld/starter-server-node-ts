import { BadRequestError, KoaMiddlewareInterface, Middleware } from 'routing-controllers'
import IS_DEV from '@/config'

@Middleware({type: 'before'})
export class LoggerMiddleware implements KoaMiddlewareInterface {

  public async use(
      context: any,
      next: (error?: any) => Promise<any>,
  ): Promise<any> {

    await next()

    const BODY = context.response.body
    if (context.response.status === 500 && !IS_DEV) {
      context.body = {
        name: 'InternalServerError',
        code: 500,
      }
    } else if (context.response.status === 400) {

      // Experiment: prepare validation errors
      if (BadRequestError.name === BODY.name && BODY.errors.length) {

        const errors = []
        BODY.errors.forEach((validate: any, key: any) => {
          delete validate.constraints.matches

          errors.push({
            name: validate.property,
            value: validate.value,
            message: Object.values(validate.constraints).toString(),
          })
        })
        BODY.errors = errors
        context.body = BODY
      }
    } else if (context.response.status === 404 && !BODY) {
      context.body = {
        name: 'NotFoundError',
        code: 404,
      }
    }

  }
}
