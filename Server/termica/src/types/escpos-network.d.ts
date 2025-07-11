declare module 'escpos-network' {
    export class Network {
      constructor(ip: string, port: number);
      open(callback: () => void): void;
      close(): void;
    }
  }
  