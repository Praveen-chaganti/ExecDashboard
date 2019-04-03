package com.capitalone.dashboard.executive.service;

import com.capitalone.dashboard.exec.model.*;
import com.capitalone.dashboard.exec.repository.PortfolioMetricRepository;
import com.capitalone.dashboard.exec.repository.PortfolioRepository;
import com.capitalone.dashboard.executive.model.LobProductResponse;
import com.capitalone.dashboard.executive.model.LobResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class LobServiceImpl implements LobService {

    private final PortfolioRepository portfolioRepository;

    private final PortfolioMetricRepository portfolioMetricRepository;
    @Autowired
    public LobServiceImpl(PortfolioRepository portfolioRepository, PortfolioMetricRepository portfolioMetricRepository) {
        this.portfolioRepository = portfolioRepository;
        this.portfolioMetricRepository = portfolioMetricRepository;
    }

    /**
     *
     * It will gives the all the products by lob and MetricType
     * End point:  /metric/lob/{lobName}/type/{metricType}/products/summary
     *
     * @param lob
     * @param type
     * @return
     */

    @Override
    public List<LobProductResponse> getLobProducts(String lob, MetricType type) {

        List<LobProductResponse> lobLevelProductMetrics = new ArrayList<>();
        List<PortfolioMetricDetail> lobMetrics = portfolioMetricRepository.findAllByLobAndType(lob,type );

        Optional.ofNullable(lobMetrics).orElseGet(Collections::emptyList)
                .stream().forEach(portfolioMetricDetail -> {portfolioMetricDetail.getProductMetricDetailList()
                .stream().forEach(productMetricDetail -> {lobLevelProductMetrics.add(LobProductResponse.getLobProductResponse(productMetricDetail,null));});});
        return lobLevelProductMetrics;

    }

    /**
     *
     *It will gives product data by LOB
     * End point: /metric/lob/{lobName}/type/{metricType}/product/CI384170/summary
     *
     * @param lob
     * @param type
     * @param name
     * @return
     */
    @Override
    public List<LobProductResponse> getProductByLobAndProductName(String lob,MetricType type, String name) {
        List<LobProductResponse> lobProductResponse = new ArrayList<>();
        Long startTime = System.currentTimeMillis();
        System.out.println(startTime);
        List<PortfolioMetricDetail> lobMetrics = portfolioMetricRepository.findAllByLobAndType(lob,type );
        Long endTime = System.currentTimeMillis();
        System.out.println(endTime-startTime);
        Optional.ofNullable(lobMetrics).orElseGet(Collections::emptyList)
                .stream().forEach(portfolioMetricDetail -> {portfolioMetricDetail.getProductMetricDetailList()
                .stream().filter(p -> p.getName().equalsIgnoreCase(name)).collect(Collectors.toList()).forEach(productMetricDetail -> {lobProductResponse.add(LobProductResponse.getLobProductResponse(productMetricDetail,null));});});


        return lobProductResponse;
    }

    /**
     *
     * It will returns all the products under LOB by particular label type
     *
     * End point: /metric/lob/{lobName}/type/{metricType}/products/summary/label/{labelType}
     *
     * @param lob
     * @param type
     * @param labelType
     * @return
     */
    @Override
    public List<LobProductResponse> getProductByLobAndProductNameAndLabelType(String lob, MetricType type, String labelType) {

        List<LobProductResponse> lobLevelProductMetrics = new ArrayList<>();
        List<PortfolioMetricDetail> lobMetrics = portfolioMetricRepository.findAllByLobAndType(lob,type );

        Optional.ofNullable(lobMetrics).orElseGet(Collections::emptyList)
                .stream().forEach(portfolioMetricDetail -> {portfolioMetricDetail.getProductMetricDetailList()
                .stream().forEach(productMetricDetail -> {lobLevelProductMetrics.add(LobProductResponse.getLobProductResponse(productMetricDetail,labelType));});});
        return lobLevelProductMetrics;
    }

    /**
     *
     * It will return the total number of auditOk in LOB and
     * total components and total reporting components.
     *
     * End point:- /metric/lob/{lobName}/type/{metricType}/summary
     * @param lob
     * @param type
     * @return
     */

    @Override
    public LobResponse getLobLevelInformation(String lob, MetricType type) {
        LobResponse lobResponse = new LobResponse();

        List<Integer> totalComponents = new ArrayList<>();
        List<Integer> totalReportingComponets = new ArrayList<>();

        List<PortfolioMetricDetail> lobMetrics = portfolioMetricRepository.findAllByLobAndType(lob,type );
        List<MetricCount> metricCounts = new ArrayList<>();

        Optional.ofNullable(lobMetrics).orElseGet(Collections::emptyList)
                .stream().forEach(portfolioMetricDetail -> {portfolioMetricDetail.getProductMetricDetailList()
                .stream().forEach(productMetricDetail -> {totalComponents.add(productMetricDetail.getTotalComponents());
                totalReportingComponets.add(productMetricDetail.getReportingComponents());});
                portfolioMetricDetail.getSummary().getCounts().stream().forEach(metricCount -> {metricCounts.add(metricCount);});
                });
        Map result = metricCounts.stream().collect(Collectors.toMap(MetricCount::getLabel,MetricCount::getValue, (oldvalue,newvalue) -> oldvalue+newvalue));
        IntSummaryStatistics totalCompo = totalComponents.stream().mapToInt((x) -> x).summaryStatistics();
        IntSummaryStatistics totalReport = totalReportingComponets.stream().mapToInt((x) -> x).summaryStatistics();
        lobResponse.setTotalOk(result);
        lobResponse.setTotalComponents((int) totalCompo.getSum());
        lobResponse.setTotalRreportingComponets((int) totalReport.getSum());

        return lobResponse;
    }


}
