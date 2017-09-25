import { DataService } from 'app/services/DataService';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UIChart } from "primeng/primeng";
import { Observable } from "rxjs/Observable";
import * as moment from 'moment';

const DEFAULT_COLORS = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
  '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
  '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
  '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC']

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild("mixedChart") mixedChart: UIChart;
  @ViewChild("pie") pie: UIChart;
  @ViewChild("doughnut") doughnut: UIChart;

  BSTCBSBA: BSTCBSBA;
  BSTCBSBAs: BSTCBSBA[];
  BSTCBSBX: BSTCBSBX;
  BSTCBSBXs: BSTCBSBX[];

  db = { hours_billed: 0, unbilled_days: 0, days_remaining: 0, clients_billed: 0 }
  constructor(private data: DataService) { }

  chartOptions = {
    title: {
      display: true,
      text: 'Hours By Client - This Month'
    },
    legend: {
      position: 'left'
    },
  };

  pieLabels = [];
  pieDataTM = [];
  pieDataLM = [];
  pieColors = [];

  private configureDefaultColours(data: number[]): string[] {
    let customColours = []
    if (data.length) {

      customColours = data.map((element, idx) => {
        return DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
      });
    }
    return customColours;
  }

  hoursTM = {};
  hoursLM = {};

  // hoursTM = {
  //   labels: this.pieLabels,
  //   datasets: [
  //     {
  //       data: this.pieDataTM,
  //       backgroundColor: this.pieColors
  //     }
  //   ]
  // }

  // hoursLM = {
  //   labels: this.pieLabels,
  //   datasets: [
  //     {
  //       data: this.pieDataLM,
  //       backgroundColor: this.pieColors
  //     }
  //   ]
  // }

  hoursYoY = { labels: [], datasets: []};
  hoursANAvsALL = { labels: [], datasets: []};

  hoursByTeamChartData = {
    
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Dev Team',
            backgroundColor: DEFAULT_COLORS[0],
            data: [65, 59, 80, 55, 67, 73]
          },
          {
            label: 'Ops Team',
            backgroundColor: DEFAULT_COLORS[1],
            data: [44, 63, 57, 90, 77, 70]
          }
        ]
    
      }
    
      hoursByTeamChartDataMixed = {
    
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Dev Team',
            type: 'bar',
            backgroundColor: DEFAULT_COLORS[0],
            data: [65, 59, 80, 55, 67, 73]
          },
          {
            label: 'Ops Team',
            type: 'line',
            backgroundColor: DEFAULT_COLORS[1],
            data: [44, 63, 57, 90, 77, 70]
          }
        ]
    
      }
    
      onDataSelect(event) {
    
        let dataSetIndex = event.element._datasetIndex;
        let dataItemIndex = event.element._index;
    
        let labelClicked = this.hoursByTeamChartDataMixed.datasets[dataSetIndex].label;
        let valueClicked = this.hoursByTeamChartDataMixed.datasets[dataSetIndex].data[dataItemIndex];
    
        alert(`Looks like ${labelClicked} worked ${valueClicked} hours`);
      }
    
    
      ngAfterViewInit() {
        Observable.interval(3000).timeInterval().subscribe(() => {
    
          var hoursByTeam = this.hoursByTeamChartDataMixed.datasets;
          var randomised = hoursByTeam.map((dataset) => {
    
            dataset.data = dataset.data.map((hours) => hours * (Math.random() * 2));
    
          });
          this.mixedChart.refresh();
        });
    
      }
    

  ngOnInit() {
    this.BSTCBSBAs = [];
    this.data.getTimesheets("", "WJZ")
      .subscribe((x) => {
        console.log(x);
        this.BSTCBSBAs = x.BSTCBSBAs;
        this.BSTCBSBXs = x.BSTCBSBXs;

        // this.pieLabels = this.BSTCBSBXs.map((proj) => proj.CLIENT_CODE);

        let non0 = this.BSTCBSBXs.filter((x) => { return (x.HRSTMO !== 0) || (x.HRSLMO !== 0) })
        // console.log('BSTCBSBXs ->', this.BSTCBSBXs);
        // console.log('non0 ->', non0);

        this.pieLabels = non0.map((proj) => proj.CLIENT_CODE);

        // this.pieDataTM = this.BSTCBSBXs.map((proj) => proj.HRSTMO);
        // this.pieDataLM = this.BSTCBSBXs.map((proj) => proj.HRSLMO);

        this.pieDataTM = non0.map((proj) => proj.HRSTMO);
        this.pieDataLM = non0.map((proj) => proj.HRSLMO);

        this.pieColors = this.configureDefaultColours(this.pieDataTM);

        // console.log(this.pieLabels);
        // console.log(this.pieDataTM);
        // console.log(this.pieDataLM);
        // console.log(this.pieColors);

        this.hoursTM = {
          labels: this.pieLabels,
          datasets: [
            {
              data: this.pieDataTM,
              backgroundColor: this.pieColors
            }
          ]
        }

        this.hoursLM = {
          labels: this.pieLabels,
          datasets: [
            {
              data: this.pieDataLM,
              backgroundColor: this.pieColors
            }
          ]
        }

        let months = this.BSTCBSBAs.filter((x, i) => { return (i < 12) }).map((proj) => moment(proj.PRD_END_DATE).format("MMM"));
        let dataTY = this.BSTCBSBAs.filter((x, i) => { return (i >= 12) });
        // console.log('dataTY -> ', dataTY);

        this.hoursYoY = {

          // this.pieLabels = this.BSTCBSBXs.map((proj) => proj.CLIENT_CODE);
          // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          labels: months,
          datasets: [
            {
              label: 'This Year',
              backgroundColor: DEFAULT_COLORS[0],
              data: this.BSTCBSBAs.filter((x, i) => { return (i >= 12) }).map((proj) => proj.HRSANA)
              // data: [65, 59, 80, 55, 67, 73]
            },
            {
              label: 'Last Year',
              backgroundColor: DEFAULT_COLORS[1],
              data: this.BSTCBSBAs.filter((x, i) => { return (i < 12) }).map((proj) => proj.HRSANA)
              // data: [44, 63, 57, 90, 77, 70]
            }
          ]
        }

        this.hoursANAvsALL = {
          
              labels: months,
              datasets: [
                {
                  label: 'Me',
                  type: 'line',
                  backgroundColor: DEFAULT_COLORS[0],
                  data: dataTY.map((proj) => proj.HRSANA)                  
                },
                {
                  label: 'Company',
                  type: 'line',
                  backgroundColor: DEFAULT_COLORS[1],
                  data: dataTY.map((proj) => proj.HRSALL)       
                }
              ]
          
            }

        // this.pie.refresh();
        // this.doughnut.refresh();

        let YP = x.BILLING_PERIOD;
        let DAYX = new Date(x.BSTCBSBAs[23].PRD_END_DATE);
        let DAYQ = YP.substring(4) + '/01/' + YP.substring(0, 4);
        let DAY0 = new Date(x.BSTCBSBAs[22].PRD_END_DATE); // Date.parse(x.BSTCBSBAs[22].PRD_END_DATE);
        let DAY1 = new Date(x.BSTCBSBAs[23].PRD_END_DATE);
        DAY1.setDate(1);

        let dno = DAYX.getDate;

        // console.log(DAYQ);
        // console.log(DAY0);
        // console.log(DAY1);
        // console.log(DAYX);

        let dys = [];
        let today_dayno = new Date().getDate();
        let days = DAYX.getDate();

        // console.log("today_dayno = " + today_dayno);
        // console.log("days = " + days);

        for (var i = 1; i <= days; i++) {
          dys.push({ hrs: 0, future: (i >= today_dayno) });
        }

        let c = [];
        let dates = [];
        let h: number = 0;
        x.BSTCBSB2s.forEach(e => {
          h += e.HOURS_CHARGED;
          if (c.indexOf(e.CLIENT_CODE) == -1) { c.push(e.CLIENT_CODE) }
          // let date = moment(e.DATE_OF_SERVICE).format('YYYYMMDD')
          let this_day = new Date(e.DATE_OF_SERVICE).getDate();
          if (this_day < today_dayno) {
            if (dates.indexOf(this_day) == -1) { dates.push(this_day) }
          }

        });

        this.db.hours_billed = h;
        this.db.unbilled_days = today_dayno - dates.length - 1;
        this.db.days_remaining = days - today_dayno + 1;
        this.db.clients_billed = c.length;

        // console.log(this.db);
        // console.log(dates);
      });
  }
}

export class BSTCBSBX {
  CLIENT_CODE: string;
  CLIENT_NAME: string;
  LAST_DATE: Date;
  HRSLMO: number;
  HRSTMO: number;
  HRSTOT: number;
}

export class BSTCBSBA {
  OPS_YYYYPP: string;
  PRD_END_DATE: Date;
  HRSANA: number;
  HRSALL: number;
}