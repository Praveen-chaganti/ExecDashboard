import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from '../../../shared/shared.module';
import {MetricGraphComponent} from './components/metric-graph/metric-graph.component';
import {MetricSegmentationComponent} from './components/metric-segmentation/metric-segmentation.component';
import {TotalReportingComponent} from './components/metric-total-reporting/metric-total-reporting.component';
import {TotalReportingPipe} from './components/metric-total-reporting/metric-total-reporting.pipe';
import {TotalReportingPercentPipe} from './components/metric-total-reporting/metric-total-reporting-percent.pipe';
import {MetricTrendIndicatorComponent} from './components/metric-trend-indicator/metric-trend-indicator.component';
import {MetricAuxiliaryFigureComponent} from './components/metric-auxiliary-figure/metric-auxiliary-figure.component';
import {MetricMapService} from './services/metric-map.service';
import {BuildingBlockComponent} from './components/building-block/building-block.component';
import {BuildingBlocksComponent} from './components/building-blocks/building-blocks.component';
import {BuildingBlockMetricNamePipe} from './components/building-block/building-block-metric-name.pipe';
import {EnggMaturityBuildingBlocksComponent} from "./components/engg_maturity_building-blocks/engg-maturity-building-blocks.component";

@NgModule({
  imports: [
    FlexLayoutModule,
    CommonModule,
    SharedModule
  ],
  declarations: [
    BuildingBlockComponent,
    BuildingBlocksComponent,
    BuildingBlockMetricNamePipe,
    MetricGraphComponent,
    MetricSegmentationComponent,
    MetricTrendIndicatorComponent,
    MetricAuxiliaryFigureComponent,
    TotalReportingComponent,
    TotalReportingPipe,
    TotalReportingPercentPipe,
    EnggMaturityBuildingBlocksComponent
  ],
  exports: [
    BuildingBlockComponent,
    BuildingBlocksComponent,
    BuildingBlockMetricNamePipe,
    MetricGraphComponent,
    MetricSegmentationComponent,
    MetricTrendIndicatorComponent,
    MetricAuxiliaryFigureComponent,
    TotalReportingComponent,
    TotalReportingPipe,
    TotalReportingPercentPipe,
    EnggMaturityBuildingBlocksComponent
  ],
  providers: [
    MetricMapService
  ]
})
export class DashboardSharedModule {
}
