import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteBarGraphComponent } from './site-bar-graph/site-bar-graph.component';
import { SiteOverviewComponent } from './site-overview/site-overview.component';
import { SiteTrendscreenComponent } from './site-trendscreen/site-trendscreen.component';

const routes: Routes = [
  {
    path: 'site/trendscreen',
    component: SiteTrendscreenComponent,
  },
  {
    path: 'site/overview',
    component: SiteOverviewComponent
  },
  {
    path: 'site/bar-graph',
    component: SiteBarGraphComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
