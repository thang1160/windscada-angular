import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentWrapperComponent } from './component-wrapper/component-wrapper.component';
import { KpiComponent } from './kpi/kpi.component';
import { PerformanceTrendComponent } from './performance-trend/performance-trend.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TreeTableModule } from 'primeng/treetable';
import { TurbineStatusComponent } from './turbine-status/turbine-status.component';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    ComponentWrapperComponent,
    KpiComponent,
    PerformanceTrendComponent,
    TurbineStatusComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    TreeTableModule,
    ButtonModule
  ],
  exports: [
    ComponentWrapperComponent,
    KpiComponent,
    PerformanceTrendComponent,
    TurbineStatusComponent
  ]
})
export class SharedModule { }
