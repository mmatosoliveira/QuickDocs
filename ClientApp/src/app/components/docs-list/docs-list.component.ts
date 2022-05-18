import { DocFormComponent } from './../doc-form/doc-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ItemDoc } from 'src/app/models/item-doc.model';
import { BuscadorItensDocsService } from 'src/app/services/buscador-itens-docs.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-docs-list',
  templateUrl: './docs-list.component.html',
  styleUrls: ['./docs-list.component.scss']
})
export class DocsListComponent implements OnInit {

  displayedColumns: string[] = ['categoria', 'nome', 'tags', 'acoes'];
  data : MatTableDataSource<ItemDoc> = new MatTableDataSource<ItemDoc>();

  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private buscador : BuscadorItensDocsService,
    private dialog: MatDialog
  ) {
    this.consultarDocs();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.data.sort = this.sort;
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  consultarDocs(){
    this.buscador.obterDadosDocs()
      .pipe(take(1))
      .subscribe(d => this.data.data = d);
  }

  excluirDoc(id : string){
    this.buscador.excluirDoc(id)
      .pipe(take(1))
      .subscribe(d => this.consultarDocs());
  }

  abrirForm(itemDoc : ItemDoc | null = null){
    const dialogRef = this.dialog.open(DocFormComponent, {
      width: '70%',
      height: '65%',
      data: itemDoc ?? {} as ItemDoc
    });

    dialogRef.afterClosed().subscribe(result => {
      this.consultarDocs();
    });
  }
}
