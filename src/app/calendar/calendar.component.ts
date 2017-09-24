import { Component, OnInit, ChangeDetectorRef } from '@angular/core';


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
  
  header: any;
  defaultDate = new Date();
  editable = true;

  event: MyEvent;
  
  dialogVisible: boolean = false;
  
  idGen: number = 100;
  
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
      // this.getEvents().then(events => {this.events = events;});

      this.events = [
        {
            "title": "All Day Event",
            "start": "2017-09-01",
            "allDay": false,
            "BILLING_PERIOD": "201709",
            "SYS_ANALYST_ID": "WJZ",
            "DATE_OF_SERVICE": "2017-09-01",
            "DTL_LINE_NO": 1,
            "CLIENT_CODE": "AHA",
            "PROJECT_CODE": "",
            "DESC_OF_SERVICE": "All Day Event",
            "HOURS_CHARGED": 8,
            "RATE_PER_HOUR": 180           
        },
        {
            "title": "Long Event",
            "start": "2017-09-01",
            "allDay": false,
            "BILLING_PERIOD": "201709",
            "SYS_ANALYST_ID": "WJZ",
            "DATE_OF_SERVICE": "2017-09-01",
            "DTL_LINE_NO": 2,
            "CLIENT_CODE": "INT",
            "PROJECT_CODE": "",
            "DESC_OF_SERVICE": "Long Event",
            "HOURS_CHARGED": 8,
            "RATE_PER_HOUR": 180  
        },
        {
            "title": "Repeating Event",
            "start": "2017-09-04",
            "allDay": false,
            "BILLING_PERIOD": "201709",
            "SYS_ANALYST_ID": "WJZ",
            "DATE_OF_SERVICE": "2017-09-04",
            "DTL_LINE_NO": 1,
            "CLIENT_CODE": "NYA",
            "PROJECT_CODE": "",
            "DESC_OF_SERVICE": "Repeating Event",
            "HOURS_CHARGED": 8,
            "RATE_PER_HOUR": 180  
        },
        {
            "title": "Repeating Event",
            "start": "2017-09-07",
            "allDay": false,
            "BILLING_PERIOD": "201709",
            "SYS_ANALYST_ID": "WJZ",
            "DATE_OF_SERVICE": "2017-09-07",
            "DTL_LINE_NO": 1,
            "CLIENT_CODE": "ODG",
            "PROJECT_CODE": "",
            "DESC_OF_SERVICE": "Repeating Event",
            "HOURS_CHARGED": 8,
            "RATE_PER_HOUR": 180  
        },
        {
            "title": "Conference",
            "start": "2017-09-10",
            "allDay": false,
            "BILLING_PERIOD": "201709",
            "SYS_ANALYST_ID": "WJZ",
            "DATE_OF_SERVICE": "2017-09-10",
            "DTL_LINE_NO": 1,
            "CLIENT_CODE": "INT",
            "PROJECT_CODE": "",
            "DESC_OF_SERVICE": "Conference",
            "HOURS_CHARGED": 8,
            "RATE_PER_HOUR": 180  
        }
    ];

      this.header = {
    left: 'prev,next today',
    center: 'title',
    right: 'month,agendaWeek,agendaDay'
  };
  }
  
  getDate() {
    return new Date();
  }
  eventRender (event, element) {
    console.log(event);
    console.log(element);

    element.qtip({
      content: event.DESC_OF_SERVICE
   });
  // + '<div class="tooltip"><span class="tooltiptext">' + event.DESC_OF_SERVICE + '</span></div>'  
    return '<a class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-draggable fc-resizable">'
    + '<div class="fc-content" style="background-color:' + DEFAULT_COLORS[1] + '">'  
    + '<span class="fc-time">' + event.CLIENT_CODE + '</span>'
    + '<span class="fc-time">:' + event.PROJECT_CODE + '</span>'    
    + '<span class="fc-time">:' + event.HOURS_CHARGED + '</span>'
    + '<span class="fc-title">:' + event.title + '</span>'
    + '</div></a>'; 
  }

  handleDayClick(event) {
      this.event = new MyEvent();
      this.event.start = event.date.format();
      this.dialogVisible = true;
      
      //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
      this.cd.detectChanges();
  }
  
  handleEventClick(e) {
      this.event = new MyEvent();
      this.event.title = e.calEvent.title;
      
      let start = e.calEvent.start;
      let end = e.calEvent.end;
      if(e.view.name === 'month') {
          start.stripTime();
      }
      
      if(end) {
          end.stripTime();
          this.event.end = end.format();
      }

      this.event.id = e.calEvent.id;
      this.event.start = start.format();
      this.event.allDay = e.calEvent.allDay;
      this.dialogVisible = true;
  }
  
  saveEvent() {
      //update
      if(this.event.id) {
          let index: number = this.findEventIndexById(this.event.id);
          if(index >= 0) {
              this.events[index] = this.event;
          }
      }
      //new
      else {
          this.event.id = this.idGen++;
          this.events.push(this.event);
          this.event = null;
      }
      
      this.dialogVisible = false;
  }
  
  deleteEvent() {
      let index: number = this.findEventIndexById(this.event.id);
      if(index >= 0) {
          this.events.splice(index, 1);
      }
      this.dialogVisible = false;
  }
  
  findEventIndexById(id: number) {
      let index = -1;
      for(let i = 0; i < this.events.length; i++) {
          if(id == this.events[i].id) {
              index = i;
              break;
          }
      }
      
      return index;
  }
}

export class MyEvent {
  id: number;
  title: string;
  start: string;
  end: string;
  allDay: boolean = true;
}
 
