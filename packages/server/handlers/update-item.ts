import net from "net";
import {Item} from "../typing/item";
import {generateResponse} from "../utils/generate-response";
import {Status} from "../typing/status";
import {Database} from "../database";

export const updateItem = async (socket: net.Socket, data: Item) => {
   const item = await Database.updateItemById(data);

    // const response = generateResponse(
    //     result ? Status.success : Status.error,
    //     result ? item : `Item with id ${data.id} doesn't exist`
    // );
    const response = generateResponse(Status.success, item);

    socket.write(response);
}