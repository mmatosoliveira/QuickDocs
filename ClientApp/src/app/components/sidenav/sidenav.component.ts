import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { catchError, of, take } from 'rxjs';
import { ItemDocPorCategoria } from 'src/app/models/item-doc-por-categoria.model';
import { BuscadorItensDocsService } from 'src/app/services/buscador-itens-docs.service';
import { GroupService } from 'src/app/services/group.service';

import { ItemDoc } from './../../models/item-doc.model';

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
  searching : boolean = false;
  progressMode : 'determinate' | 'indeterminate' = 'determinate';
  progressValue = 100;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @Input()
  searchedValue : string = '';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private buscador: BuscadorItensDocsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges):void{
    if(changes['searchedValue']){
      this.processarDados();
    }
  }

  processarDados(){
    this.searching = true;
    this.progressMode = 'indeterminate';
    this.buscador.obterDadosDocs(this.searchedValue)
    .pipe(
      take(1),
      catchError(erro => {
        this._snackBar.open('Ocorreu um erro ao buscar os dados de documentações', 'Ok', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        return of([]);
      })
    )
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
      else{
        this.categoriasAgrupadas = [];
        this.docsCategoriaSelecionada = [];
      }
      this.searching = false;
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
