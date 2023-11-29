import net from 'net';
import handler from './handlers';
import {Database} from "./database";

const PORT = 8000;
const HOST = 'localhost';

export class Server {
    static start() {
        const server = net.createServer(async (socket) => {
            console.log('Client connected');

            socket.on('data', async (data) => {
                await handler(socket, data);
                socket.end();
            });

            socket.on('close', () => {
                console.log('Client disconnected');
            });
        });

        server.listen(PORT, HOST, () => {
            console.log(`Server listening ${PORT}`);
        });
    }
}


Server.start();
