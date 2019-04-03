package com.capitalone.dashboard.executive.model;

import com.capitalone.dashboard.exec.model.ComponentMetricDetail;
import com.capitalone.dashboard.exec.model.MetricSummary;

public class LobComponentResponse {
    private String name;

    private String lob;

    private String level;

    private String type;

    private MetricSummary summary;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public MetricSummary getSummary() {
        return summary;
    }

    public void setSummary(MetricSummary summary) {
        this.summary = summary;
    }

    public static LobComponentResponse getLobComponetResponse(ComponentMetricDetail componentMetricDetail){
        if(componentMetricDetail == null){
            return null;
        }
        LobComponentResponse lobComponentResponse = new LobComponentResponse();
        lobComponentResponse.setName(componentMetricDetail.getName());
        lobComponentResponse.setLob(componentMetricDetail.getLob());
        lobComponentResponse.setLevel(componentMetricDetail.getLevel().toString());
        lobComponentResponse.setType(componentMetricDetail.getType().toString());
        lobComponentResponse.setSummary(componentMetricDetail.getSummary());
        return lobComponentResponse;


    }


}
