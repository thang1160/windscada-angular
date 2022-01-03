import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentWrapperComponent } from './component-wrapper/component-wrapper.component';
import { KpiComponent } from './kpi/kpi.component';
import { PerformanceTrendComponent } from './performance-trend/performance-trend.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [
    ComponentWrapperComponent,
    KpiComponent,
    PerformanceTrendComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule
  ],
  exports: [
    ComponentWrapperComponent,
    KpiComponent,
    PerformanceTrendComponent
  ]
})
export class SharedModule { }
