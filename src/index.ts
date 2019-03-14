import 'reflect-metadata'
import * as helmet from 'koa-helmet'
import { Container } from 'typedi'
import { useContainer as ormUseContainer } from 'typeorm'
import { createKoaServer, useContainer as routingUseContainer } from 'routing-controllers'

import IS_DEV, { PORT } from '@/config'

routingUseContainer(Container)
ormUseContainer(Container)

const app = createKoaServer({
  development: IS_DEV,
  cors: true,
  routePrefix: '/api',
  controllers: [__dirname + '/controller/*.ts'],
})

app.use(helmet())
app.listen(PORT)

console.log(`Server running on port ${PORT}`)
