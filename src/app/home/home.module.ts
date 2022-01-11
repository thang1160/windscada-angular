import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PerformanceTrendComponent } from '../shared/performance-trend/performance-trend.component';
import { HomeRoutingModule } from './home-routing.module';
import { SiteOverviewComponent } from '../site-overview/site-overview.component';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [
    HomeComponent,
    SiteOverviewComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    TooltipModule
  ],
  providers: [
    PerformanceTrendComponent
  ],
})
export class HomeModule { }
