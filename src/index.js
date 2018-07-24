/**
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
 * connection.onOpen( () => console.log('opened connection') );
 * connection.onMessage((message) => console.log('received message:', message));
 *
 */

export {
    WebsocketConnection
}
from './connection.js'
