import { Injectable } from '@angular/core';
import { Response, Http, Headers, RequestOptions, ResponseContentType } from "@angular/http";
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { saveToJSONFile } from "app/services/utilities";
// import * as FileSaver from 'file-saver'; 

export interface BSTCBSCM {
    CLIENT_CODE;
    CLIENT_NAME;
    PROJECT_CODE_REQD;
}

@Injectable()
export class DataService {

    BSTCBSB1: any;
    BSTCBSB2: any;
    // BSTCBSB1s: BSTCBSB1[];
    BSTCBSB1s: any[];
    BSTCBSB2s: any[];

    data: any[];
    useJSONFiles = false;

    constructor(private http: Http) {

    }

    private ABS_Authorization = 'abs';
    private baseUrl: string = 'http://localhost:21112' + '/api/TS2/';
    //  'http://localhost:21112/';
    //  'https://wjzdataservice.absolution1.com/';

    getHeaders() {
        let headers = new Headers();
        headers.append('Authorization', this.ABS_Authorization);
        headers.append('Content-Type', "application/json");
        return { headers: headers };
    }

    getAnalyst(SYS_ANALYST_ID: string): Observable<any> {

        // let body = {"BILLING_PERIOD": BILLING_PERIOD, "SYS_ANALYST_ID": SYS_ANALYST_ID};      
        let body = {};
        let myParams = new URLSearchParams();
        myParams.append('id', SYS_ANALYST_ID);	
        let myHeaders = new Headers();
        myHeaders.append('Authorization', this.ABS_Authorization);
        myHeaders.append('Content-Type', "application/json");
        let options = new RequestOptions({ headers: myHeaders, params: myParams });
        // I WOULD LIKE TO GET THE VERSION WITH OPTIONS TO WORK
        return this.http.get(`${this.baseUrl}GetAnalyst/${SYS_ANALYST_ID}`, options)
            .map((response: Response) => {
                // let x:any = response.json();
                console.log(response);
                return response.json();
            })
            // .catch(this.handleError);
    }

 

    getClients(): Observable<any> {

        // let body = {"BILLING_PERIOD": BILLING_PERIOD, "SYS_ANALYST_ID": SYS_ANALYST_ID};      
        let body = {};
        return this.http.get(`${this.baseUrl}GetClients`, this.getHeaders())
            .map((response: Response) => {
                // let x:any = response.json();
                return response.json();
            })
    }

    saveTimesheet(d): Observable<any> {
        return this.http.post(`${this.baseUrl}SaveTimesheet`, JSON.stringify(d), this.getHeaders())
            .map((response: Response) => {
                return response.json();
            })
    }

    getInvoicePDFp(PO_ORDER_NO) {
        let body = { "PO_ORDER_NO": PO_ORDER_NO };
        let headers = new Headers();
        headers.append('Content-Type', 'application/json'); //x-www-form-urlencoded
        headers.append('Accept', 'application/pdf');
        headers.append('Authorization', this.ABS_Authorization);

        let options = new RequestOptions({ headers: headers })
        // Ensure you set the responseType to Blob.
        options.responseType = ResponseContentType.Blob;

        return this.http.post(`${this.baseUrl}GetPOPDFp`, body, options) // { headers: headers })
            .map((response: Response) => {
                //console.log(response);

                // Removed checking of valid response

                let fileBlob = response.blob();
                let blob = new Blob([fileBlob], {
                    type: 'application/pdf' // must match the Accept type
                });

                let filename = 'mypdf.pdf';
                //  FileSaver.saveAs(blob, filename);  // need to npm install and then unrem the import

                return response;
            })
    }

    getInvoicePDF(d) {
        window.open(`${this.baseUrl}GetInvoicePDF`);
    }

    // getOpenPOs(): Observable<any> {
    //     // return  this.http.post(`${this.baseUrl}GetMachineLocations`, null, this.getHeaders())
    //     return this.http.post(`${this.baseUrl}GetOpenPOs`, this.getHeaders())
    //         .map((response: Response) => {
    //             // let x:Object = response.json();
    //             let x: any = response.json();
    //             this.POTORDR1s = x.POTORDR1s;
    //             return this.POTORDR1s;
    //         })
    // }


    getTimesheets(BILLING_PERIOD: string, SYS_ANALYST_ID: string): Observable<any> {
        let body = { "BILLING_PERIOD": BILLING_PERIOD, "SYS_ANALYST_ID": SYS_ANALYST_ID };
        return this.http.post(`${this.baseUrl}GetTimesheets`, body, this.getHeaders())
            .map((response: Response) => {
                // let x:any = response.json();
                return response.json();
            })
    }

    getTimesheet(PO_ORDER_NO): Observable<any> {
        let body = { "PO_ORDER_NO": PO_ORDER_NO };
        let headers = new Headers();
        headers.append('Content-Type', 'application/json'); //x-www-form-urlencoded
        headers.append('Authorization', this.ABS_Authorization);

        return this.http.post(`${this.baseUrl}GetTimesheet`, body, { headers: headers })
            .map((response: Response) => {
                // this.POTORDR1 = response.json().POTORDR1;
                this.BSTCBSB2s = response.json().BSTCBSB2s;
                return this.BSTCBSB2s;
            })
    }


    getData(TABLE_NAME, where_clause): Observable<any> {

        if (this.useJSONFiles) {
            // assets/data/DETMATL1.json
            return this.http.get(`assets/data/${TABLE_NAME}.json`)
                .map((response: Response) => {
                    return response.json().data;

                })
        }

        else {
            let body = { "TABLE_NAME": TABLE_NAME, "where_clause": where_clause };
            let headers = new Headers();
            headers.append('Content-Type', 'application/json'); //x-www-form-urlencoded
            headers.append('Authorization', this.ABS_Authorization);
            //   console.log(TABLE_NAME);
            return this.http.post(`${this.baseUrl}GetData`, body, { headers: headers })
                .map((response: Response) => {
                    this.data = response.json().data;
                    // console.log(this.data);
                    // saveToJSONFile(this.data, TABLE_NAME + ".json")
                    saveToJSONFile(response.json(), TABLE_NAME + ".json")
                    return this.data;
                })
        }
    }
}