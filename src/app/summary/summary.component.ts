import { DataService } from 'app/services/DataService';
import { Component, OnInit } from '@angular/core';

//       [selectionMode]="'single'" (onRowDblclick)="doubleClickedRow = BSTCBSB2s_D.CLIENT_CODE"
//  [style]="('text-align': right;)"


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  days = [];
  monthName: string;
  year: number;

  SYS_ANALYST_ID: string;
  SYS_ANALYST_NAME: string;
  selectedDayNo: number = 0;
  BSTCBSB2s = [];
  BSTCBSBXs = [];
  BSTCBSB2s_D = [];
  doubleClickedRow;
selectedDay;
CLIENT_CODEs = ['INT','ODG','CCU'];
PROJECT_CODEs = [{PROJECT_CODE:'A'},{PROJECT_CODE:'B'},{PROJECT_CODE:'C'}];

  grdFormats = {
    "BSTCBSBX": [
        {
            "COLUMN_NAME": "CLIENT_CODE",
            "COLUMN_CAPTION": "Client",
            "COLUMN_WIDTH": 4,
            "COLUMN_FORMAT": null,
            "DATA_TYPE": "VARCHAR2",
            "DATA_SIZE": null,
            "DATA_SCALE": null,
            "DATA_LENGTH": 3
        },
        {
            "COLUMN_NAME": "CLIENT_NAME",
            "COLUMN_CAPTION": "Name",
            "COLUMN_WIDTH": 12,
            "COLUMN_FORMAT": null,
            "DATA_TYPE": "VARCHAR2",
            "DATA_SIZE": null,
            "DATA_SCALE": null,
            "DATA_LENGTH": 30
        },
        {
            "COLUMN_NAME": "LAST_DATE",
            "COLUMN_CAPTION": "Last",
            "COLUMN_WIDTH": 10,
            "COLUMN_FORMAT": "MM/dd/yy",
            "DATA_TYPE": "DATE",
            "DATA_SIZE": null,
            "DATA_SCALE": null,
            "DATA_LENGTH": 15
        },        
        {
            "COLUMN_NAME": "HRSLMO",
            "COLUMN_CAPTION": "LMo",
            "COLUMN_WIDTH": 7,
            "COLUMN_FORMAT": "#,##0.0",
            "DATA_TYPE": "NUMBER",
            "DATA_SIZE": "4",
            "DATA_SCALE": "0",
            "DATA_LENGTH": 22
        },        
        {
            "COLUMN_NAME": "HRSTMO",
            "COLUMN_CAPTION": "TMo",
            "COLUMN_WIDTH": 7,
            "COLUMN_FORMAT": "#,##0.0",
            "DATA_TYPE": "NUMBER",
            "DATA_SIZE": "4",
            "DATA_SCALE": "0",
            "DATA_LENGTH": 22
        },        
        {
            "COLUMN_NAME": "HRSTOT",
            "COLUMN_CAPTION": "TMo-All",
            "COLUMN_WIDTH": 7,
            "COLUMN_FORMAT": "#,##0.0",
            "DATA_TYPE": "NUMBER",
            "DATA_SIZE": "4",
            "DATA_SCALE": "0",
            "DATA_LENGTH": 22
        }
    ],        
    "BSTCBSB2s_D": [
        {
            "COLUMN_NAME": "CLIENT_CODE",
            "COLUMN_CAPTION": "Client",
            "COLUMN_WIDTH": 4,
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
            "COLUMN_NAME": "DESC_OF_SERVICE",
            "COLUMN_CAPTION": "Description",
            "COLUMN_WIDTH": 60,
            "COLUMN_FORMAT": null,
            "DATA_TYPE": "VARCHAR2",
            "DATA_SIZE": null,
            "DATA_SCALE": null,
            "DATA_LENGTH": 200        
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
        }     
    ],       
    "BSTCBSB2s_C": [
        {
            "COLUMN_NAME": "DATE_OF_SERVICE",
            "COLUMN_CAPTION": "Date",
            "COLUMN_WIDTH": 10,
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

  constructor(private data: DataService) { }

  ngOnInit() {
    let d = new Date();
    // document.write("The current month is ");

    let SYS_ANALYST_ID = 'WJZ'; // FOR TESTING

    let YYYY =  d.getFullYear().toString();
    let PP = (d.getMonth() +1).toString();
    let YYYYPP = YYYY + PP;

    YYYYPP = '201707'; // FOR TESTING
 
    this.initializeMonth(YYYYPP, SYS_ANALYST_ID);
  }

  initializeMonth(YYYYPP: string, SYS_ANALYST_ID: string) {

    let monthNames = [
      "January", "February", "March", 
      "April", "May", "June",
      "July", "August", "September", 
      "October", "November", "December"];
    
    let PP = parseInt(YYYYPP.substring(4,6)); 
    // you have got to be kidding me
    let YYYY = parseInt(YYYYPP.substring(0,4)); 
    
    this.monthName = monthNames[PP -1];
    this.year = YYYY;

    let d = new Date(YYYY, PP-1, 1);
    let d_today = new Date();
    let d_today_YYYY = d_today.getFullYear();
    let d_today_MM = d_today.getMonth();
    let d_today_DD = d_today.getDate();

    let i_first = d.getDay();
    let d_last =  new Date(YYYY, PP, 0).getDate();

    for(let i:number = 0; i<=41; i++) {
      if (i<i_first || i > i_first + d_last -1) {
        let day =  {dayno: -1, today: false};
        this.days[i] = day;
      } else {
        let DD = i - i_first +1;
        let id = new Date(YYYY, PP-1, DD)
        let isToday = false;
        if (YYYY == d_today_YYYY && 
            PP == d_today_MM +1 && 
            DD == d_today_DD) {
          isToday = true;
        }
        let day =  {dayno: i, today: 
          isToday, date: DD, dayValue: id, 
          dateJSON: id.toJSON(),
          dateF: PP + '/' + DD + '/' + YYYY};
        this.days[i] = day;
      }
    }

    this.data.getTimesheets(YYYYPP, SYS_ANALYST_ID)
    .subscribe((x) => {
      this.BSTCBSB2s = x.BSTCBSB2s;
      this.BSTCBSBXs = x.BSTCBSBXs;
    })
  }

  selectDay(day) {
    this.selectedDayNo = day.dayno;
    this.selectedDay = this.days[day.dayno];
    this.BSTCBSB2s_D = this.BSTCBSB2s
    .filter(x => x.DATE_OF_SERVICE.substring(0,10) 
      === this.selectedDay.dateJSON.substring(0,10))
  }

  isSelectedDay(dayno:number) :boolean {
    return dayno === this.selectedDayNo;
  }

  clicked() {

  }
}
