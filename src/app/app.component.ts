import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ConnexionService } from './service/connexion.service';
import { StorageService } from './service/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent { title = 'MaliTourist';
  @ViewChild(MatSidenav)
 sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private Connexion:ConnexionService, private storage:StorageService) {}

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 767px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
  logout(): void {
    this.Connexion.logout().subscribe({
      next: res => {
        console.log(res);
        this.storage.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
