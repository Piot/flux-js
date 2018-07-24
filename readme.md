<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [WebsocketConnection][1]
    -   [Parameters][2]
    -   [Examples][3]
    -   [onOpen][4]
    -   [onClose][5]
    -   [onError][6]
        -   [Parameters][7]
    -   [onMessage][8]
        -   [Parameters][9]
    -   [connect][10]
    -   [close][11]
    -   [send][12]
        -   [Parameters][13]

## WebsocketConnection

Encapsulates a websocket connection

Wraps a Websocket connection with a logger.

### Parameters

-   `host` **[string][14]** A websocket url, e.g. 'ws://demos.kaazing.com/echo'
-   `log` **Log** An object which has a `log()` function

### Examples

```javascript
import { WebsocketConnection } from 'js-flux';

class Log {
  log(x) {
   console.log('log: ' + x);
 }
}

let logger = new Log();
let connection = new WebsocketConnection('ws://demos.kaazing.com/echo', logger);

connection.onOpen = () => console.log('opened connection');
connection.onMessage = (message) => console.log('received message:', message);

connection.connect();
```

### onOpen

### onClose

Type: Callback

### onError

Type: Callback

#### Parameters

-   `e`  

### onMessage

Type: Callback

#### Parameters

-   `m`  

### connect

Starts the connection process

### close

Closes the current connection

### send

Sends a binary payload

#### Parameters

-   `payload` **([Uint8Array][15] \| [Blob][16])** 

[1]: #websocketconnection

[2]: #parameters

[3]: #examples

[4]: #onopen

[5]: #onclose

[6]: #onerror

[7]: #parameters-1

[8]: #onmessage

[9]: #parameters-2

[10]: #connect

[11]: #close

[12]: #send

[13]: #parameters-3

[14]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[15]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array

[16]: https://developer.mozilla.org/docs/Web/API/Blob
