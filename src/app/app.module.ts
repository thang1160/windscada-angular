import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { SiteModule } from './site/site.module';
import { TurbineModule } from './turbine/turbine.module';


@NgModule({
  declarations: [
    AppComponent,
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
    DropdownModule,
    HomeModule,
    SiteModule,
    TurbineModule
    
  ],
  providers: [
    // PerformanceTrendService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
