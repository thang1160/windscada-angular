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


@NgModule({
  declarations: [
    AppComponent,
    PerformanceTrendComponent,
    AlarmComponent,
    ComponentWrapperComponent,
    KpiComponent
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
    ButtonModule
  ],
  providers: [
    PerformanceTrendService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
