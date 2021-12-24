import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerformanceTrendComponent } from './performance-trend/performance-trend.component';
import { PerformanceTrendService } from './service/performance-trend.service';

@NgModule({
  declarations: [
    AppComponent,
    PerformanceTrendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    PerformanceTrendService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
