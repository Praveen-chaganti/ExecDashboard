package com.capitalone.dashboard.executive.model;

import com.capitalone.dashboard.exec.model.ComponentMetricDetail;
import com.capitalone.dashboard.exec.model.MetricSummary;

import java.util.ArrayList;
import java.util.List;

public class LobComponentResponse {
    private String name;

    private String commonName;

    private String lob;

    private String level;

    private String type;

    private List<MetricSummary> metrics;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCommonName() {
        return commonName;
    }

    public void setCommonName(String commonName) {
        this.commonName = commonName;
    }

    public String getLob() {
        return lob;
    }

    public void setLob(String lob) {
        this.lob = lob;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<MetricSummary> getMetrics() {
        return metrics;
    }

    public void setMetrics(List<MetricSummary> summary) {
        this.metrics = summary;
    }

    public static LobComponentResponse getLobComponetResponse(ComponentMetricDetail componentMetricDetail){
        if(componentMetricDetail == null){
            return null;
        }
        List<MetricSummary> componentSummary = new ArrayList<>();
        componentSummary.add(componentMetricDetail.getSummary());
        LobComponentResponse lobComponentResponse = new LobComponentResponse();
        lobComponentResponse.setName(componentMetricDetail.getName());
        lobComponentResponse.setCommonName(componentMetricDetail.getItem().getCommonName());
        lobComponentResponse.setLob(componentMetricDetail.getLob());
        lobComponentResponse.setLevel(componentMetricDetail.getLevel().toString());
        lobComponentResponse.setType(componentMetricDetail.getType().toString());
        lobComponentResponse.setMetrics(componentSummary);
        return lobComponentResponse;


    }


}
