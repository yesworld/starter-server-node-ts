import { Body, JsonController, Post, Get, Param, NotFoundError, Put } from 'routing-controllers'
import { ConnectionManager, Repository } from 'typeorm'
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
  public async create(@Body({ required: true }) rawUser: User): Promise<any> {

    rawUser.password = bcrypt.hashSync(
        rawUser.password,
        bcrypt.genSaltSync(),
    )

    let user: User
    user = await this.userRepo.save(rawUser)
    delete user.password

    const token = sign({...user}, JWT_SECRET, {expiresIn: '24h'})
    return {
      user,
      token,
    }
  }

  @Get('/:id([0-9]+)')
  public async getUser(@Param('id') id: number): Promise<User> {
    const user = await this.userRepo.findOne(id)

    if (!user) {
      throw new NotFoundError(`User was not found.`)
    }

    return user
  }

  @Get('/')
  public async getUsers(): Promise<User[]> {
    return this.userRepo.find()
  }

  @Put('/:id([0-9]+)')
  public async updateUser(@Param('id') id: number, @Body() user: User): Promise<User> {
    const userToEdit = await this.userRepo.findOne(id)
    userToEdit.password = user.password
    await this.userRepo.save(userToEdit)
    return userToEdit
  }
}
