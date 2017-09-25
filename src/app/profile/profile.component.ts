import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/services/DataService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  BSTCBSSA: any;

  constructor( private data: DataService ) { }

  ngOnInit() {
    this.data.getAnalyst('WJZ')
    .subscribe((x) => {
      console.log(x);
      this.BSTCBSSA = x;
    })
  }
}
