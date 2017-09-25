import { DataService } from 'app/services/DataService';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import {Message} from 'primeng/primeng';

const DEFAULT_COLORS = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
  '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
  '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
  '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC']

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  events: any[];
  
  YP: string;
  msgs: Message[];

  header: any;
  defaultDate = new Date();
  editable = true;
  CLIENT_CODEs: string[];
  event: MyEvent;

  BSTCBSBCs: BSTCBSBC[];

  dialogVisible: boolean = false;

  idGen: number = 100;

  constructor(private data: DataService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.events = [];
    this.msgs = [];
    this.BSTCBSBCs = [];

    // this.getEvents().then(events => {this.events = events;});

    // this.events = [
    //   {
    //     "id": "2017-09-01.1",
    //     "title": "All Day Event",
    //     "start": "2017-09-01",
    //     "allDay": false,
    //     "BILLING_PERIOD": "201709",
    //     "SYS_ANALYST_ID": "WJZ",
    //     "DATE_OF_SERVICE": "2017-09-01",
    //     "DTL_LINE_NO": 1,
    //     "CLIENT_CODE": "AHA",
    //     "PROJECT_CODE": null,
    //     "DESC_OF_SERVICE": "All Day Event",
    //     "HOURS_CHARGED": 8,
    //     "RATE_PER_HOUR": 180
    //   },
    //   {
    //     "id": "2017-09-01.2",
    //     "title": "Long Event",
    //     "start": "2017-09-01",
    //     "allDay": false,
    //     "BILLING_PERIOD": "201709",
    //     "SYS_ANALYST_ID": "WJZ",
    //     "DATE_OF_SERVICE": "2017-09-01",
    //     "DTL_LINE_NO": 2,
    //     "CLIENT_CODE": "INT",
    //     "PROJECT_CODE": null,
    //     "DESC_OF_SERVICE": "Long Event",
    //     "HOURS_CHARGED": 8,
    //     "RATE_PER_HOUR": 180
    //   },
    //   {
    //     "id": "2017-09-04.1",
    //     "title": "Repeating Event",
    //     "start": "2017-09-04",
    //     "allDay": false,
    //     "BILLING_PERIOD": "201709",
    //     "SYS_ANALYST_ID": "WJZ",
    //     "DATE_OF_SERVICE": "2017-09-04",
    //     "DTL_LINE_NO": 1,
    //     "CLIENT_CODE": "NYA",
    //     "PROJECT_CODE": null,
    //     "DESC_OF_SERVICE": "Repeating Event",
    //     "HOURS_CHARGED": 8,
    //     "RATE_PER_HOUR": 180
    //   },
    //   {
    //     "id": "2017-09-07.1",
    //     "title": "Repeating Event",
    //     "start": "2017-09-07",
    //     "allDay": false,
    //     "BILLING_PERIOD": "201709",
    //     "SYS_ANALYST_ID": "WJZ",
    //     "DATE_OF_SERVICE": "2017-09-07",
    //     "DTL_LINE_NO": 1,
    //     "CLIENT_CODE": "ODG",
    //     "PROJECT_CODE": "T",
    //     "DESC_OF_SERVICE": "Repeating Event",
    //     "HOURS_CHARGED": 8,
    //     "RATE_PER_HOUR": 180
    //   },
    //   {
    //     "id": "2017-09-10.1",
    //     "title": "Conference",
    //     "start": "2017-09-10",
    //     "allDay": false,
    //     "BILLING_PERIOD": "201709",
    //     "SYS_ANALYST_ID": "WJZ",
    //     "DATE_OF_SERVICE": "2017-09-10",
    //     "DTL_LINE_NO": 1,
    //     "CLIENT_CODE": "INT",
    //     "PROJECT_CODE": null,
    //     "DESC_OF_SERVICE": "Conference",
    //     "HOURS_CHARGED": 8,
    //     "RATE_PER_HOUR": 180
    //   }
    // ];


    // this.CLIENT_CODEs = [];
    // this.events.forEach((x) => {
    //   let CLIENT_CODE = x.CLIENT_CODE;
    //   if (this.CLIENT_CODEs.indexOf(CLIENT_CODE) == -1) {
    //     this.CLIENT_CODEs.push(CLIENT_CODE)
    //   };
    //   x.color = this.getColor(x.CLIENT_CODE);
    // });

 

    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'month'
    };
  }

  selectClient(client: BSTCBSBC) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Client Selected', detail: 'Client:' + client.CLIENT_CODE});
  }

  getDate() {
    let d = new Date();
    let YP: string = moment(d).format('YYYYMM');
     // let YP = d.getFullYear().toString() + (d.getMonth() + 1).toString()
    if (YP !== this.YP) {
      this.getTimeSheets(YP);
    }
   
    return d;
  }

  getTimeSheets(YP: string) {
 
    this.YP = YP;

    this.events = [];
    this.CLIENT_CODEs = [];
    this.data.getTimesheets(YP,"WJZ")
    .subscribe((x) => {
      // console.log(x);
      x.BSTCBSB2s.forEach(e => {

        if (this.CLIENT_CODEs.indexOf(e.CLIENT_CODE) == -1) {
          this.CLIENT_CODEs.push(e.CLIENT_CODE)
        };

        let d: string = moment(e.DATE_OF_SERVICE).format('YYYY-MM-DD');

        let event = new MyEvent();
        event.title = e.DESC_OF_SERVICE;
        event.start = d;

        event.BILLING_PERIOD = e.BILLING_PERIOD;
        event.SYS_ANALYST_ID = e.SYS_ANALYST_ID;
        event.DATE_OF_SERVICE = d;
        event.DTL_LINE_NO = e.DTL_LINE_NO;
        event.CLIENT_CODE = e.CLIENT_CODE;
        event.PROJECT_CODE = e.PROJECT_CODE;
        event.DESC_OF_SERVICE = e.DESC_OF_SERVICE;
        event.HOURS_CHARGED = e.HOURS_CHARGED;
        event.RATE_PER_HOUR = e.RATE_PER_HOUR;

        event.id = event.DATE_OF_SERVICE + "." + event.DTL_LINE_NO;

        event.allDay = false;
        event.color = this.getColor(e.CLIENT_CODE);
        this.events.push(event);

      });
      this.setTotals("");
      // this.events = x;
    })

    

  }

  setTotals(CLIENT_CODE: string) {

    if (CLIENT_CODE !== '') {
      let h: number = 0;
      this.events.forEach((e) =>{
        if (e.CLIENT_CODE == CLIENT_CODE) {
          h += e.HOURS_CHARGED;
        }
      })
      let i = this.CLIENT_CODEs.indexOf(CLIENT_CODE);
      this.BSTCBSBCs[i].HOURS_CHARGED = h;
    }

    else {
      // console.log('CLIENT_CODE2s',this.CLIENT_CODEs);

      this.BSTCBSBCs = [];

      this.CLIENT_CODEs.forEach((x)=> {
        // console.log(x);
        let y = new BSTCBSBC();
        y.CLIENT_CODE = x;
        y.color = this.getColor(x);
        let h: number = 0;
        this.events.forEach((e) =>{
          if (e.CLIENT_CODE == x) {
            h += e.HOURS_CHARGED;
          }
        })
        y.HOURS_CHARGED = h;
        // console.log(y);
        this.BSTCBSBCs.push(y)
      })
    }

    // console.log('BSTCBSBCs',this.BSTCBSBCs);

  }

  eventRender(event, element) {
    // console.log(event);
    element.qtip({
      content: {
        text: event.DESC_OF_SERVICE
      }
    });
    // console.log(element);

    // + '<div class="tooltip"><span class="tooltiptext">' + event.DESC_OF_SERVICE + '</span></div>'  
    // + '<span class="fc-time">:' + (event.PROJECT_CODE ? event.PROJECT_CODE : "") + '</span>'   

    return '<a class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-draggable fc-resizable">'
      + '<div class="fc-content" style="background-color:' + event.color + '">'
      + '<span class="fc-time">' + event.CLIENT_CODE + '</span>'
      + '<span class="fc-time">:' + (event.PROJECT_CODE || "") + '</span>'
      + '<span class="fc-time">:' + (event.HOURS_CHARGED || "0") + '</span>'
      + '<span class="fc-title">:' + event.title + '</span>'
      + '</div></a>';
  }

  getColor(CLIENT_CODE: string) {
    let c = 0;

    if (this.CLIENT_CODEs) {
      c = this.CLIENT_CODEs.indexOf(CLIENT_CODE);
      if (c == -1) { c = 0 };
    }
    return DEFAULT_COLORS[c]
  }

  handleDayClick(event) {
    this.event = new MyEvent();
    this.event.start = event.date.format();
    // console.log(event);
    this.event.DESC_OF_SERVICE = this.event.title;
    this.event.DATE_OF_SERVICE = this.event.start;

    this.dialogVisible = true;

    //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
    this.cd.detectChanges();
  }

  handleEventClick(e) {
    this.event = new MyEvent();
    this.event.title = e.calEvent.title;

    let start = e.calEvent.start;
    // let end = e.calEvent.end;
    // if(e.view.name === 'month') {
    //     start.stripTime();
    // }

    // if(end) {
    //     end.stripTime();
    //     this.event.end = end.format();
    // }

    this.event.BILLING_PERIOD = e.calEvent.BILLING_PERIOD;
    this.event.SYS_ANALYST_ID = e.calEvent.SYS_ANALYST_ID;
    this.event.DATE_OF_SERVICE = e.calEvent.DATE_OF_SERVICE;
    this.event.DTL_LINE_NO = e.calEvent.DTL_LINE_NO;
    this.event.CLIENT_CODE = e.calEvent.CLIENT_CODE;
    this.event.PROJECT_CODE = e.calEvent.PROJECT_CODE;
    this.event.DESC_OF_SERVICE = e.calEvent.DESC_OF_SERVICE;
    this.event.HOURS_CHARGED = e.calEvent.HOURS_CHARGED;
    this.event.RATE_PER_HOUR = e.calEvent.RATE_PER_HOUR;

    this.event.id = e.calEvent.id;
    this.event.start = start.format();
    this.event.allDay = e.calEvent.allDay;

    console.log(e.calEvent, this.event);

    this.dialogVisible = true;
  }

  saveEvent() {

    this.event.title = this.event.DESC_OF_SERVICE;
    this.event.start = this.event.DATE_OF_SERVICE;
    
    this.event.color = this.getColor(this.event.CLIENT_CODE);

    //update
    if (this.event.id) {
      let index: number = this.findEventIndexById(this.event.id);
      if (index >= 0) {
        this.events[index] = this.event;
      }
    }
    //new
    else {
      // this.event.id = this.idGen++;
      let DTL_max = 0;
      this.events.forEach((x) => {
        if (x.DATE_OF_SERVICE == this.event.DATE_OF_SERVICE) {
          if (x.DTL_LINE_NO > DTL_max) { DTL_max = x.DTL_LINE_NO }
        }
      });
      DTL_max++;

      this.event.DTL_LINE_NO = DTL_max;
      this.event.id = this.event.DATE_OF_SERVICE + "." + this.event.DTL_LINE_NO;
      this.events.push(this.event);
      this.event = null;
    }

    this.dialogVisible = false;
  }

  deleteEvent() {
    let index: number = this.findEventIndexById(this.event.id);
    if (index >= 0) {
      this.events.splice(index, 1);
    }
    this.dialogVisible = false;
  }

  findEventIndexById(id: string) {
    let index = -1;
    for (let i = 0; i < this.events.length; i++) {
      if (id == this.events[i].id) {
        index = i;
        break;
      }
    }

    return index;
  }
}

export class MyEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean = false;

  color: string;

  BILLING_PERIOD: string;
  SYS_ANALYST_ID: string;
  DATE_OF_SERVICE: string;
  DTL_LINE_NO: number;
  CLIENT_CODE: string;
  PROJECT_CODE: string;
  DESC_OF_SERVICE: string;
  HOURS_CHARGED: number;
  RATE_PER_HOUR: number;
}

export class BSTCBSBC {
  CLIENT_CODE: string;
  HOURS_CHARGED: number;
  color: string;
}