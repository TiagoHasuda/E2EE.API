import { NotImplementedException } from '@nestjs/common';
import Admin from 'firebase-admin';

export abstract class IFirebaseAdmin {
    protected static _instance: IFirebaseAdmin;
    protected abstract readonly app: Admin.app.App;
    static get(): IFirebaseAdmin {
        throw new NotImplementedException();
    };
    abstract sendPush(to: string, from: string, message: string): Promise<void>;
}
