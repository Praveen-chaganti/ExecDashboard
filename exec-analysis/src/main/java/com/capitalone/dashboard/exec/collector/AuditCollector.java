package com.capitalone.dashboard.exec.collector;

import com.capitalone.dashboard.exec.model.MetricType;
import com.capitalone.dashboard.exec.model.HygieiaSparkQuery;
import com.capitalone.dashboard.exec.model.MetricCollectionStrategy;
import com.capitalone.dashboard.exec.model.CollectorItemMetricDetail;
import com.capitalone.dashboard.exec.model.MetricCount;
import com.capitalone.dashboard.exec.model.CollectorType;
import com.capitalone.dashboard.exec.repository.PortfolioMetricRepository;
import org.apache.commons.collections.CollectionUtils;
import org.apache.spark.sql.Row;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Date;
import java.util.Set;
import java.util.HashSet;
@Component
public class AuditCollector extends DefaultMetricCollector {

    public AuditCollector(PortfolioMetricRepository portfolioMetricRepository) {
        super(portfolioMetricRepository);
    }

    @Override
    protected MetricType getMetricType() {
        return  MetricType.AUDITRESULT;
    }

    @Override
    protected String getQuery() {
        return HygieiaSparkQuery.AUDIT_RESULTS_QUERY;
    }

    @Override
    protected String getCollection() {
        return "audit_results";
    }

    @Override
    protected MetricCollectionStrategy getCollectionStrategy() {
        return MetricCollectionStrategy.LATEST;
    }

    @Override
    protected CollectorItemMetricDetail getCollectorItemMetricDetail(List<Row> rowList, MetricType metricType) {
        CollectorItemMetricDetail collectorItemMetricDetail = new CollectorItemMetricDetail();
        if (!CollectionUtils.isEmpty(rowList)) {
            collectorItemMetricDetail.setType(getMetricType());
            Map<String,HashMap<String,String>>auditMap =new HashMap<>();

            Set<Date> timeWindowDt =new HashSet<>();
            for (Row row : rowList) {
                HashMap<String,String> auditStatusMap = new HashMap<>();
                Date timeWindowDt1 = row.getAs("timeWindow");
                timeWindowDt.add(timeWindowDt1);
                String auditType = row.getAs("auditType");
                String auditStatus = row.getAs("auditStatus");
                String auditTypeStatus = row.getAs("auditTypeStatus");
                auditStatusMap.put("auditStatus",auditStatus);
                auditStatusMap.put("auditTypeStatus",auditTypeStatus);
                auditMap.put(auditType,auditStatusMap );
            }
            updateCollectorItemMetricDetail(collectorItemMetricDetail, auditMap ,timeWindowDt);
        }

        return collectorItemMetricDetail;
    }

    private void updateCollectorItemMetricDetail(CollectorItemMetricDetail collectorItemMetricDetail, Map<String,HashMap<String,String>> auditMap,Set<Date> timeWindowDt) {

        for(Map.Entry<String,HashMap<String,String>> entry : auditMap.entrySet()){

            String type = entry.getKey();
            Map<String,String> valueMap = entry.getValue();

            MetricCount mc = getMetricCount1(valueMap ,type );

            if(mc != null){
                collectorItemMetricDetail.setStrategy(getCollectionStrategy());
                collectorItemMetricDetail.addCollectorItemMetricCount(timeWindowDt.iterator().next(), mc);
                collectorItemMetricDetail.setLastScanDate(timeWindowDt.iterator().next());
            }

        }
    }

    @Override
    protected CollectorType getCollectorType() {
        return null;
    }

    @Override
    protected MetricCount getMetricCount(String level, double value, String type) {
        return null;
    }

    private MetricCount getMetricCount1(Map<String,String> valueMap,String type){
        MetricCount mc = new MetricCount();
        Map<String, String> label = new HashMap<>();
        label.put("type",type);
        for(Map.Entry<String,String> entry : valueMap.entrySet()){
            label.put(entry.getKey(),entry.getValue());
        }

        Double value;
        if(("OK").equalsIgnoreCase(label.get("auditStatus"))){
            value = 1.0;
        }else {
            value = 0.0;
        }
        if(type != null){
            mc.setLabel(label);
            mc.setValue(value);
            return mc;
        }
        return null;
    }
}