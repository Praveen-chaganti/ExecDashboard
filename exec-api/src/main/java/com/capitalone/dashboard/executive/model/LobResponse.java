package com.capitalone.dashboard.executive.model;


import java.util.Map;

public class LobResponse {


    private Map totalOk;

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
