import { Entity, Column, PrimaryGeneratedColumn, AfterInsert } from 'typeorm'
import { IsEmail, IsNotEmpty, Matches } from 'class-validator'
import { IsUserAlreadyExist } from '@/validate/IsUserAlreadyExist'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    nullable: false,
    unique: true,
  })
  @IsNotEmpty()
  @Matches(/^[a-z0-9\-_]{5,20}$/i, {
    message: 'incorrect Login',
  })
  @IsUserAlreadyExist({
    message: 'User login $value already exists. Choose another name.',
  })
  public login: string

  @Column({
    length: 100,
    unique: true,
    nullable: false,
  })
  @IsEmail()
  @IsNotEmpty()
  @IsUserAlreadyExist({
    message: 'Email $value already exists.',
  })
  public email: string

  @IsNotEmpty()
  @Column({
    length: 80,
  })
  public firstName: string

  @Column({
    length: 80,
    nullable: true,
  })
  public lastName: string

  @Column({
    nullable: false,
    select: false,
  })
  @IsNotEmpty({
    message: 'Password must not be empty',
  })
  @Matches(/^[a-z0-9\-_!@#$%]{5,20}$/i, {
    message: 'incorrect Password',
  })
  public password: string

  @Column({
    name: 'date_create',
    default: () => 'NOW()', // tslint:disable-line
  })
  public dateCreate: Date

  @AfterInsert()
  protected afterSave(): void {
    console.log('Create user: ', this.email)
  }
}
