import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {MenuItem} from "primeng/primeng";
import {Menu} from "primeng/components/menu/menu";
import {ActivatedRoute, Router} from "@angular/router";

declare var jQuery :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  menuItems: MenuItem[];
  miniMenuItems: MenuItem[];

  @ViewChild('bigMenu') bigMenu : Menu;
  @ViewChild('smallMenu') smallMenu : Menu;

  constructor(private router : Router) {

  }

  ngOnInit() {

    let handleSelected = function(event) {

      let allMenus = jQuery(event.originalEvent.target).closest('ul');
      let allLinks = allMenus.find('.menu-selected');
      // console.log(allLinks);
      allLinks.removeClass("menu-selected");
      let selected = jQuery(event.originalEvent.target).closest('a');
      selected.addClass('menu-selected');
      // console.log(selected);
    }

    this.menuItems = [
      {label: 'Dashboard', icon: 'fa-home', routerLink: ['/dashboard'], command: (event) => handleSelected(event)},
      {label: 'Calendar', icon: 'fa-calendar', routerLink: ['/calendar'], command: (event) => handleSelected(event)},
      {label: 'Summary', icon: 'fa-address-card-o', routerLink: ['/summary'], command: (event) => handleSelected(event)},
      {label: 'Timesheets', icon: 'fa-calendar-times-o', routerLink: ['/timesheets'], command: (event) => handleSelected(event)},
      {label: 'Timesheet', icon: 'fa-clock-o', routerLink: ['/timesheet'], command: (event) => handleSelected(event)},
      {label: 'Clients', icon: 'fa-tasks', routerLink: ['/clients'], command: (event) => handleSelected(event)},
      {label: 'Profile', icon: 'fa-users', routerLink: ['/profile'], command: (event) => handleSelected(event)},
      {label: 'Settings', icon: 'fa-sliders', routerLink: ['/settings'], command: (event) => handleSelected(event)},
      {label: 'Todo', icon: 'fa-list-ol', routerLink: ['/todo'], command: (event) => handleSelected(event)},
      {label: 'Menu', icon: 'fa-columns', routerLink: ['/menu'], command: (event) => handleSelected(event)},
      {label: 'Accounts', icon: 'fa-database', routerLink: ['/GLTACCT1'], command: (event) => handleSelected(event)},
      {label: 'Account Classes', icon: 'fa-bitbucket', routerLink: ['/GLTCLAS1'], command: (event) => handleSelected(event)},
      {label: 'Promo Expense Summary', icon: 'fa-desktop', routerLink: ['/SPFPRXS1'], command: (event) => handleSelected(event)},
    ]

    this.miniMenuItems = [];
    this.menuItems.forEach( (item : MenuItem) => {
      let miniItem = { icon: item.icon, routerLink: item.routerLink }
      this.miniMenuItems.push(miniItem);
    })
  }

  selectInitialMenuItemBasedOnUrl() {
    let path = document.location.pathname;
    let menuItem = this.menuItems.find( (item) => { return item.routerLink[0] == path });
    if (menuItem) {
      let selectedIcon = this.bigMenu.container.querySelector(`.${menuItem.icon}`);
      jQuery(selectedIcon).closest('li').addClass('menu-selected');
    }
  }

  ngAfterViewInit() {
    this.selectInitialMenuItemBasedOnUrl();
  }
}