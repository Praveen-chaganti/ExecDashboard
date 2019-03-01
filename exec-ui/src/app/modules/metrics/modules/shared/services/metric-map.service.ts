import {Injectable} from '@angular/core';
import {OpenSourceViolationsPrimaryMetricStrategy} from '../../metrics/open-source-violations/strategies/open-source-violations-primary-metric-strategy';
import {OpenSourceViolationsTrendStrategy} from '../../metrics/open-source-violations/strategies/open-source-violations-trend-strategy';
import {SecurityViolationsPrimaryMetricStrategy} from '../../metrics/security-violations/strategies/security-violations-primary-metric-strategy';
import {SecurityViolationsTrendStrategy} from '../../metrics/security-violations/strategies/security-violations-trend-strategy';
import {StaticCodeAnalysisPrimaryMetricStrategy} from '../../metrics/static-code-analysis/strategies/static-code-analysis-primary-metric-strategy';
import {StaticCodeAnalysisTrendStrategy} from '../../metrics/static-code-analysis/strategies/static-code-analysis-trend-strategy';
import {ProductionIncidentsPrimaryMetricStrategy} from '../../metrics/production-incidents/strategies/production-incidents-primary-metric-strategy';
import {ProductionIncidentsTrendStrategy} from '../../metrics/production-incidents/strategies/production-incidents-trend-strategy';
import {UnitTestCoveragePrimaryMetricStrategy} from '../../metrics/unit-test-coverage/strategies/unit-test-coverage-primary-metric-strategy';
import {UnitTestCoverageTrendStrategy} from '../../metrics/unit-test-coverage/strategies/unit-test-coverage-trend-strategy';
import {ProductionReleasesPrimaryMetricStrategy} from '../../metrics/production-releases/strategies/production-releases-primary-metric-strategy';
import {ProductionReleasesTrendStrategy} from '../../metrics/production-releases/strategies/production-releases-trend-strategy';
import {PipelineLeadTimePrimaryMetricStrategy} from '../../metrics/pipeline-lead-time/strategies/pipeline-lead-time-primary-metric-strategy';
import {PipelineLeadTimeTrendStrategy} from '../../metrics/pipeline-lead-time/strategies/pipeline-lead-time-trend-strategy';
import {PipelineLeadTimeBuildingBlockPrimaryMetricStrategy} from '../../metrics/pipeline-lead-time/strategies/pipeline-lead-time-building-block-primary-metric-strategy';
import {OpenSourceViolationsConfiguration} from '../../metrics/open-source-violations/open-source-violations.configuration';
import {PipelineLeadTimeConfiguration} from '../../metrics/pipeline-lead-time/pipeline-lead-time.configuration';
import {ProductionIncidentsConfiguration} from '../../metrics/production-incidents/production-incidents.configuration';
import {ProductionReleasesConfiguration} from '../../metrics/production-releases/production-releases.configuration';
import {SecurityViolationsConfiguration} from '../../metrics/security-violations/security-violations.configuration';
import {StaticCodeAnalysisConfiguration} from '../../metrics/static-code-analysis/static-code-analysis.configuration';
import {UnitTestCoverageConfiguration} from '../../metrics/unit-test-coverage/unit-test-coverage.configuration';
import {SCMCommitsTrendStrategy} from '../../metrics/scm-commits/strategies/scm-commits-trend-strategy';
import {SCMCommitsPrimaryMetricStrategy} from '../../metrics/scm-commits/strategies/scm-commits-primary-metric-strategy';
import {SCMCommitsConfiguration} from '../../metrics/scm-commits/scm-commits.configuration';
import {PerformanceTestConfiguration} from "../../metrics/performance-test/performance-test.configuration";
import {PerformanceTestPrimaryMetricStrategy} from "../../metrics/performance-test/strategies/performance-test-primary-metric-strategy";
import {PerformanceTestTrendStrategy} from "../../metrics/performance-test/strategies/performance-test-trend-strategy";

