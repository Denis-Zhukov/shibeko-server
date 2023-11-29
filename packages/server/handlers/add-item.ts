import net from "net";
import {Item} from "../typing/item";
import {generateResponse} from "../utils/generate-response";
import {Status} from "../typing/status";
import {Database} from "../database";

export const addItem = async (socket: net.Socket, data: Omit<Item, 'id'>) => {
    try {
        const item = await Database.addItem(data);

        const response = generateResponse(Status.success, item)
        socket.write(response);
    } catch (e) {
        const response = generateResponse(Status.error, 'Already exists')
        socket.write(response);
    }
}