import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isDark: boolean = true;
  @ViewChild('sidenav') sidenav!: SidenavComponent;

  constructor(
    private localStorage: LocalStorageService,
    private overlayContainer: OverlayContainer
  ) {
    this.isDark = this.localStorage.get<boolean>('isDark', true);
    this.controlOverlayContainer();
  }

  ngOnInit(): void {
  }

  toggleSidenav() {
    this.sidenav!.toggleSidenav();
  }

  controlOverlayContainer(){
    if (this.isDark) {
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
    } else {
      this.overlayContainer
        .getContainerElement()
        .classList.remove('dark-theme');
    }
  }

}
