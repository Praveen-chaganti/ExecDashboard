import {DashboardRoutingModule} from './dashboard.routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MetricBuildingBlocksMapStrategy} from './strategies/metric-building-blocks-map-strategy';
import {PreviewsModule} from '../previews/previews.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DashboardSharedModule} from '../shared/shared.module';
import {LobBuildingBlocksMapStrategy} from "./strategies/lob-building-blocks-map-strategy";
import {LobAuxiliaryFigureStrategy} from "../metrics/lob/Strategies/lob-auxiliary-figure-strategy";
import {Engg_maturity_dashboardComponent} from "./components/engg-maturity-dashboard/engg-maturity-dashboard.component";

@NgModule({
  imports: [
    FlexLayoutModule,
    CommonModule,
    SharedModule,
    DashboardSharedModule,
    DashboardRoutingModule,
    PreviewsModule
  ],
  declarations: [
    DashboardComponent,
    Engg_maturity_dashboardComponent
  ],
  exports: [
    DashboardComponent,
   Engg_maturity_dashboardComponent
  ],
  providers: [
    MetricBuildingBlocksMapStrategy,
    LobBuildingBlocksMapStrategy,
    LobAuxiliaryFigureStrategy
  ]
})

export class DashboardModule {
}
