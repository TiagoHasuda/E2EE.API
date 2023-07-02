import { User } from "src/domain/entities/user.entity";

export class InsertUserPresenter {
  id: string = ''
  name: string = ''
  email: string = ''

  constructor(data: User) {
    Object.keys(this).forEach(key => {
      this[key] = data[key]
    })
  }
}