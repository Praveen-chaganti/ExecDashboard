import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {BuildingBlockModel} from '../../component-models/building-block-model';
import {MetricSummary} from "../../domain-models/metric-summary";


@Component({
  selector: 'app-engg-maturity-building-blocks',
  templateUrl: './engg-maturity-building-blocks.component.html',
  styleUrls: ['./engg-maturity-building-blocks.component.scss']
})
export class EnggMaturityBuildingBlocksComponent implements OnInit, OnChanges {
  @Input() public buildingBlocks: BuildingBlockModel[];

  @Input() public metricSummary: MetricSummary;

  @Input() public isComponentList: boolean;
  @Input() public compress: boolean;
  @Input() public isComponent: boolean;
    public message:any;

  public reportingBuildingBlocks: number;
  public totalBuildingBlocks: number;
  public icon: string;



  constructor() { }

  ngOnInit() {
    this.icon = 'box';
  }


  ngOnChanges() {

    if (this.buildingBlocks) {
      this.reportingBuildingBlocks = this.buildingBlocks.filter(this.reportingProductsFilter).length;
      this.totalBuildingBlocks = this.buildingBlocks.length;
    }
  }

  reportingProductsFilter(buildingBlock: BuildingBlockModel) {
    return buildingBlock.metrics.length;
  }
}
