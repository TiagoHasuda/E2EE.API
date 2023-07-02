import { User } from "src/domain/entities/user.entity"

interface FindUserPresenter {
  name: string
  email: string
  publicKey: string
}

export class FindByEmailUserPresenter {
  users: FindUserPresenter[] = []

  constructor(data: User[]) {
    data.forEach(user => {
      const usr: FindUserPresenter = {
        name: '',
        email: '',
        publicKey: '',
      }
      Object.keys(usr).forEach(key => {
        usr[key] = user[key]
      })
      this.users.push(usr)
    })
  }
}