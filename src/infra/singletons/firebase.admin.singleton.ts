import Admin from "firebase-admin";
import { IFirebaseAdmin } from "src/domain/singletons/firebase.admin.singleton";

export class FirebaseAdmin extends IFirebaseAdmin {
    protected static _instance: FirebaseAdmin;
    protected app: Admin.app.App;

    private constructor() {
        super();
        this.app = Admin.initializeApp();
    }

    static get(): FirebaseAdmin {
        if (!FirebaseAdmin._instance)
            FirebaseAdmin._instance = new FirebaseAdmin();
        return FirebaseAdmin._instance;
    }

    async sendPush(to: string, from: string, message: string): Promise<void> {
        try {
            await this.app.messaging().send({
                token: to,
                data: {
                    title: from,
                    body: message,
                },
            });
        } catch (err) {
            console.error('Push notification not sent', err)
        }
    }
}
