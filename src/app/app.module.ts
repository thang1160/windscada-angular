import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerformanceTrendComponent } from './performance-trend/performance-trend.component';
import { PerformanceTrendService } from './service/performance-trend.service';
import { ComponentWrapperComponent } from './component-wrapper/component-wrapper.component';


@NgModule({
  declarations: [
    AppComponent,
    PerformanceTrendComponent,
    ComponentWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
