import 'reflect-metadata'
import * as helmet from 'koa-helmet'
import { Container } from 'typedi'
import { createConnection, useContainer as ormUseContainer } from 'typeorm'
import { createKoaServer, useContainer as routingUseContainer } from 'routing-controllers'

import IS_DEV, { PORT } from '@/config'

createConnection()
routingUseContainer(Container)
ormUseContainer(Container)

const app = createKoaServer({
  cors: true,
  routePrefix: '/api',
  development: IS_DEV,
  controllers: [__dirname + '/controller/*.ts'],
  middlewares: [__dirname + '/middleware/*.ts'],
})

app.use(helmet())
app.listen(PORT)

console.log(`Server running on port ${PORT}`) // tslint:disable-line
