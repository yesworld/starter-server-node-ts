import { BadRequestError, Body, JsonController, Post } from 'routing-controllers'
import { ConnectionManager, QueryFailedError, Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { User } from '@/entity/User'
import { JWT_SECRET } from '@/config'


@JsonController('/users')
export class UserController {

  protected userRepo: Repository<User>

  constructor(cm: ConnectionManager) {
    this.userRepo = cm.get().getRepository(User)
  }

  @Post('/')
  public async create(@Body() rawUser: User): Promise<any> {

    rawUser.password = bcrypt.hashSync(
        rawUser.password,
        bcrypt.genSaltSync()
    )

    let user: User
    try {
      user = await this.userRepo.save(rawUser)
      delete user.password
    } catch (e) {
      const err: QueryFailedError = e
      //todo: logs
      throw new BadRequestError()
    }

    const token = sign({...user}, JWT_SECRET, {expiresIn: '24h'})

    return {
      user,
      token
    }
  }

}
