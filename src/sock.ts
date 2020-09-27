import { createServer, Socket } from 'net';
import { isWin32 } from './utils';
import { v4 } from 'uuid';

export const getSockPath = isWin32 ? (): string => {
  return `\\\\.\\pipe\\${v4()}`;
} : (): string => {
  throw new Error('Not implemented.');
  // TODO: test this on unix.
  // return `/run/${v4()}.sock`;
};

export function getSocket(path: string): Promise<Socket> {
  return new Promise((resolve) => {
    const server = createServer((socket) => {
      resolve(socket);
      server.close();
    });
    server.listen(path);
  });
}