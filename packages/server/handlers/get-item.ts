import net from "net";
import {generateResponse} from "../utils/generate-response";
import {Status} from "../typing/status";
import {Database} from "../database";

export const getItem = async (socket: net.Socket, data: string) => {
    const item = await Database.getItemById(+data);
    const response = generateResponse(
        item !== null ? Status.success : Status.error,
        item ?? `Item with id ${data} doesn't exist`
    );
    socket.write(response);
}