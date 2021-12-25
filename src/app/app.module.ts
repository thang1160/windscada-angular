import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerformanceTrendComponent } from './performance-trend/performance-trend.component';
import { AlarmComponent } from './alarm/alarm.component';
import { ButtonModule } from 'primeng/button';
import { PerformanceTrendService } from './service/performance-trend.service';

@NgModule({
  declarations: [
    AppComponent,
    PerformanceTrendComponent,
    AlarmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    HttpClientModule
  ],
  providers: [
    PerformanceTrendService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
