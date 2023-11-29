import net from "net";

export type Handler = (socket: net.Socket, data?: any) => any;