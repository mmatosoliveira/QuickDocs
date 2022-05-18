import { Component, Input, OnInit } from '@angular/core';
import { ItemDoc } from 'src/app/models/item-doc.model';

@Component({
  selector: 'app-card-item-doc',
  templateUrl: './card-item-doc.component.html',
  styleUrls: ['./card-item-doc.component.scss']
})
export class CardItemDocComponent implements OnInit {

  @Input()
  doc : ItemDoc | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  openLink(){
    window.open(this.doc?.link, "_blank");
  }

  getIcone(){
    return this.doc?.icone ?? "code";
  }
}
