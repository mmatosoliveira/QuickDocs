import { ItemDoc } from './../../models/item-doc.model';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
export class SidenavComponent implements OnInit {
  isOpened: boolean = true;
  docsCategoriaSelecionada : ItemDoc[] = [];
  categoriasAgrupadas : ItemDocPorCategoria[] = [];
  categoriaSelecionada : string = '';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private buscador: BuscadorItensDocsService) {}

  ngOnInit(): void {
    this.processarDados();
  }

  processarDados(){
    this.buscador.obterDadosDocs()
    .pipe(take(1))
    .subscribe(dados => {
      this.categoriasAgrupadas = [];
      var dadosAgrupados = GroupService.groupBy(dados, x => x.categoria);
      for(let item in dadosAgrupados)
        this.categoriasAgrupadas.push({
          categoria: item,
          itens: dadosAgrupados[item]
        } as ItemDocPorCategoria);
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
