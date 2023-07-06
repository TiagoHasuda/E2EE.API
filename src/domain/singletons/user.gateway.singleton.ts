import { NotImplementedException } from "@nestjs/common";

export interface UserGatewayEntity {
    userId: string
    gatewayId: string
}

export abstract class IUserGateway {
    protected static _instance: IUserGateway;
    protected abstract readonly users: Map<string, UserGatewayEntity>;
    static get(): IUserGateway {
        throw new NotImplementedException();
    };
    abstract add(user: UserGatewayEntity): void;
    abstract remove({ gatewayId }: { gatewayId: string }): void;
    abstract get({ gatewayId }: { gatewayId: string }): UserGatewayEntity;
}
