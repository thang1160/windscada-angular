import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerformanceTrendComponent } from './performance-trend/performance-trend.component';
import { AlarmComponent } from './alarm/alarm.component';
import { ButtonModule } from 'primeng/button';
import { PerformanceTrendService } from './service/performance-trend.service';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from 'primeng/dialog';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentWrapperComponent } from './component-wrapper/component-wrapper.component';
import { KpiComponent } from './kpi/kpi.component';
import { TurbineStatusComponent } from './turbine-status/turbine-status.component';
import {TreeTableModule} from 'primeng/treetable';
import { TurbineAlarmComponent } from './turbine-alarm/turbine-alarm.component';

@NgModule({
  declarations: [
    AppComponent,
    PerformanceTrendComponent,
    AlarmComponent,
    ComponentWrapperComponent,
    KpiComponent,
    TurbineStatusComponent,
    TurbineAlarmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    HttpClientModule,
    MatDialogModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DropdownModule,
    ButtonModule,
    TreeTableModule
  ],
  providers: [
    PerformanceTrendService,
    PerformanceTrendComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
