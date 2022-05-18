import { Component, Inject, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ItemDoc } from 'src/app/models/item-doc.model';
import { BuscadorItensDocsService } from 'src/app/services/buscador-itens-docs.service';
import { StringHelper } from 'src/app/shared/string-helper';

@Component({
  selector: 'app-doc-form',
  templateUrl: './doc-form.component.html',
  styleUrls: ['./doc-form.component.scss']
})
export class DocFormComponent implements OnInit {
  categorias : string[] = [];
  categoriasFiltradas : string[] = [];

  constructor(
    public dialogRef: MatDialogRef<DocFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemDoc,
    private buscador : BuscadorItensDocsService
  ) {
    this.consultarCategorias();
  }

  ngOnInit(): void {
  }

  consultarCategorias(){
    this.buscador.obterTodasCategorias()
      .pipe(take(1))
      .subscribe(d => {
        this.categorias = d;
        this.categoriasFiltradas = d;
      });
  }

  addKeywordFromInput(event: MatChipInputEvent) {
    if (event.value) {
      if(!this.data.tags)
        this.data.tags = [];
      this.data.tags.push(event.value);
      event.chipInput!.clear();
    }
  }

  remove(tag: string): void {
    const index = this.data.tags.indexOf(tag);

    if (index >= 0) {
      this.data.tags.splice(index, 1);
    }
  }

  salvarDados(){
    this.buscador.salvarDoc(this.data)
      .pipe(take(1))
      .subscribe(x => this.dialogRef.close());
  }

  filtrarCategorias(value : KeyboardEvent){
    let valor = StringHelper.removerAcentos((value?.target as HTMLInputElement)?.value ?? '');
    this.categoriasFiltradas = this.categorias
      .filter(x => x.toLowerCase().includes(valor.toLowerCase()));
  }
}
