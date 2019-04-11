import { Component, OnInit } from '@angular/core';
import {HeadingModel} from "../../../../../../shared/component-models/heading-model";
import {MetricDetailModel} from "../../../../shared/component-models/metric-detail-model";
import {MetricBuildingBlocksMapStrategy} from "../../../strategies/metric-building-blocks-map-strategy";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductService} from "../../../../shared/services/product.service";
import {PortfolioService} from "../../../../../../shared/shared.module";
import {TitleCasePipe} from "@angular/common";
import {LobBuildingBlocksMapStrategy} from "../../../strategies/lob-building-blocks-map-strategy";
import {DirectoryHeadingStrategy} from "../../../../../../directory/strategies/directory-heading-strategy";
import {BuildingBlockModel} from "../../../../shared/component-models/building-block-model";
import {LobComponentBuildingBlocksMapStrategy} from "../../../strategies/lob-component-building-blocks-map-strategy";

@Component({
  selector: 'app-engg-maturity-product-detail',
  templateUrl: './engg-maturity-product-detail.component.html',
  styleUrls: ['./engg-maturity-product-detail.component.scss'],
  providers: [
      ProductService,
      DirectoryHeadingStrategy,
      TitleCasePipe
  ]
})
export class EnggMaturityProductDetailComponent implements OnInit {
    public hModelEnggMat: HeadingModel;
    public portfolioHeading: string;
    public portfolioName: string;
    public lobName: string;
    public productHeading: string;
    public productId: string;
    public buildingBlocks: BuildingBlockModel[];
    public metricDetailView: MetricDetailModel;
    public showBuildingBlocks: boolean=true;

    private metricToBuildingBlocksMap = new Map<string, BuildingBlockModel[]>();

    constructor(private router: Router,
                private route: ActivatedRoute,
                private strategy: DirectoryHeadingStrategy,
                private portfolioService: PortfolioService,
                private productService: ProductService,
                private metricBuildingBlocksMapStrategy: MetricBuildingBlocksMapStrategy,
                private lobComponetBuildingBlockStrategy: LobComponentBuildingBlocksMapStrategy,
                private titlecasePipe: TitleCasePipe) {
    }


    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.lobName = params['lob-name'];
            this.productId = params['product-id']
            console.log(params)

        });
        this.hModelEnggMat = this.getHeadingModel();
        this.productService.getLobProductByID(this.titlecasePipe.transform(this.lobName),'AUDITRESULT',this.productId)
            .subscribe(
                result => {
                    this.metricToBuildingBlocksMap = this.lobComponetBuildingBlockStrategy.parse(result['componentMetricDetailsList']);
                    this.buildingBlocks = this.metricToBuildingBlocksMap.get('auditResult');

                    this.hModelEnggMat = this.getHeadingModel();
                },
                error => console.log(error)
            );
    }

    getHeadingModel() {
        return {
            primaryText: 'Engineering Maturity',
            icon: 'rocket',
            crumbs: this.getCrumbs(),
            button: this.getReturnRouteModel()
        };
    }

    getCrumbs() {
        return [{
            label: this.lobName,
            commands: ['directory'],
            extras: {}
        }];
    }

    getReturnRouteModel() {
        return {
            label: 'Change Product',
            commands: ['directory'],
            extras: {}
        };
    }

    showBuildingBlocksForLob(lob: any) {
        this.showBuildingBlocks = true;
    }

    hideBuildingBlocks() {
        this.showBuildingBlocks = false;
    }

}
