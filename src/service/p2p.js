import WebSocket from 'ws';

const { P2P_PORT = 5000, PEERS } = process.env;
const peers = PEERS ? PEERS.split(',') : [];
const MESSAGE = { BLOCKS: 'blocks' };

class P2PService {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  listen() {
    const server = new WebSocket.Server({ port: P2P_PORT });
    server.on('connection', (socket) => this.onConnection(socket));

    peers.forEach((peer) => {
      const socket = new WebSocket(peer);
      socket.on('open', () => this.onConnection(socket));
    });

    console.log(`Service ws:${P2P_PORT} listening...`);
  }

  onConnection(socket) {
    const { blockchain } = this;

    console.log('[ws:socket] connected.');
    this.sockets.push(socket);

    socket.on('message', (message) => {
      const { type, value } = JSON.parse(message);

      console.log({ type, value });
    });

    socket.send(JSON.stringify({ type: MESSAGE.BLOCKS, value: blockchain.blocks }));
  }

  broadcast(type, value) {
    console.log(`[ws:broadcast] ${type}...`);
    const message = JSON.stringify({ type, value });
    this.sockets.forEach((socket) => socket.send(message));
  }
}

export default P2PService;
