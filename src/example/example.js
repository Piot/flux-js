import { WebsocketConnection } from "./node_modules/js-flux/dist/index.js";

class Log {
  log(x) {
    console.log("log: " + x);
  }
}

class Example {
  constructor() {
    console.log("example: started...");
    const log = new Log();
    const host = "ws://demos.kaazing.com/echo";
    this.socket = new WebsocketConnection(host, log);
    this.socket.onOpen = () => this.onOpen();
    this.socket.onMessage = msg => this.onMessage(msg);
    this.socket.connect();
  }

  onOpen() {
    console.log("example: connection open");
    const payload = new Blob(["abc123"], {
      type: "text/plain"
    });
    const myArray = new ArrayBuffer(32);
    const longInt8View = new Uint8Array(myArray);
    for (let i = 0; i < longInt8View.length; i++) {
      longInt8View[i] = i % 255;
    }
    this.socket.send(longInt8View);
  }

  onMessage(a) {
    console.log("example: received payload:", a);
    this.socket.close();
    this.socket = null;
  }
}

const dummy = new Example();
