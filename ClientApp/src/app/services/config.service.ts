import { environment } from './../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "../models/app-config";

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends AppConfig{
  constructor(private client: HttpClient){
    super();
  }

  load(){
    return this.client.get<AppConfig>('app.config.json')
    .toPromise()
    .then(data => {
      this.urlApi = data?.urlApi ?? environment.api;
      this.redirectHttps = data?.redirectHttps ?? false;
    })
    .catch((e) => {
      console.log(e);
      console.log('Não foi possível carregar a configuração');
    });
  }
}
