import net from 'net';


export class Request {
    private static instance: Request;

    private constructor(private readonly port: number, private readonly host: string) {
    }

    public static init(port: number, host: string) {
        if (!Request.instance) this.instance = new Request(port, host);
        return Request.instance;
    }

    public static getInstance(): Request {
        if (!Request.instance) throw new Error('Firstly init object');
        return Request.instance;
    }

    make(handler: string, data?: object | string): Promise<any> {
        return new Promise((resolve, reject) => {
            const client = new net.Socket();

            client.connect(this.port, this.host, () => {
                console.log(`Открыл соеденение ${this.host}:${this.port}`);
                client.write(JSON.stringify({handler, data}));
            });

            client.on('data', (response) => {
                client.destroy();
                resolve(JSON.parse(response.toString()));
            });

            client.on('close', () => {
                console.log('Закрыл соеденение');
            });

            client.on('error', () => {
                reject('Error');
            })
        })
    }
}

