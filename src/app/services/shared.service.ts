import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServerInfoDTO } from '../models/server-info-DTO';

@Injectable({
  providedIn: 'root'
})
export class ServerInfoHttpService {

  constructor(private httpClient: HttpClient) { }

  getServerInfoInfo(): Observable<ServerInfoDTO> {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const serverInfoUrl = 'https://user.wartale.com/api.asp?key=794701946544a3f6d9e42238cde2a551&action=get_server_info';
    return this.httpClient.get(proxyUrl + serverInfoUrl)
    .pipe(
      map((response: ServerInfoDTO) => {
        return response;
      })
    );
  }
}
