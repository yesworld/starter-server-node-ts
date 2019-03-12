import { BaseContext } from 'koa'
import * as Router from 'koa-router'

const router = new Router()

router.get('/', function(ctx: BaseContext, next: () => void): void {
  ctx.status = 200
  ctx.body = 'Welcome to API page'
})

export { router }
