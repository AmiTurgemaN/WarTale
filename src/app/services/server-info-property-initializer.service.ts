import { Injectable } from '@angular/core';
import { ServerInfoProperty, Server } from '../models/serverInfoProperty';
import { ServerInfoDTO } from '../models/server-info-DTO';

@Injectable({
  providedIn: 'root'
})
export class ServerInfoPropertyInitializerService {

  private serverInfoProperties: ServerInfoProperty [];

  constructor() {
    this.serverInfoProperties = [];
   }

  public Init(serverInfo: ServerInfoDTO): ServerInfoProperty []{
      console.log(serverInfo);
      var results = serverInfo.results;

      if(results && results?.length > 0)
      {
        this.InitServerDateTime(results[0].date);
      }

      return this.serverInfoProperties;
  }

  private InitServerDateTime(dateTime: any)
  {
      this.serverInfoProperties.push(new ServerInfoProperty("Date Time", dateTime, Server.Global));
  }

}
