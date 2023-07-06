import { IUserGateway, UserGatewayEntity } from "src/domain/singletons/user.gateway.singleton";

export class UserGateway extends IUserGateway {
    protected static _instance: UserGateway;
    protected users: Map<string, UserGatewayEntity>;

    private constructor() {
        super();
        this.users = new Map<string, UserGatewayEntity>();
    }

    static get(): UserGateway {
        if (!UserGateway._instance)
            UserGateway._instance = new UserGateway();
        return UserGateway._instance;
    }

    add(user: UserGatewayEntity): void {
        this.users.set(user.gatewayId, user);
    }

    remove({ gatewayId }: { gatewayId: string }): void {
        this.users.delete(gatewayId);
    }

    get({ gatewayId }: { gatewayId: string }): UserGatewayEntity {
        return this.users.get(gatewayId);
    }
}
