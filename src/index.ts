// import "reflect-metadata";
// import { createConnection } from 'typeorm'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as cors from '@koa/cors'
import * as json from 'koa-json'
import * as koaBody from 'koa-body'
import './init'

const app = new Koa()
const router = new Router()

//router.post('/api/search', search)

app.use(koaBody())
app.use(json())
app.use(cors())
app.use(router.routes())

app.listen(process.env.PORT)

// const connection = await createConnection()
