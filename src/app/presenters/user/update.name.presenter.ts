import { User } from "src/domain/entities/user.entity"

export class UpdateNameUserPresenter {
  name: string = ''
  email: string = ''
  
  constructor(data: User) {
    Object.keys(this).forEach(key => {
      this[key] = data[key]
    })
  }
}