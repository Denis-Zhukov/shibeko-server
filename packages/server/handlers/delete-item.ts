import net from "net";
import {generateResponse} from "../utils/generate-response";
import {Status} from "../typing/status";
import {Database} from "../database";

export const deleteItem = async (socket: net.Socket, data: string) => {

    const result = await Database.deleteItemById(+data);

    // const response = generateResponse(
    //     result ? Status.success : Status.error,
    //     result ? item : `Item with id ${data} doesn't exist`
    // );
    const response = generateResponse(Status.success, result);

    socket.write(response);
}