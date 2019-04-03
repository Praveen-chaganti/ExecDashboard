package com.capitalone.dashboard.executive.model;

import java.util.List;
import java.util.Map;

public class LobResponse {


    private Map totalOk;
    private List metrics;

    public List getMetrics() {
        return metrics;
    }

    public void setMetrics(List metrics) {
        this.metrics = metrics;
    }

    private int totalComponents;

    private int totalRreportingComponets;


    public Map getTotalOk() {
        return totalOk;
    }

    public void setTotalOk(Map totalOk) {
        this.totalOk = totalOk;
    }

    public int getTotalComponents() {
        return totalComponents;
    }

    public void setTotalComponents(int totalComponents) {
        this.totalComponents = totalComponents;
    }

    public int getTotalRreportingComponets() {
        return totalRreportingComponets;
    }

    public void setTotalRreportingComponets(int totalRreportingComponets) {
        this.totalRreportingComponets = totalRreportingComponets;
    }

}
