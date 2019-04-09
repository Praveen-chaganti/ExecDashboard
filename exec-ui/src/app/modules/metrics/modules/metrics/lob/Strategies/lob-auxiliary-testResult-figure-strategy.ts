import {Strategy} from '../../../../../shared/strategies/strategy';
import {MetricSummary} from '../../../shared/domain-models/metric-summary';
import {Injectable} from '@angular/core';
import {MetricValueModel} from '../../../shared/component-models/metric-value-model';

@Injectable()
export class LobAuxiliaryTestResultFigureStrategy implements Strategy<MetricSummary, MetricValueModel[]> {
  parse(model: MetricSummary) {

      const validSet = new Set(['TEST_RESULT','STATIC_SECURITY_ANALYSIS','LIBRARY_POLICY','CODE_QUALITY','CODE_REVIEW','PERF_TEST']);
      const sums = model.counts
          .filter(count => validSet.has(count.label['type']))
          .reduce((runningSums, count) => {
              return runningSums.set(count.label['type'], count.value.toLocaleString());
          }, new Map());

      let result = [];

      if(sums.get('TEST_RESULT')){
        result.push({name : 'TEST_RESULT', value : sums.get('TEST_RESULT').toLocaleString()});
      }
      if(sums.get('STATIC_SECURITY_ANALYSIS')){
          result.push({name : 'STATIC_SECURITY_ANALYSIS', value : sums.get('STATIC_SECURITY_ANALYSIS').toLocaleString()});
      }
      if(sums.get('LIBRARY_POLICY')){
          result.push({name : 'LIBRARY_POLICY', value : sums.get('LIBRARY_POLICY').toLocaleString()});
      }
      if(sums.get('CODE_QUALITY')){
          result.push({name : 'CODE_QUALITY', value : sums.get('CODE_QUALITY').toLocaleString()});
      }
      if(sums.get('CODE_REVIEW')){
          result.push({name : 'CODE_REVIEW', value : sums.get('CODE_REVIEW').toLocaleString()});
      }
      if(sums.get('PERF_TEST')){
          result.push({name : 'PERF_TEST', value : sums.get('PERF_TEST').toLocaleString()});
      }
      console.log(result)
      return result;
  }
}
