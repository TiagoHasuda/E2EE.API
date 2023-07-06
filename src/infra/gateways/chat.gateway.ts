import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { IChatGateway, INewMessage } from "src/domain/gateways/chat.gateway";
import { UserGateway } from "../singletons/user.gateway.singleton";
import { FirebaseAdmin } from "../singletons/firebase.admin.singleton";
import { IUserRepository } from "src/domain/database/user.repository";
import { Inject } from "@nestjs/common";
import { UserRepository } from "../database/user.repository";
import { IUserGateway } from "src/domain/singletons/user.gateway.singleton";

@WebSocketGateway()
export class ChatGateway implements IChatGateway {
    @WebSocketServer()
    private readonly server: Server;
    private readonly ug: IUserGateway;
    private readonly fa: FirebaseAdmin;

    constructor(
        @Inject(UserRepository)
        private readonly userRepository: IUserRepository,
    ) {
        this.ug = UserGateway.get();
        this.fa = FirebaseAdmin.get();
    }

    handleConnection(client: Socket): boolean {
        const userId = client.handshake.query['userId'];
        if (!userId || Array.isArray(userId)) {
            client.disconnect();
            return false;
        }
        this.ug.add({ userId, gatewayId: client.id });
        return true;
    };

    handleDisconnect(client: Socket): boolean {
        this.ug.remove({ gatewayId: client.id });
        return true;
    };

    @SubscribeMessage('newMessage')
    async handleNewMessage(message: INewMessage, client: Socket): Promise<boolean> {
        const userTo = await this.userRepository.findOneEmail(message.to);
        const user = this.ug.get({ gatewayId: client.id });
        const userFrom = await this.userRepository.findById(user.userId);
        if (!userTo || !userFrom) return false;
        await this.fa.sendPush(userTo.registrationToken, userFrom.name, message.message);
        return true;
    };
}
