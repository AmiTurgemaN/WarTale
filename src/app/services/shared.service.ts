import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServerInfoDTO } from '../models/server-info-DTO';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private httpClient: HttpClient) { }

  getServiceInfo(): Observable<ServerInfoDTO> {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const serverInfoUrl = 'https://user.wartale.com/api.asp?key=794701946544a3f6d9e42238cde2a551&action=get_server_info';
    return this.httpClient.get(proxyurl + serverInfoUrl)
    .pipe(
      map((response: ServerInfoDTO) => {
        return response?.results ?
         {...response, dateTime: response?.results[0].value.Ares.BossTime + response?.results[0].value.Ares.LastUpdateTime} : response;
      })
    );
  }
}
