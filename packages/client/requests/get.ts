import {Request} from "../utils/request";
import Table from "cli-table";
import rl from 'readline-sync';
import {Response} from "../typing/response";
import {Item} from "../typing/item";
import {Status} from "../typing/status";

export const get = async () => {
    const req = Request.getInstance();

    process.stdout.write('Введите id: ');
    const enteredId = rl.question("");
    const {status, data}: Response<Item> = await req.make('get-item', enteredId);
    if(status === Status.error) return data.toString();

    const table = new Table({
        head: ['ID', 'Название', 'Количество']
    })
    table.push([data.id, data.name, data.count.toString()])

    return table.toString();
}