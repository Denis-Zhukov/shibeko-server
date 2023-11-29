import {Status} from "../typing/status";
import {Handler} from "../typing/handler";
import {getItems} from "./get-items";
import {isInput} from "../utils/input-guard";
import {generateResponse} from "../utils/generate-response";
import {getItem} from "./get-item";
import {addItem} from "./add-item";
import {updateItem} from "./update-item";
import {deleteItem} from "./delete-item";
import net from "net";

const handlers: Record<string, Handler> = {
    'get-items': getItems,
    'get-item': getItem,
    'add-item': addItem,
    'update-item': updateItem,
    'delete-item': deleteItem
}

export default async (socket: net.Socket, data: Buffer) => {
    try {
        const input = JSON.parse(data.toString());
        if (!isInput(input))
            return socket.write(generateResponse(Status.error, "Wrong format message. 'handler' is required"))

        if (!(input.handler in handlers))
            return socket.write(generateResponse(Status.error, `Handler '${input.handler}' doesn't exist`));

        return await handlers[input.handler](socket, input.data);
    } catch (e) {
        socket.write(generateResponse(Status.error, "Wrong message"))
    }
}