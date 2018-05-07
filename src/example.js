import {
  WebsocketConnection
} from './connection.js'

class Log {
  log(x) {
    console.log('log: ' + x);
  }
}

class Example {

  constructor() {
    console.log('example: started...');
    const log = new Log();
    // const host = 'ws://127.0.0.1:32001';
    const host = 'ws://demos.kaazing.com/echo';
    this.socket = new WebsocketConnection(host, log);
    this.socket.on('open', () => this.onOpen());
    this.socket.on('message', (a) => this.onMessage(a));
    this.socket.connect();
  }

  onOpen() {
    console.log('example: connection open');
    const payload = new Blob(['abc123'], {
      type: 'text/plain'
    });
    const myArray = new ArrayBuffer(32);
    const longInt8View = new Uint8Array(myArray);
    for (let i = 0; i < longInt8View.length; i++) {
      longInt8View[i] = i % 255;
    }
    this.socket.send(longInt8View);
  }

  onMessage(a) {
    console.log('example: received payload:', a);
    this.socket.close();
    this.socket = null;
  }
}

const dummy = new Example();
