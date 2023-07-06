import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Socket } from "socket.io";

export interface INewMessage {
    to: string
    message: string
    date: Date
}

export interface IChatGateway extends OnGatewayConnection, OnGatewayDisconnect {
    handleConnection(client?: Socket): boolean;
    handleDisconnect(client?: Socket): boolean;
    handleNewMessage(message: INewMessage, client?: Socket): Promise<boolean>;
}
