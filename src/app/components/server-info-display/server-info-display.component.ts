import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { ServerInfoDTO } from '../../models/server-info-DTO';
import { tap } from 'rxjs/operators'

@Component({
  selector: 'app-server-info-display',
  templateUrl: './server-info-display.component.html',
  styleUrls: ['./server-info-display.component.scss']
})
export class ServerInfoDisplayComponent implements OnInit {
  serverInfo: ServerInfoDTO = {};

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getServerInfo();
  }

  private getServerInfo() {
    this.sharedService.getServiceInfo()
    .pipe(
      tap((data: ServerInfoDTO) => this.serverInfo = data)
      )
    .subscribe();
  }

}
