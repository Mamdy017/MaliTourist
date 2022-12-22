import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ConnexionService } from '../service/connexion.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
   currentUser: any;

  constructor(private observer: BreakpointObserver, private Connexion:ConnexionService, private storage:StorageService) { }

  ngOnInit(): void {
    this.observer.observe(['(max-width: 767px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
    this.currentUser=this.storage.recupererUser();
    console.table(this.currentUser);
    var moi = this.currentUser.id;

    console.log("je suis id user" + moi);
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
