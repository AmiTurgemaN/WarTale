export interface IServerInfoProperty {
    description: string;
    value: string;
    server: Server;
}

export enum Server {
    Ares = 1,
    Mars,
    Odin,
    Common,
  }

  export class ServerInfoProperty implements IServerInfoProperty {
      description: string;
      value: any;
      server: Server;

      constructor(description:string, value:any, server:Server){
        this.description = description;
        this.value = value;
        this.server = server;
      }
  }