import { AfterViewChecked, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { DocsListComponent } from './../docs-list/docs-list.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isDark : boolean = false;
  themeColor: 'primary' | 'accent' | 'warn' = 'primary';
  isOpened : boolean = true;
  showSearchInput : boolean = false;
  searchedValue : string = '';

  @Output()
  toggleSidenav : EventEmitter<boolean> = new EventEmitter();

  @Output()
  onToggleTheme : EventEmitter<boolean> = new EventEmitter();

  @Output()
  onCloseDocsSettings : EventEmitter<any> = new EventEmitter();

  @Output()
  onSearch : EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('filter')
  filter : any;

  constructor(
    private localStorage : LocalStorageService,
    public dialog: MatDialog
  ) {
    this.isDark = this.localStorage.get<boolean>('isDark', true);
  }

  ngOnInit(): void {
  }

  ngAfterContentChecked() : void{
    if(this.filter)
      this.filter.nativeElement.focus();
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.localStorage.set('isDark', this.isDark);
    this.onToggleTheme.emit(this.isDark);
  }

  abrirDialogListaDocs(){
    const dialogRef = this.dialog.open(DocsListComponent, {
      width: '80%',
      height: '75%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.onCloseDocsSettings.emit();
    });
  }

  onInputEvent(){
    if(this.searchedValue.length === 0)
      this.onSearch.emit(this.searchedValue);
  }
}
