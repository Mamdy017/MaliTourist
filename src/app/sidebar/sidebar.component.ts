import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
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
  isLoggedIn: any;
  roles: any;
  showAdminBoard: any;
  showModeratorBoard: any;
  username: any;
  eventBusSub?:Subscription ;
  eventBusService: any;

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

    this.isLoggedIn = this.storage.connexionReussi();

    if (this.isLoggedIn) {
      const user = this.storage.recupererUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
    }

  
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
