import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/services/DataService';
import { MenubarModule, MenuItem } from "primeng/primeng";
import { Menu } from "primeng/components/menu/menu";

@Component({
  selector: 'app-gltacct1',
  templateUrl: './gltacct1.component.html',
  styleUrls: ['./gltacct1.component.css']
})
export class GLTACCT1Component implements OnInit {

  display = false;
  GLTACCT1: any;
  GLTPARM1: any;
  ASFCODE1 = { VIEW_DESC: '', TABLE_NAME: '', COLUMN_NAME: '', selectionMode: '' };
  ASTCODE1s: any[];
  cols: any[];
  selectedRows: any[];
  controlPanel: MenuItem[];
  ASFCODEM = {DEFAULT_MODE: 'V'};
  
  constructor(private data: DataService) { }

  ngOnInit() {
    this.controlPanel = [
      {
        label: 'View Mode',
        items: [
          { label: 'Single Record', icon: 'fa-plus' },
          { label: 'Multiple Record', icon: 'fa-plus' },
          { label: 'Audit Trail', icon: 'fa-plus' },
        ]
      },
      {
        label: 'Screen Control',
        items: [
          { label: 'New', icon: 'fa-plus' },
          { label: 'Edit', icon: 'fa-edit' },
          { label: 'View', icon: 'fa-search' },
          { label: 'Save', icon: 'fa-plus' },
          { label: 'Update', icon: 'fa-edit' },
          { label: 'Cancel', icon: 'fa-search' },
          { label: 'Delete', icon: 'fa-plus' },
          { label: 'Done', icon: 'fa-edit' },
          { label: 'Set Copy-From', icon: 'fa-search' },
          { label: 'Defaults', icon: 'fa-search' },
        ]
      },
      {
        label: 'Begin New Records With',
        icon: 'fa-edit',
        items: [
          { label: 'Default Values', icon: 'fa-mail-forward' },
          { label: 'Empty Record', icon: 'fa-mail-reply' },
          { label: 'Last Record Updated', icon: 'fa-mail-reply' },
          { label: 'Copy-From Record', icon: 'fa-mail-reply' },
        ]
      }
    ];

    this.data.getRecord('GLTPARM1', ['GL_PARM_KEY'], ['Z'])
      .subscribe((x) => {
        console.log(x);
        this.GLTPARM1 = x;
      })
    this.data.getRecord('GLTACCT1', ['ACCT_CODE'], ['611000'])
      .subscribe((x) => {
        console.log(x);
        this.GLTACCT1 = x;
      })
  }

  onLookup(key) {
    console.log(key);
    if (key == "GLTACCT1.ACCT_CODE") {
      this.ASFCODE1.VIEW_DESC = 'Account Master';
      this.ASFCODE1.selectionMode = 'single';
      this.cols = [
        { field: 'ACCT_CODE', header: 'Acct', width: 10 },
        { field: 'ACCT_DESC', header: 'Description', width: 50 },
      ];
    }
    if (key == "GLTCLAS1.ACCT_CLASS_CODE") {
      this.ASFCODE1.VIEW_DESC = 'Account Class Master';
      this.ASFCODE1.selectionMode = 'multiple';
      this.cols = [
        { field: 'ACCT_CLASS_CODE', header: 'Acct Class', width: 10 },
        { field: 'ACCT_CLASS_DESC', header: 'Description', width: 50 },
      ];
    }
    console.log(this.ASFCODE1.selectionMode);
    let d = key.indexOf(".");
    this.ASFCODE1.TABLE_NAME = key.substring(0, d);
    this.ASFCODE1.COLUMN_NAME = key.substring(d + 1);

    this.data.getRecords(this.ASFCODE1.TABLE_NAME, [], [], "")
      .subscribe((x) => {
        console.log(x);
        this.ASTCODE1s = x;
        this.display = true;
      })
  }

  selectOK() {
    this.display = false;
    console.log(this.selectedRows);
  }

  update(dt) {
    console.log(dt);
  }

}
