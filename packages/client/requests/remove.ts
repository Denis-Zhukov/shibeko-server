import {Request} from "../utils/request";
import rl from "readline-sync";
import {Response} from "../typing/response";
import {Item} from "../typing/item";
import {Status} from "../typing/status";
import Table from "cli-table";

export const remove = async () => {
    const req = Request.getInstance();

    process.stdout.write('Введите id: ');
    const enteredId = rl.question("");
    let {status, data}: Response<Item> = await req.make('delete-item', enteredId);

    if(status === Status.error) return data.toString();

    const table = new Table({
        head: ['ID', 'Название', 'Количество']
    })
    console.log(data, typeof data);
    table.push([data.id, data.name, data.count.toString()])

    return table.toString();
}