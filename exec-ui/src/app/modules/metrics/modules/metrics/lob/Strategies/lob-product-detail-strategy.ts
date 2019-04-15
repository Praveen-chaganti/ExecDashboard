import {Strategy} from '../../../../../shared/strategies/strategy';
import {MetricSummary} from '../../../shared/domain-models/metric-summary';
import {Injectable} from '@angular/core';
import {MetricValueModel} from '../../../shared/component-models/metric-value-model';

@Injectable()
export class LobProductDetailStrategy implements Strategy<MetricSummary, MetricValueModel[]> {
    parse(model: MetricSummary) {

        const validSet = new Set(['TEST_RESULT','STATIC_SECURITY_ANALYSIS','LIBRARY_POLICY','CODE_QUALITY','CODE_REVIEW','PERF_TEST']);
        const sums = model.counts
            .filter(count => validSet.has(count.label['type']))
            .reduce((runningSums, count) => {
                return runningSums.set(count.label['type'], count.label['auditStatus']);
            }, new Map());

        let result = [];

        if(sums.get('TEST_RESULT')){
            result.push({name : 'FeatureTest', value : sums.get('TEST_RESULT')});
        }
        if(sums.get('STATIC_SECURITY_ANALYSIS')){
            result.push({name : 'SSA', value : sums.get('STATIC_SECURITY_ANALYSIS')});
        }
        if(sums.get('LIBRARY_POLICY')){
            result.push({name : 'OSS', value : sums.get('LIBRARY_POLICY')});
        }
        if(sums.get('CODE_QUALITY')){
            result.push({name : 'SCA', value : sums.get('CODE_QUALITY')});
        }
        if(sums.get('CODE_REVIEW')){
            result.push({name : 'Peer Review', value : sums.get('CODE_REVIEW')});
        }
        if(sums.get('PERF_TEST')){
            result.push({name : 'PT', value : sums.get('PERF_TEST')});
        }
        return result;
    }
}
