import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute, Router} from '@angular/router';
import {PortfolioService} from '../../../../../../shared/shared.module';
import {Portfolio} from '../../../../../../shared/domain-models/portfolio';
import {ProductService} from '../../../../shared/services/product.service';
import {BuildingBlockModel} from '../../../../shared/component-models/building-block-model';
import {HeadingModel} from '../../../../../../shared/component-models/heading-model';
import {MetricBuildingBlocksMapStrategy} from '../../../strategies/metric-building-blocks-map-strategy';
import {SCMCommitsConfiguration} from '../../../../metrics/scm-commits/scm-commits.configuration';
import {ItemType} from '../../../../shared/component-models/item-type';
import {DirectoryHeadingStrategy} from "../../../../../../directory/strategies/directory-heading-strategy";
import {nsend} from "q";
import {MetricDetailModel} from "../../../../shared/component-models/metric-detail-model";
import {LobBuildingBlocksMapStrategy} from "../../../strategies/lob-building-blocks-map-strategy";
import {TitleCasePipe} from "@angular/common";
import {MetricDetail} from "../../../../shared/domain-models/metric-detail";
import {MetricGraphModel} from "../../../../shared/component-models/metric-graph-model";
import {LobComponentGrphStrategy} from "../../../../metrics/lob/Strategies/lob-component-grph-strategy";

@Component({
    selector: 'app-engg_maturity_dashboard',
    templateUrl: 'engg-maturity-dashboard.component.html',
    styleUrls: ['engg-maturity-dashboard.component.scss'],
    providers: [
        PortfolioService,
        ProductService,
        DirectoryHeadingStrategy,
        TitleCasePipe
    ]
})
export class Engg_maturity_dashboardComponent implements OnInit {

    public hModelEnggMat: HeadingModel;
    public portfolioHeading: string;
    public portfolioName: string;
    public lobName: string;
    public productHeading: string;
    public productId: string;
    public buildingBlocks: BuildingBlockModel[];
    public metricDetailView: MetricDetailModel;
    public metricGraphModel: MetricGraphModel
    public showBuildingBlocks: boolean=true;

    private metricToBuildingBlocksMap = new Map<string, BuildingBlockModel[]>();

    constructor(private router: Router,
                private route: ActivatedRoute,
                private strategy: DirectoryHeadingStrategy,
                private portfolioService: PortfolioService,
                private productService: ProductService,
                private metricBuildingBlocksMapStrategy: MetricBuildingBlocksMapStrategy,
                private lobBuildingBlockStrategy: LobBuildingBlocksMapStrategy,
                private lobGraphStrategy : LobComponentGrphStrategy,
                private titlecasePipe: TitleCasePipe) {
    }


    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.lobName = params['lob-name'];

        });
        this.hModelEnggMat = this.getHeadingModel();
        // TODO: need to design separate service fop getting products on LOB level
        this.productService.getLobProductsByLobAndType(this.titlecasePipe.transform(this.lobName),"AUDITRESULT")
            .subscribe(
                result => {
                    console.log(result)
                    this.metricToBuildingBlocksMap = this.lobBuildingBlockStrategy.parse(result);
                    // TODO: need to filter based on the LOB name
                    this.buildingBlocks = this.metricToBuildingBlocksMap.get('auditResult');

                    this.hModelEnggMat = this.getHeadingModel();
                },
                error => console.log(error)
            );

        this.productService.getLobProductDetails(this.titlecasePipe.transform(this.lobName),'AUDITRESULT','CI286438')
            .subscribe(
                result => {
                    const metricDetail = new MetricDetail();
                    metricDetail.summary = result['summary'];
                    metricDetail.timeSeries = result['timeSeries'];
                    this.metricGraphModel = this.lobGraphStrategy.parse(metricDetail);
                    console.log(this.metricDetailView)


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
            label: 'Change Lob',
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
