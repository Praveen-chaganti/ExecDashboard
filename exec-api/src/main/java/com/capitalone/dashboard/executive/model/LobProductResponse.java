package com.capitalone.dashboard.executive.model;

import com.capitalone.dashboard.exec.model.MetricCount;
import com.capitalone.dashboard.exec.model.ProductMetricDetail;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class LobProductResponse {
    private String name;

    private String lob;

    private String itemType;

    private String type;

    private List<LobComponentResponse> componentMetricDetailsList;


    private List metrics;

    private Integer totalComponents;

    private Integer totalReportingComponents;

    public Integer getTotalComponents() {
        return totalComponents;
    }

    public void setTotalComponents(Integer totalComponents) {
        this.totalComponents = totalComponents;
    }

    public Integer getTotalReportingComponents() {
        return totalReportingComponents;
    }

    public void setTotalReportingComponents(Integer totalReportingComponents) {
        this.totalReportingComponents = totalReportingComponents;
    }

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

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


    public List<LobComponentResponse> getComponentMetricDetailsList() {
        return componentMetricDetailsList;
    }

    public void setComponentMetricDetailsList(List<LobComponentResponse> componentMetricDetailsList) {
        this.componentMetricDetailsList = componentMetricDetailsList;
    }

    public List getMetrics() {
        return metrics;
    }

    public void setMetrics(List metrics) {
        this.metrics = metrics;
    }



    public static LobProductResponse getLobProductResponse(ProductMetricDetail product, String labelType){
        if(product == null){
            return null;
        }
        LobProductResponse lobProductResponse = new LobProductResponse();
        lobProductResponse.setName(product.getName());
        lobProductResponse.setLob(product.getLob());
        lobProductResponse.setItemType(product.getLevel().toString());
        lobProductResponse.setType(product.getType().toString());
        lobProductResponse.setTotalComponents(product.getTotalComponents());
        lobProductResponse.setTotalReportingComponents(product.getReportingComponents());
        //List<ComponentMetricDetail> componentMetricDetailList = product.getComponentMetricDetailList();
        //List<LobComponentResponse> componentResponses = new ArrayList<>();
        //componentMetricDetailList.forEach(componentMetricDetail -> {componentResponses.add(LobComponentResponse.getLobComponetResponse(componentMetricDetail));});
        //lobProductResponse.setComponentMetricDetailsList(componentResponses);

        List<MetricCount> metricCounts = new ArrayList<>();
        if (labelType == null) {
            metricCounts = product.getSummary().getCounts();
        }else {
            metricCounts = product.getSummary().getCounts().stream().filter(metricCount -> labelType.equalsIgnoreCase(metricCount.getLabel().get("type"))).collect(Collectors.toList());
        }

        Map count = new HashMap<>();
        count.put("counts", metricCounts);
        count.put("lastScanned", product.getSummary().getLastScanned());
        count.put("lastUpdated", product.getSummary().getLastUpdated());
        count.put("trendSlope", product.getSummary().getTrendSlope());
        count.put("name",product.getSummary().getName());
        List counts = new ArrayList<>();
        counts.add(count);

        lobProductResponse.setMetrics(counts);

        return lobProductResponse;

    }

}
