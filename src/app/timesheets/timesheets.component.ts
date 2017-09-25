import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/services/DataService';

@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.css']
})
export class TimesheetsComponent implements OnInit {

  SYS_ANALYST_ID: string = "WJZ";
  BILLING_PERIOD: string = "";
  
  BSTCBSB2s: any[];
  BSTCBSBXs: any[];

  CLIENT_CODEs = ['INT','ODG','CCU'];
  PROJECT_CODEs = [{PROJECT_CODE:'A'},{PROJECT_CODE:'B'},{PROJECT_CODE:'C'}];
  
  grdFormats = {
    "BSTCBSB2s": [
        {
            "COLUMN_NAME": "DATE_OF_SERVICE",
            "COLUMN_CAPTION": "Date",
            "COLUMN_WIDTH": 9,
            "COLUMN_FORMAT": "MM/dd/yy",
            "DATA_TYPE": "DATE",
            "DATA_SIZE": null,
            "DATA_SCALE": null,
            "DATA_LENGTH": 15            
        },
        {
            "COLUMN_NAME": "DESC_OF_SERVICE",
            "COLUMN_CAPTION": "Description",
            "COLUMN_WIDTH": 20,
            "COLUMN_FORMAT": null,
            "DATA_TYPE": "VARCHAR2",
            "DATA_SIZE": null,
            "DATA_SCALE": null,
            "DATA_LENGTH": 60
        },     
        {
          "COLUMN_NAME": "CLIENT_CODE",
          "COLUMN_CAPTION": "Client",
          "COLUMN_WIDTH": 9,
          "COLUMN_FORMAT": null,
          "DATA_TYPE": "VARCHAR2",
          "DATA_SIZE": null,
          "DATA_SCALE": null,
          "DATA_LENGTH": 3
        }, 
        {
            "COLUMN_NAME": "PROJECT_CODE",
            "COLUMN_CAPTION": "Proj",
            "COLUMN_WIDTH": 4,
            "COLUMN_FORMAT": null,
            "DATA_TYPE": "VARCHAR2",
            "DATA_SIZE": null,
            "DATA_SCALE": null,
            "DATA_LENGTH": 3
        },            
        {
            "COLUMN_NAME": "HOURS_CHARGED",
            "COLUMN_CAPTION": "Hrs",
            "COLUMN_WIDTH": 7,
            "COLUMN_FORMAT": "#,##0.0",
            "DATA_TYPE": "NUMBER",
            "DATA_SIZE": "4",
            "DATA_SCALE": "0",
            "DATA_LENGTH": 22
        },        
        {
            "COLUMN_NAME": "RATE_PER_HOUR",
            "COLUMN_CAPTION": "Rate",
            "COLUMN_WIDTH": 7,
            "COLUMN_FORMAT": "#,##0",
            "DATA_TYPE": "NUMBER",
            "DATA_SIZE": "4",
            "DATA_SCALE": "0",
            "DATA_LENGTH": 22
        },        
        {
            "COLUMN_NAME": "AMOUNT",
            "COLUMN_CAPTION": "Amount",
            "COLUMN_WIDTH": 7,
            "COLUMN_FORMAT": "#,##0.00",
            "DATA_TYPE": "NUMBER",
            "DATA_SIZE": "4",
            "DATA_SCALE": "0",
            "DATA_LENGTH": 22
        }        
    ]    
  }
  constructor( private data: DataService ) { }

  ngOnInit() {

    this.BSTCBSB2s = [];
    this.BSTCBSBXs = [];
    this.data.getTimesheets("", this.SYS_ANALYST_ID)
      .subscribe((x) => {
        console.log(x);
        this.BSTCBSB2s = x.BSTCBSB2s;
        this.BSTCBSBXs = x.BSTCBSBXs;
        this.BILLING_PERIOD = x.BILLING_PERIOD;
    })
  }
}
