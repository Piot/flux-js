/**
 * Encapsulates a websocket connection
 *
 * Wraps a Websocket connection with a logger.
 * @example
 * import { WebsocketConnection } from 'js-flux';
 *
 * class Log {
 *   log(x) {
 *    console.log('log: ' + x);
 *  }
 * }
 *
 * let logger = new Log();
 * let connection = new WebsocketConnection('ws://demos.kaazing.com/echo', logger);
 *
 * connection.onOpen = () => console.log('opened connection');
 * connection.onMessage = (message) => console.log('received message:', message);
 *
 * connection.connect();
 *
 * @param {string} host A websocket url, e.g. 'ws://demos.kaazing.com/echo'
 * @param {Log} log  An object which has a `log()` function
 */
export class WebsocketConnection {
  constructor(host, log) {
    this.host = host;
    this.log = log;
    /** @member {Callback} onOpen Executed when connection is acquired */
    this.onOpen = () => {};
    /** @member {Callback} */
    this.onClose = () => {};
    /** @member {Callback} */
    this.onError = e => {};
    /** @member {Callback} */
    this.onMessage = m => {};
    this.readyState = 0;
  }

  /**
   * Starts the connection process
   */
  connect() {
    this.readyState = 0;
    const connection = new WebSocket(this.host);
    connection.binaryType = 'arraybuffer';
    connection.onopen = () => this._onOpen();
    connection.onclose = () => this._onClose();
    connection.onerror = e => this._onError(e);
    connection.onmessage = e => this._onMessage(e);
    return (this.connection = connection);
  }

  /**
   * Closes the current connection
   */
  close() {
    return this.connection.close();
  }

  /**
   * Sends a binary payload
   * @param {Uint8Array|Blob} payload
   */
  send(payload) {
    const isCorrectType =
      payload instanceof Uint8Array || payload instanceof Blob;
    if (!isCorrectType) {
      console.error('Payload to send() must be Uint8Array or blob');
      return;
    }
    return this.connection.send(payload);
  }

  _onMessage(event) {
    // this.log.log('flux: received message');
    this.onMessage(event.data);
  }

  _onOpen(event) {
    this.log.log('flux: opened');
    this.readyState = 1;
    this.onOpen();
    this.log.log('flux: after opened');
  }

  _onClose(event) {
    this.log.log('flux: closed');
    this.readyState = 2;
    this.onClose();
  }

  _onError(error) {
    if (this.log != null) {
      this.log.log('flux: we have a error:', error);
    }
    this.onError(error);
  }
}
