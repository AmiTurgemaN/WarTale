import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServerInfoDTO } from '../models/server-info-DTO';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerInfoHttpService {

  serverInfoUrl:string = 'https://user.wartale.com/api.asp?key=794701946544a3f6d9e42238cde2a551&action=get_server_info';
  proxyUrls:string [] = 
  [
    'https://thingproxy.freeboard.io/fetch/',
    'https://cors-anywhere.herokuapp.com/'
  ];

  constructor(private httpClient: HttpClient) { }

  getServerInfoInfo(): Observable<ServerInfoDTO> {
    return this.httpClient.get(this.proxyUrls[0] + this.serverInfoUrl)
    .pipe(map((response: ServerInfoDTO) => {
        return response;
      })
    
    );
  }
}
