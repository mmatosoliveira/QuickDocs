import { ItemDoc } from './../../models/item-doc.model';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, take } from 'rxjs';
import { BuscadorItensDocsService } from 'src/app/services/buscador-itens-docs.service';
import { GroupService } from 'src/app/services/group.service';
import { ItemDocPorCategoria } from 'src/app/models/item-doc-por-categoria.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnChanges {
  isOpened: boolean = true;
  docsCategoriaSelecionada : ItemDoc[] = [];
  categoriasAgrupadas : ItemDocPorCategoria[] = [];
  categoriaSelecionada : string = '';

  @Input()
  searchedValue : string = '';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private buscador: BuscadorItensDocsService) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges):void{
    if(changes['searchedValue']){
      this.processarDados();
    }
  }

  processarDados(){
    this.buscador.obterDadosDocs(this.searchedValue)
    .pipe(take(1))
    .subscribe(dados => {
      this.categoriasAgrupadas = [];
      var dadosAgrupados = GroupService.groupBy(dados, x => x.categoria);
      for(let item in dadosAgrupados)
        this.categoriasAgrupadas.push({
          categoria: item,
          itens: dadosAgrupados[item]
        } as ItemDocPorCategoria);
      if(this.categoriasAgrupadas.length > 0){
        let categoria = this.categoriasAgrupadas[0];
        this.categoriaSelecionada = categoria?.categoria;
        this.docsCategoriaSelecionada = categoria?.itens;
      }
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
