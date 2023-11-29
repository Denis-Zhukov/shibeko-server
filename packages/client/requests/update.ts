import {Request} from "../utils/request";
import rl from "readline-sync";
import {Response} from "../typing/response";
import {Status} from "../typing/status";
import Table from "cli-table";
import {Item} from "../typing/item";

export const update = async () => {
    const req = Request.getInstance();

    process.stdout.write('Введите id: ');
    const id = rl.question("");

    process.stdout.write('Введите новое название: ');
    const name = rl.question("");

    process.stdout.write('Введите новое количество: ');
    const count = +rl.question("");
    if (isNaN(count) || count < 0) return 'Неверное количество';

    const {status, data}: Response<Item> = await req.make('update-item', {id, name, count});
    
    if (status === Status.error) return data.toString();

    const table = new Table({
        head: ['ID', 'Название', 'Количество']
    })

    table.push([data.id, data.name, data.count.toString()])

    return table.toString();
}