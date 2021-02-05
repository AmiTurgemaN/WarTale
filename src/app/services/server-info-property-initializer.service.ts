import { Injectable } from '@angular/core';
import { ServerInfoProperty, Server } from '../models/serverInfoProperty';
import { ServerInfoDTO } from '../models/server-info-DTO';
import { ServerInfoHttpService } from 'src/app/services/shared.service';
import { tap } from 'rxjs/operators';
import { Consts } from '../models/Consts';
import { HelperMethods } from '../models/HelperMethods';

@Injectable({
  providedIn: 'root'
})
export class ServerInfoPropertyInitializerService {

  //private serverInfoProperties: ServerInfoProperty[];
  public serverInfoPropertiesDic: Map<string, ServerInfoProperty>;
  private currentInterval: number = 0;
  private updateRequired: boolean = false;

  constructor(private serverInfoHttpService: ServerInfoHttpService) {
    this.serverInfoPropertiesDic = new Map<string, ServerInfoProperty>();
  }

  public Init(serverInfo: ServerInfoDTO): Map<string, ServerInfoProperty> {
    var results = serverInfo.results;

    var currentTimeZoneOffsetInMinutes = new Date().getTimezoneOffset();

    if (results && results?.length > 0) {
      var serverUtc = results[0].date;
      //get Server Utc Gap in Minutes
      //Calculate the total minutes gap between the client and the server

      var secondsToAdd = this.GetLastUpdateTimeInSeconds(results[0].date, results[0].value.LastUpdateTime);
      console.log(secondsToAdd);
      //this.InitServerDateTime(results[0].date, secondsToAdd);
      this.InitBossTime(results[0].value.Ares.BossTime);
      this.InitDropRate(results[0].value.Ares.DropRate);
      this.InitExpRate(results[0].value.Ares.EXPRate);
      this.InitHellGateNextBoss(results[0].value.Ares.HellsGateNextBoss);
      this.InitHellGateNextRoundTime(results[0].value.Ares.HellsGateNextRound);
      this.UpdateProperties(30);
    }

    return this.serverInfoPropertiesDic;
  }

  /*private GetTim()
  {
    var date = new Date();
    var timeZoneString = date.toString().split("GMT")[1].split(" (")[0]; // timezone, i.e. -0700, +0200
    var hours = timeZoneString[1]+timeZoneString[2];
    var minutes = timeZoneString[3]+timeZoneString[4];
    return timeZoneString[0] == "+" ? +hours + (+minutes/60) : -hours + (+minutes/60);
  }*/

  private GetLastUpdateTimeInSeconds(serverDateTime: any, unixTimeStamp: any) {
    var lastUpdateDateTime = new Date(unixTimeStamp * 1000);
    var serverTime = new Date(serverDateTime);
    var serverTimeInUnixTime = serverTime.getTime();
    var lastUpdateTimeInUnixtime = lastUpdateDateTime.getTime();
    console.log(serverTimeInUnixTime);
    console.log(lastUpdateTimeInUnixtime);
  }

  private InitServerDateTime(dateTime: any, secondsToAdd: Number) {
    this.serverInfoPropertiesDic.set(Consts.ServerDateTimeDescription, new ServerInfoProperty(Consts.ServerDateTimeDescription, dateTime, Server.Common));
  }

  private InitBossTime(bossTime: any) {
    this.serverInfoPropertiesDic.set(Consts.BossTimeDescription, new ServerInfoProperty(Consts.BossTimeDescription,
      Consts.BossTimeHourRepresentation + `${HelperMethods.DisplayIn2DigitsFormat(bossTime)}`, Server.Common));
  }

  private InitDropRate(dropRate: any) {
    this.serverInfoPropertiesDic.set(Consts.DropRateDescription, new ServerInfoProperty(Consts.DropRateDescription,
      dropRate == 1 ? `Normal (X${dropRate / 1})`
        : dropRate > 1 ? `High (X${dropRate / 1})`
          : `Low (X${dropRate / 1})`, Server.Common));
  }

  private InitExpRate(expRate: any) {
    this.serverInfoPropertiesDic.set(Consts.ExpRateDescription, new ServerInfoProperty(Consts.ExpRateDescription,
      expRate == 50 ? `Normal (X${expRate / 50})`
        : expRate > 50 ? `High (X${expRate / 50})`
          : `Low X${expRate / 50}`, Server.Common));
  }

  private InitHellGateNextBoss(hellGateNextBoss: string) {
    this.serverInfoPropertiesDic.set(Consts.HellGateNextBossNameDescription, new ServerInfoProperty(Consts.HellGateNextBossNameDescription, hellGateNextBoss, Server.Ares));
  }

  private InitHellGateNextRoundTime(seconds: number) {
    var value = HelperMethods.GetTimeLeftValue(seconds);
    this.serverInfoPropertiesDic.set(Consts.HellGateTimeLeftDescription, new ServerInfoProperty(Consts.HellGateTimeLeftDescription, value, Server.Ares));
    this.setHellGateTimer();
  }

  private async setHellGateTimer() {
    this.currentInterval = window.setInterval(async () => {
      var hellGateTimeLeft = this.serverInfoPropertiesDic.get(Consts.HellGateTimeLeftDescription)?.value;
      var hellGateTimeLeftInSeconds = HelperMethods.GetTimeLeftInSeconds(hellGateTimeLeft);
      if (hellGateTimeLeftInSeconds != 0) {
        hellGateTimeLeftInSeconds--;
        var value = HelperMethods.GetTimeLeftValue(hellGateTimeLeftInSeconds);
        this.UpdateValue(Consts.HellGateTimeLeftDescription, value);
      }
      else {
        this.updateRequired = true
      }
    }, 1000);
  }

  private async UpdateProperties(seconds: number) {
    while (true) {
      if (this.updateRequired) {
        this.serverInfoHttpService.getServerInfoInfo()
          .pipe(
            tap((data: ServerInfoDTO) => {
              if (data != null && data.results) {
                this.updateHellGateTimeLeft(data.results[0].value.Ares.HellsGateNextRound);
                this.updateHellGateNextBoss(data.results[0].value.Ares.HellsGateNextBoss);
                this.updateRequired = false;
              }
            })
          ).subscribe();
      }
      await HelperMethods.Delay(seconds * 1000);
    }
  }

  private updateHellGateTimeLeft(seconds: any) {
    var value = HelperMethods.GetTimeLeftValue(seconds);
    this.UpdateValue(Consts.HellGateTimeLeftDescription, value);
    window.clearInterval(this.currentInterval);
    this.setHellGateTimer();
  }

  private updateHellGateNextBoss(bossName: string) {
    this.UpdateValue(Consts.HellGateNextBossNameDescription, bossName);
  }

  private UpdateValue(key: string, value: string) {
    var currentDescription = this.serverInfoPropertiesDic.get(key)?.description as string;
    var currentServer = this.serverInfoPropertiesDic.get(key)?.server as Server;
    var updatedTimeLeftProperty = new ServerInfoProperty(currentDescription, value, currentServer);
    this.serverInfoPropertiesDic.set(key, updatedTimeLeftProperty);
  }
}
