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

  public propertiesMap: Map<string,ServerInfoProperty>;

  constructor(
      private serverInfoHttpService: ServerInfoHttpService,
      private serverInfoPropertyInitializerService: ServerInfoPropertyInitializerService){ 
        this.propertiesMap = new Map<string,ServerInfoProperty>();
  }

  ngOnInit(): void {
    this.getServerInfo();
  }

  private getServerInfo() {
    this.serverInfoHttpService.getServerInfoInfo()
    .pipe(
      tap((data: ServerInfoDTO) => this.propertiesMap = this.serverInfoPropertyInitializerService.Init(data))
      )
    .subscribe();
  }

  public PropertiesMap(): Map<string,ServerInfoProperty>
  {
    return this.serverInfoPropertyInitializerService.serverInfoPropertiesDic;
  }
}
