package com.capitalone.dashboard.exec.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


public class MetricTimeSeriesElement {
    private int daysAgo;
    private long timestamp;
    private List<MetricCount> counts;

    public int getDaysAgo() { return daysAgo; }
    public void setDaysAgo(int daysAgo) { this.daysAgo = daysAgo; }

    public List<MetricCount> getCounts() { return counts; }
    public void setCounts(List<MetricCount> counts) { this.counts = counts; }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public void addCount(MetricCount count,MetricDetails itemMetricDetails) {
        if (counts == null) {
            counts = new ArrayList<>();
        }
        MetricCount oCount = getMetricCountByLabel(count.getLabel().get("type"));
        MetricCount copyCount = getCopyCount(count,itemMetricDetails);
        if (oCount != null) {
            counts.remove(oCount);
            copyCount.addValue(oCount.getValue());
        }
        counts.add(copyCount);
    }
    private MetricCount getCopyCount(MetricCount count, MetricDetails metricDetails){
        MetricCount copyCount;
        if(metricDetails.getType().equals(MetricType.AUDITRESULT)){
            MetricCount copyCount1 = new MetricCount();
            HashMap<String,String> label = new HashMap<>();
            label.put("type", count.getLabel().get("type"));
            double val = count.getValue();
            copyCount1.setLabel(label);
            copyCount1.setValue(val);
            copyCount = copyCount1.copy();
        }else {
            copyCount = count.copy();
        }
        return copyCount;
    }

    public void averageCount(MetricCount count,int size) {
        if (counts == null) {
            counts = new ArrayList<>();
        }
        MetricCount oCount = getMetricCountByLabel(count.getLabel().get("type"));
        MetricCount copyCount = count.copy();
        if (oCount != null) {
            counts.remove(oCount);
            copyCount.addAverageValue(oCount.getValue(),size);
        }
        counts.add(copyCount);
    }

    public MetricCount getMetricCountByLabel (String label) {
        return counts.stream().filter(c -> c.getLabel().get("type").equals(label)).findFirst().orElse(null);
    }

    public void addCount(MetricCount metricCount) {
        if (counts == null) {
            counts = new ArrayList<>();
        }
        MetricCount oCount = getMetricCountByLabel(metricCount.getLabel().get("type"));
        MetricCount copyCount = metricCount.copy();
        if (oCount != null) {
            counts.remove(oCount);
            copyCount.addValue(oCount.getValue());
        }
        counts.add(copyCount);
    }
}
