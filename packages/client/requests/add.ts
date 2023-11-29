import {Request} from "../utils/request";
import rl from "readline-sync";
import {Response} from "../typing/response";
import {Item} from "../typing/item";
import {Status} from "../typing/status";
import Table from "cli-table";

export const add = async () => {
    const req = Request.getInstance();

    process.stdout.write('Введите название: ');
    const name = rl.question("", {encoding: 'utf8'});
    process.stdout.write('Введите количество: ');
    const count = +rl.question("");
    if (isNaN(count) || count < 0) return 'Неверное количество';

    const {status, data}: Response<Item> = await req.make('add-item', {name, count});
    if (status === Status.error) return data.toString();

    const table = new Table({
        head: ['ID', 'Название', 'Количество']
    })

    table.push([data.id, data.name, data.count.toString()])

    return table.toString();
}