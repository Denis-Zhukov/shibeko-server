import {PrismaClient} from "@prisma/client";
import {Item} from "../typing/item";

export class Database {

    private static prisma = new PrismaClient()

    static async getItems() {
        return await Database.prisma.item.findMany();
    }

    static async getItemById(id: number) {
        return await Database.prisma.item.findFirst({
            where: {id}
        });
    }

    static async addItem(item: Omit<Item, 'id'>) {
        return await Database.prisma.item.create({
            data: {name: item.name, count: item.count}
        });
    }

    static async updateItemById(updatedItem: Item) {
        return await Database.prisma.item.update({
            where: {
                id: +updatedItem.id
            },
            data: {
                count: updatedItem.count,
                name: updatedItem.name
            }
        })
    }

    static async deleteItemById(id: number) {
        return await Database.prisma.item.delete({where: {id}})
    }
}