
import * as express from 'express';
import { Server as SocketServer } from 'ws';
import { Server } from 'http';

export class ExpressServer {
    public readonly expressServerPort: number = 5566;
    public readonly wsServerPort: number = 5567;
    private app: express.Express;
    private server: Server;
    private wss: SocketServer;
    private _connected: boolean = false;

    constructor() {
        this.app = express();
        this.app.use(express.static(__dirname + "/../html_views"));

        this.server = this.app.listen(this.expressServerPort);
        this.wss = new SocketServer({ server: this.server, port: this.wsServerPort });

        this.wss.on('connection', (ws) => {
            ws.send
            this._connected = true;
        });

        this.wss.on('error', () => {
            this._connected = false;
        });
    }

    public get connected(): boolean {
        return this._connected;
    }

    public send(message: ISocketMessage) {
        if (this.connected) {
            const msg = JSON.stringify(message);
            this.wss.clients.forEach(client => client.send(msg));
        }
    }
}

export interface ISocketMessage {
    Type: SocketMessageType;
    Data: any;
}

export class TipSocketMessage implements ISocketMessage {
    public Type: SocketMessageType = SocketMessageType.Tip;
    public Data: TipMessageData;
}

export enum SocketMessageType {
    Tip = 0
}

export class TipMessageData {
    public Amount: number;
    public Username: string;
}