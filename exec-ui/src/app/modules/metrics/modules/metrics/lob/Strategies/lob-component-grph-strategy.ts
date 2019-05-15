import {MetricGraphModel} from '../../../shared/component-models/metric-graph-model';
import {MetricDetail} from '../../../shared/domain-models/metric-detail';
import {MetricTimeSeriesElement} from '../../../shared/domain-models/metric-time-series-element';
import {GraphStrategyBase} from '../../../shared/strategies/graph-strategy-base';
import {PresentationFunctions} from '../../../shared/utils/presentation-functions';
import {Injectable} from '@angular/core';
import {LobGraphTrendStrategy} from "./lob-graph-trend-strategy";
import {BuildingBlockModel} from "../../../shared/component-models/building-block-model";
import {LobGraphModel} from "../../../shared/component-models/lob-graph-model";

@Injectable()
export class LobComponentGrphStrategy{

    constructor (private trendStrategy: LobGraphTrendStrategy) {}

    public parse1(model: MetricDetail): LobGraphModel{
        var code_Review: any[]
        code_Review = model.timeSeries.sort((a, b) => a.daysAgo - b.daysAgo).map(this.codeReview);
        var code_Quality: any[]
        code_Quality = model.timeSeries.sort((a, b) => a.daysAgo - b.daysAgo).map(this.codeQuality);
        var test_result: any[]
        test_result = model.timeSeries.sort((a, b) => a.daysAgo - b.daysAgo).map(this.testResult);
        var SSA: any[]
        SSA = model.timeSeries.sort((a, b) => a.daysAgo - b.daysAgo).map(this.SSA);
        var OSS: any[]
        OSS = model.timeSeries.sort((a, b) => a.daysAgo - b.daysAgo).map(this.OSS);
        var perf_Test: any[]
        perf_Test = model.timeSeries.sort((a, b) => a.daysAgo - b.daysAgo).map(this.perfTest);

        let auditResultsMapping = new Map();
        auditResultsMapping.set("CODE_REVIEW",code_Review)
        auditResultsMapping.set("CODE_QUALITY",code_Quality)
        auditResultsMapping.set("TEST_RESULT",test_result)
        auditResultsMapping.set("STATIC_SECURITY_ANALYSIS",SSA)
        auditResultsMapping.set("LIBRARY_POLICY",OSS)
        auditResultsMapping.set("PERF_TEST",perf_Test)


        const lobGraph = new LobGraphModel();
        lobGraph.lastScanned = PresentationFunctions.calculateLastScannedPresentation(model.summary.lastScanned);
        lobGraph.values = auditResultsMapping;
        lobGraph.isRatio = false;
        lobGraph.trend = this.trendStrategy.parse(model.summary);
        lobGraph.score = null;
        lobGraph.valueLabel = 'MEASURABLE QUALITY CHECKS';
        lobGraph.toolTipLabel = x => x === 1 ? '1 issue' : x.toLocaleString() + ' AuditOk';
        return lobGraph;

    }

    protected codeReview(seriesElement: MetricTimeSeriesElement): number {
        const validSet = new Set(['CODE_REVIEW']);
        return seriesElement.counts.reduce((sum, item) => (item.label['type'] == 'CODE_REVIEW') ? item.value : sum, 0);
    }
    protected codeQuality(seriesElement: MetricTimeSeriesElement): number {
        return seriesElement.counts.reduce((sum, item) => (item.label['type'] == 'CODE_QUALITY') ? item.value : sum, 0);
    }
    protected testResult(seriesElement: MetricTimeSeriesElement): number {
        return seriesElement.counts.reduce((sum, item) => (item.label['type'] == 'TEST_RESULT') ? item.value : sum, 0);
    }
    protected SSA(seriesElement: MetricTimeSeriesElement): number {
        return seriesElement.counts.reduce((sum, item) => (item.label['type'] == 'STATIC_SECURITY_ANALYSIS') ? item.value : sum, 0);
    }
    protected OSS(seriesElement: MetricTimeSeriesElement): number {
        return seriesElement.counts.reduce((sum, item) => (item.label['type'] == 'LIBRARY_POLICY') ? item.value : sum, 0);
    }
    protected perfTest(seriesElement: MetricTimeSeriesElement): number {
        return seriesElement.counts.reduce((sum, item) => (item.label['type'] == 'PERF_TEST') ? item.value : sum, 0);
    }


}
