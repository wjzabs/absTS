import { StatisticComponent } from './statistic/statistic.component';
import { SettingsComponent } from './settings/settings.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { MenuModule, PanelModule, DataListModule, ScheduleModule, DialogModule, ChartModule, 
  CalendarModule, DataTableModule, DropdownModule, InputTextModule, ButtonModule,
  InputMaskModule, InputTextareaModule, EditorModule, RadioButtonModule, FieldsetModule,
  MultiSelectModule, ListboxModule, SpinnerModule, SliderModule, RatingModule, ContextMenuModule,
  TabViewModule, StepsModule, TreeModule, GMapModule, DataGridModule, TooltipModule,
  ConfirmDialogModule, GrowlModule, DragDropModule, GalleriaModule, SharedModule, 
  CheckboxModule, CarouselModule, MessagesModule, MenubarModule
} from "primeng/primeng";

import {RouterModule, Routes} from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import { ProfileComponent } from './profile/profile.component';
import { ClientsComponent } from './clients/clients.component';
import { DataService } from "app/services/DataService";
import { SummaryComponent } from './summary/summary.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MyQtipDirective } from './my-qtip.directive';
import { TodoComponent } from './todo/todo.component';
import { MenuComponent } from './menu/menu.component';
import { GLTACCT1Component } from './gltacct1/gltacct1.component';
import { SPFPRXS1Component } from './spfprxs1/spfprxs1.component';
import { GLTCLAS1Component } from './gltclas1/gltclas1.component';
// import { TS2DataService } from "app/services/TSdata";

const appRoutes: Routes = [
  { path: "", redirectTo: "/settings", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "calendar", component: CalendarComponent },
  { path: "summary", component: SummaryComponent },  
  { path: "timesheets", component: TimesheetsComponent },
  { path: "timesheet", component: TimesheetComponent},
  { path: "clients", component: ClientsComponent},
  { path: "profile", component: ProfileComponent},
  { path: "settings", component: SettingsComponent},
  { path: "todo", component: TodoComponent},
  { path: "menu", component: MenuComponent},
  { path: "GLTACCT1", component: GLTACCT1Component},
  { path: "GLTCLAS1", component: GLTCLAS1Component},
  { path: "SPFPRXS1", component: SPFPRXS1Component},
];

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    DashboardComponent,
    TimesheetComponent,
    TimesheetsComponent,
    ProfileComponent,
    ClientsComponent,
    SummaryComponent,
    CalendarComponent,
    StatisticComponent,
    MyQtipDirective,
    TodoComponent,
    MenuComponent,
    GLTACCT1Component,
    SPFPRXS1Component,
    GLTCLAS1Component 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    
    MenuModule, PanelModule, DataListModule, ScheduleModule, 
    DialogModule, ChartModule, CalendarModule, DataTableModule,
    DropdownModule, InputTextModule, CheckboxModule,
    ButtonModule, InputMaskModule, InputTextareaModule,
    EditorModule, RadioButtonModule, FieldsetModule,
    MultiSelectModule, ListboxModule, SpinnerModule,
    SliderModule, RatingModule, ContextMenuModule,
    TabViewModule, StepsModule, TreeModule, GMapModule,
    DataGridModule, TooltipModule, ConfirmDialogModule,
    GrowlModule, DragDropModule, GalleriaModule, SharedModule, 
    CarouselModule, MessagesModule, MenubarModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
