import {MetricGraphModel} from '../../../shared/component-models/metric-graph-model';
import {MetricDetail} from '../../../shared/domain-models/metric-detail';
import {MetricTimeSeriesElement} from '../../../shared/domain-models/metric-time-series-element';
import {GraphStrategyBase} from '../../../shared/strategies/graph-strategy-base';
import {PresentationFunctions} from '../../../shared/utils/presentation-functions';
import {Injectable} from '@angular/core';
import {LobGraphTrendStrategy} from "./lob-graph-trend-strategy";

@Injectable()
export class LobComponentGrphStrategy extends GraphStrategyBase{

    constructor (private trendStrategy: LobGraphTrendStrategy) {super();}

    public parse(model: MetricDetail): MetricGraphModel {


        const metricGraph = new MetricGraphModel();

        metricGraph.lastScanned = PresentationFunctions.calculateLastScannedPresentation(model.summary.lastScanned);
        metricGraph.values = model.timeSeries.sort((a, b) => a.daysAgo - b.daysAgo).map(this.count);
        metricGraph.isRatio = false;
        metricGraph.trend = this.trendStrategy.parse(model.summary);
        metricGraph.score = null;
        metricGraph.valueLabel = 'CODE_REVIEW';
        metricGraph.toolTipLabel = x => x === 1 ? '1 issue' : x.toLocaleString() + ' AuditOk';
        return metricGraph;
    }

    protected count(seriesElement: MetricTimeSeriesElement): number {
        const validSet = new Set(['CODE_REVIEW']);
        return seriesElement.counts.reduce((sum, item) => validSet.has(item.label['type']) ? sum + item.value : sum, 0);

    }

}
