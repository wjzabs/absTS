import { SettingsComponent } from './settings/settings.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuModule } from "primeng/primeng";
import {RouterModule, Routes} from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import { ProfileComponent } from './profile/profile.component';
import { ClientsComponent } from './clients/clients.component';

const appRoutes: Routes = [
  { path: "", redirectTo: "/settings", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "timesheets", component: TimesheetsComponent },
  { path: "timesheet", component: TimesheetComponent},
  { path: "clients", component: ClientsComponent},
  { path: "profile", component: ProfileComponent},
  { path: "settings", component: SettingsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    DashboardComponent,
    TimesheetComponent,
    TimesheetsComponent,
    ProfileComponent,
    ClientsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MenuModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
