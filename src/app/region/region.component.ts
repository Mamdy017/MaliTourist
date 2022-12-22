import { Component, OnInit } from '@angular/core';
import { RegionServiceService } from '../service/region-service.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  region: any;

  constructor(private service:RegionServiceService ) { }

  ngOnInit(): void {
    this.service.afficherRegion().subscribe(data => {
    this.region = data;
    console.table(this.region);
  });
  }
 
}

