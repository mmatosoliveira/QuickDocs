import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemDoc } from '../models/item-doc.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BuscadorItensDocsService {

  constructor(
    private client : HttpClient,
    private configService : ConfigService
  ) { }

  obterDadosDocs() : Observable<ItemDoc[]>{
    return this.client.get<ItemDoc[]>(this.configService.urlApi + "QuickDoc/ObterDocs");
  }

  obterTodasCategorias() : Observable<string[]>{
    return this.client.get<string[]>(this.configService.urlApi + "QuickDoc/ObterTodasCategorias");
  }

  excluirDoc(id : string){
    return this.client.get(this.configService.urlApi + "QuickDoc/DeleteDoc?id="+id);
  }

  salvarDoc(doc : ItemDoc){
    return this.client.post(this.configService.urlApi + "QuickDoc/SaveDoc", doc);
  }
}
