import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { SiteTrendscreenComponent } from './site-trendscreen/site-trendscreen.component';
import { SiteOverviewComponent } from './site-overview/site-overview.component';
import { SharedModule } from '../shared/shared.module';
import { AlarmComponent } from './alarm/alarm.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SiteTrendscreenComponent,
    SiteOverviewComponent,
    AlarmComponent
  ],
  imports: [
    CommonModule,
    SiteRoutingModule,
    SharedModule,
    TableModule,
    DialogModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    FormsModule,
  ]
})
export class SiteModule { }
