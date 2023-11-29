import {Request} from '../utils/request';
import Table from 'cli-table';
import {Item} from "../typing/item";

export const getAll = async () => {
    const req = Request.getInstance();
    const {data} = await req.make('get-items');
    
    const table = new Table({
        head: ['ID', 'Название', 'Количество']
    })

    const items = data.map(({id, name, count}:Item) => [id, name, count]);
    table.push(...items)
    return table.toString();
}