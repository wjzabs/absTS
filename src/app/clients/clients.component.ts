import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/services/DataService';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  BSTCBSCMs: any[];

  constructor( private data: DataService ) { }

  ngOnInit() {
    this.data.getClients()
    .subscribe((x) => {
      console.log(x);
      this.BSTCBSCMs = x;
    })
  }
}