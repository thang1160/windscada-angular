import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PerformanceTrendComponent } from '../shared/performance-trend/performance-trend.component';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  providers: [
    PerformanceTrendComponent
  ],
})
export class HomeModule { }
