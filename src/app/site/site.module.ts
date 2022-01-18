import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { SiteTrendscreenComponent } from './site-trendscreen/site-trendscreen.component';
import { SiteOverviewComponent } from './site-overview/site-overview.component';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SiteBarGraphComponent } from './site-bar-graph/site-bar-graph.component';
import { BarGraphComponent } from './site-bar-graph/bar-graph/bar-graph.component';
import { DropdownModule } from 'primeng/dropdown';
import { PerformanceDataComponent } from '../performance-data/performance-data.component';

@NgModule({
  declarations: [
    SiteTrendscreenComponent,
    SiteOverviewComponent,
    SiteBarGraphComponent,
    BarGraphComponent,
    PerformanceDataComponent
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
    DropdownModule,
    FormsModule,
    DropdownModule
  ]
})
export class SiteModule { }
