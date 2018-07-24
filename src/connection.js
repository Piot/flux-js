export class WebsocketConnection {

  constructor(host, log) {
    this.host = host;
    this.log = log;
    this.onOpen = () => {};
    this.onClose = () => {};
    this.onError = (e) => {};
    this.onMessage = (m) => {};
    this.readyState = 0;
  }

  connect() {
    this.readyState = 0;
    const connection = new WebSocket(this.host);
    connection.binaryType = 'arraybuffer';
    connection.onopen = () => this._onOpen();
    connection.onclose = () => this._onClose();
    connection.onerror = (e) => this._onError(e);
    connection.onmessage = (e) => this._onMessage(e);
    return this.connection = connection;
  }

  close() {
    return this.connection.close();
  }

  send(payload) {
    const isCorrectType = (payload instanceof Uint8Array) || (payload instanceof Blob);
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
};
