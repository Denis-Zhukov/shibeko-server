import net from "net";
import {generateResponse} from "../utils/generate-response";
import {Status} from "../typing/status";
import {Database} from "../database";

export const getItems = async (socket: net.Socket) => {
    const items = await Database.getItems();

    const response = generateResponse(Status.success, items);
    socket.write(response);
}