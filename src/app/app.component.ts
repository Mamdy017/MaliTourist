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
 

  constructor() {}

  ngAfterViewInit() {
    
  }
  

}
