import { Component, OnInit } from '@angular/core';
import { ServerInfoHttpService } from 'src/app/services/shared.service';
import { ServerInfoDTO } from '../../models/server-info-DTO';
import { ServerInfoPropertyInitializerService } from '../../services/server-info-property-initializer.service';
import { tap } from 'rxjs/operators';
import { ServerInfoProperty} from 'src/app/models/serverInfoProperty';

@Component({
  selector: 'app-server-info-display',
  templateUrl: './server-info-display.component.html',
  styleUrls: ['./server-info-display.component.scss']
})
export class ServerInfoDisplayComponent implements OnInit {

  serverInfo: ServerInfoDTO;
  serverInfoProperties: ServerInfoProperty [];

  constructor(
      private serverInfoHttpService: ServerInfoHttpService,
      private serverInfoPropertyInitializerService: ServerInfoPropertyInitializerService){ 
    this.serverInfo = {};
    this.serverInfoProperties = [];
  }

  ngOnInit(): void {
    this.getServerInfo();
  }

  private getServerInfo() {
    this.serverInfoHttpService.getServerInfoInfo()
    .pipe(
      tap((data: ServerInfoDTO) => this.serverInfo = data),
      tap((data: ServerInfoDTO) => this.serverInfoProperties=this.serverInfoPropertyInitializerService.Init(data))
      )
    .subscribe();
  }
}
