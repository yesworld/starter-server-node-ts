import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator' // tslint:disable-line
import { getManager, Repository } from 'typeorm'
import { User } from '@/entity/User'

interface IOption {
  email?: string,
  login?: string
}

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {

  public validate(value: any, args: ValidationArguments): Promise<boolean> {

    const userRepository: Repository<User> = getManager().getRepository(User)

    const option: IOption = {}
    option[args.property] = value

    return userRepository.findOne(option).then((user: User) => {
      if (user) { return false }
      return true
    })
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions): any {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    })
  }
}