@Injectable()
export class MetricMapService {
  constructor(private openSourceViolationsTrendStrategy: OpenSourceViolationsTrendStrategy,
              private openSourceViolationsPrimaryMetricStrategy: OpenSourceViolationsPrimaryMetricStrategy,
              private securityViolationsPrimaryMetricStrategy: SecurityViolationsPrimaryMetricStrategy,
              private securityViolationsTrendStrategy: SecurityViolationsTrendStrategy,
              private staticCodeAnalysisPrimaryMetricStrategy: StaticCodeAnalysisPrimaryMetricStrategy,
              private staticCodeAnalysisTrendStrategy: StaticCodeAnalysisTrendStrategy,
              private productionIncidentsPrimaryMetricStrategy: ProductionIncidentsPrimaryMetricStrategy,
              private productionIncidentsTrendStrategy: ProductionIncidentsTrendStrategy,
              private unitTestCoveragePrimaryMetricStrategy: UnitTestCoveragePrimaryMetricStrategy,
              private unitTestCoverageTrendStrategy: UnitTestCoverageTrendStrategy,
              private productionReleasesPrimaryMetricStrategy: ProductionReleasesPrimaryMetricStrategy,
              private productionReleasesTrendStrategy: ProductionReleasesTrendStrategy,
              private pipelineLeadTimePrimaryMetricStrategy: PipelineLeadTimePrimaryMetricStrategy,
              private pipelineLeadTimeTrendStrategy: PipelineLeadTimeTrendStrategy,
              private pipelineLeadTimeBuildingBlockPrimaryMetricStrategy: PipelineLeadTimeBuildingBlockPrimaryMetricStrategy,
              private scmCommitsPrimaryMetricStrategy: SCMCommitsPrimaryMetricStrategy,
              private scmCommitsTrendStrategy: SCMCommitsTrendStrategy,
              private performanceTestPrimaryMetricStrategy: PerformanceTestPrimaryMetricStrategy,
              private performanceTestTrendStategy: PerformanceTestTrendStrategy) { }

  public metrics(): Map<string, any> {
    return new Map<string, any>([
      [OpenSourceViolationsConfiguration.identifier, {
        primaryMetricStrategy: this.openSourceViolationsPrimaryMetricStrategy,
        trendStrategy: this.openSourceViolationsTrendStrategy,
        isRatio: false,
        label: OpenSourceViolationsConfiguration.buildingBlockLabel
      }],
      [SecurityViolationsConfiguration.identifier, {
        primaryMetricStrategy: this.securityViolationsPrimaryMetricStrategy,
        trendStrategy: this.securityViolationsTrendStrategy,
        isRatio: false,
        label: SecurityViolationsConfiguration.buildingBlockLabel
      }],
      [StaticCodeAnalysisConfiguration.identifier, {
        primaryMetricStrategy: this.staticCodeAnalysisPrimaryMetricStrategy,
        trendStrategy: this.staticCodeAnalysisTrendStrategy,
        isRatio: false,
        label: StaticCodeAnalysisConfiguration.buildingBlockLabel
      }],
      [ProductionIncidentsConfiguration.identifier, {
        primaryMetricStrategy: this.productionIncidentsPrimaryMetricStrategy,
        trendStrategy: this.productionIncidentsTrendStrategy,
        isRatio: false,
        label: ProductionIncidentsConfiguration.buildingBlockLabel
      }],
      [UnitTestCoverageConfiguration.identifier, {
        primaryMetricStrategy: this.unitTestCoveragePrimaryMetricStrategy,
        trendStrategy: this.unitTestCoverageTrendStrategy,
        isRatio: true,
        label: UnitTestCoverageConfiguration.buildingBlockLabel
      }],
      [ProductionReleasesConfiguration.identifier, {
        primaryMetricStrategy: this.productionReleasesPrimaryMetricStrategy,
        trendStrategy: this.productionReleasesTrendStrategy,
        isRatio: false,
        label: ProductionReleasesConfiguration.buildingBlockLabel
      }],
      [PipelineLeadTimeConfiguration.identifier, {
        primaryMetricStrategy: this.pipelineLeadTimePrimaryMetricStrategy,
        trendStrategy: this.pipelineLeadTimeTrendStrategy,
        buildingBlockPrimaryMetricStrategy: this.pipelineLeadTimeBuildingBlockPrimaryMetricStrategy,
        isRatio: false,
        label: PipelineLeadTimeConfiguration.buildingBlockLabel
      }],
      [SCMCommitsConfiguration.identifier, {
        primaryMetricStrategy: this.scmCommitsPrimaryMetricStrategy,
        trendStrategy: this.scmCommitsTrendStrategy,
        isRatio: false,
        label: SCMCommitsConfiguration.buildingBlockLabel
      }],
      [PerformanceTestConfiguration.identifier, {
          primaryMetricStrategy: this.performanceTestPrimaryMetricStrategy,
          trendStrategy: this.performanceTestTrendStategy,
          isRatio: true,
          label: PerformanceTestConfiguration.buildingBlockLabel
      }]
    ]);
  }
}
