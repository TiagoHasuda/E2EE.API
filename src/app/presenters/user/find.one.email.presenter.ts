import { User } from "src/domain/entities/user.entity"

export class FindOneEmailUserPresenter {
    name: string = ''
    email: string = ''
    publicKey: string = ''

    constructor(data: User) {
        Object.keys(this).forEach(key => {
            this[key] = data[key]
        });
    }
}
