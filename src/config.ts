import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const IS_DEV: boolean = process.env.NODE_ENV === 'development'
const PORT: number =  +process.env.PORT || 3000
const JWT_SECRET: string = process.env.JWT_SECRET || 'your-secret-beer!'

export { PORT, JWT_SECRET }
export default IS_DEV
