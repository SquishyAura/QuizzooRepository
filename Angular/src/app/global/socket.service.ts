import { Injectable } from '@angular/core';
import * as io from "socket.io-client";

@Injectable()
export class SocketService {
socket: SocketIOClient.Socket;
    constructor(){
        this.socket = io.connect('http://localhost:9999');
    }
}

