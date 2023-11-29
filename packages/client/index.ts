import {get, remove, update, getAll, add} from './requests';
import rl from 'readline-sync';
import {Request} from "./utils/request";

const items: Record<string, () => Promise<any>> = {
    1: add,
    2: getAll,
    3: get,
    4: update,
    5: remove,
    6: () => process.exit(0)
}

const titles = [
    'Добавить',
    'Получить всё',
    'Получить по id',
    'Обновить',
    'Удалить',
    'Выйти',
]

export const start = async () => {
    Request.init(8000, 'localhost');
    while (true) {
        console.clear();
        for (let i = 0; i < titles.length; ++i)
            console.log(`${i + 1}. ${titles[i]}`)

        const choice: number = +rl.question("> ");

        try {
            const response = await items[choice]?.();
            console.log(`Ответ:\n${response}`)
            console.log('Нажмите Enter для продолжения...')
        } catch (e) {
            console.log('Ошибка сервера', e)
        }
        rl.question("");
    }
}

start();