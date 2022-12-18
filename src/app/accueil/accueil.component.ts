import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  file: any;



  constructor() { }

  ngOnInit(): void {
  }

  fileChang(event: any) {
    this.file = event.target.files[0]
    console.log(event)

  }


}
