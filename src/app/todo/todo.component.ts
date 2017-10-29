import { DataService } from './../services/DataService';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  ASTTODO1: ASTTODO1;
  ASTTODO1s: ASTTODO1[];
  selectedRow: any;
  items = ["Context Menu Item 1", "Context Menu Item 2", "Context Menu Item 3"]
  cols = [
    { field: 'TODO_NO', header: 'Todo#', width: 10 },
    { field: 'TODO_DESC', header: 'Description', width: 50 },
    { field: 'TODO_TYPE', header: 'Type', width: 10 },
    { field: 'FORM_NAME', header: 'Form/Object', width: 10 },
    { field: 'INIT_DATE', header: 'By', width: 10 },
    { field: 'INIT_OPER', header: 'Created', width: 10 },
  ];

  INIT_OPERs = ["WJZ", "RDW", "MPR"];

  constructor(private data: DataService) {
    this.ASTTODO1 = new ASTTODO1();
  }

  keyPressed(event) {
    console.log(event);

    this.ASTTODO1.INIT_OPER = "WJZ";
    let d = new Date()
    this.ASTTODO1.INIT_DATE = d.toJSON();

    let TODO_NO = '000000';
    this.ASTTODO1s.forEach((z) => {
      if (z.TODO_NO > TODO_NO) { TODO_NO = z.TODO_NO };
    });
    TODO_NO = "" + (parseInt(TODO_NO) + 1)

    let pad = "000000"
    TODO_NO = pad.substring(0, pad.length - TODO_NO.length) + TODO_NO
    this.ASTTODO1.TODO_NO = TODO_NO;

    this.ASTTODO1s.push(this.ASTTODO1);
    this.ASTTODO1 = new ASTTODO1();

    console.log(this.ASTTODO1s);

    this.ASTTODO1s = this.ASTTODO1s.slice();  // required for PrimeNG change detection

  }

  ngOnInit() {
    // this.ASTTODO1s = [
    //   {
    //     "TODO_NO": "000001",
    //     "TODO_DESC": "My First Task",
    //     "TODO_TYPE": "Dev",
    //     "FORM_NAME": "ASFTODO1",
    //     "INIT_OPER": "WJZ",
    //     "INIT_DATE": "09/25/2017"
    //   }
    // ]

    // Create Table ASTTODO1 (
    // TODO_NO VARCHAR2(10),
    // TODO_DESC VARCHAR2(100),
    // TODO_TYPE VARCHAR2(10),
    // FORM_NAME VARCHAR2(8),
    // INIT_OPER VARCHAR2(20),
    // INIT_DATE DATE,
    // TODO_STATUS VARCHAR2(1),
    // Primary Key (TODO_NO));

    // INSERT INTO ASTTODO1 VALUES ('000001','My First Task','Dev','ASFTODO1','WJZ',SYSDATE,'A')
    // INSERT INTO ASTTODO1 VALUES ('000002','My 2nd Task','Cloud','ASFTODO1','WJZ',SYSDATE,'A')

    this.data.getASTTODO1s()
      .subscribe((x) => {
        console.log(x);
        this.ASTTODO1s = x.ASTTODO1s;
      })

  }

  update() {
    this.data.putASTTODO1s(this.ASTTODO1s)
    .subscribe((x) => {
      console.log(x);
    })
    alert('database has been updated')
  }
}
export class ASTTODO1 {
  TODO_NO: string;
  TODO_DESC: string;
  TODO_TYPE: string;
  FORM_NAME: string;
  INIT_OPER: string;
  INIT_DATE: string;
}