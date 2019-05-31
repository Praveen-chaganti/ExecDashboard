package com.capitalone.dashboard.executive.service;

import com.capitalone.dashboard.exec.model.*;
import com.capitalone.dashboard.exec.repository.LobMetricRepository;
import com.capitalone.dashboard.exec.repository.PortfolioMetricRepository;
import com.capitalone.dashboard.executive.model.LobProductResponse;
import com.capitalone.dashboard.executive.model.LobResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class LobServiceImpl implements LobService {

    private final PortfolioMetricRepository portfolioMetricRepository;

    private final LobMetricRepository lobMetricRepository;


    @Autowired
    public LobServiceImpl(PortfolioMetricRepository portfolioMetricRepository, LobMetricRepository lobMetricRepository) {
        this.portfolioMetricRepository = portfolioMetricRepository;
        this.lobMetricRepository = lobMetricRepository;
    }

    /**
     *
     * It will gives the all the products by lob and MetricType
     * End point:  /metric/lob/{lobName}/type/{metricType}/products/summary
     *
     * @param lob  Line of Business
     * @param type Audit data available in MetricType.AUDITRESULT
     * @return
     */

    @Override
    public List<LobProductResponse> getLobProducts(String lob, MetricType type) {

        List<LobProductResponse> lobLevelProductMetrics = new ArrayList<>();
        List<PortfolioMetricDetail> lobMetrics = portfolioMetricRepository.findAllByLobAndType(lob,type );
        //List<PortfolioMetricDetail> lobMetrics = lobMetricRepository.findAllByLobAndType(lob,type );

        Optional.ofNullable(lobMetrics).orElseGet(Collections::emptyList)
                .stream().forEach(portfolioMetricDetail -> {portfolioMetricDetail.getProductMetricDetailList()
                .stream().forEach(productMetricDetail -> {lobLevelProductMetrics.add(LobProductResponse.getLobProductResponse(productMetricDetail,null));});});
        return lobLevelProductMetrics;

    }

    /**
     *
     *It will gives product data by LOB
     * End point: /metric/lob/{lobName}/type/{metricType}/product/{productName}/summary
     *
     * @param lob Line of Business
     * @param type Audit data available in MetricType.AUDITRESULT
     * @param name productName
     * @return
     */
    @Override
    public LobProductResponse getProductByLobAndProductName(String lob,MetricType type, String name) {
        List<LobProductResponse> lobProductResponse = new ArrayList<>();
        //List<PortfolioMetricDetail> lobMetrics = lobMetricRepository.findAllByLobAndType(lob,type );
        List<PortfolioMetricDetail> lobMetrics = portfolioMetricRepository.findAllByLobAndType(lob,type );
        Optional.ofNullable(lobMetrics).orElseGet(Collections::emptyList)
                .stream().forEach(portfolioMetricDetail -> {portfolioMetricDetail.getProductMetricDetailList()
                .stream().filter(p -> p.getName().equalsIgnoreCase(name)).collect(Collectors.toList()).forEach(productMetricDetail -> {lobProductResponse.add(LobProductResponse.getLobProductResponse(productMetricDetail,null));});});


        return lobProductResponse.get(0);
    }

    /**
     *
     * It will returns all the products under LOB by particular label type
     *
     * End point: /metric/lob/{lobName}/type/{metricType}/products/summary/label/{labelType}
     *
     * @param lob Line of Business
     * @param type Audit data available in MetricType.AUDITRESULT
     * @param labelType Summary labelType
     * @return it will return all the the products Summary by type.
     */
    @Override
    public List<LobProductResponse> getProductByLobAndProductNameAndLabelType(String lob, MetricType type, String labelType) {

        List<LobProductResponse> lobLevelProductMetrics = new ArrayList<>();
        //List<PortfolioMetricDetail> lobMetrics = lobMetricRepository.findAllByLobAndType(lob,type );
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
     * @param lob Line Of Bussiness
     * @param type Audit data available in MetricType.AUDITRESULT
     * @return
     */

    @Override
    public LobResponse getLobLevelInformation(String lob, MetricType type) {
        LobResponse lobResponse = new LobResponse();

        List<Integer> totalComponents = new ArrayList<>();
        List<Integer> totalReportingComponents = new ArrayList<>();
        //List<PortfolioMetricDetail> lobMetrics = lobMetricRepository.findAllByLobAndType(lob,type );
        List<PortfolioMetricDetail> lobMetrics = portfolioMetricRepository.findAllByLobAndType(lob,type );
        List<MetricCount> metricCounts = new ArrayList<>();

        Optional.ofNullable(lobMetrics).orElseGet(Collections::emptyList)
                .stream().forEach(portfolioMetricDetail -> {portfolioMetricDetail.getProductMetricDetailList()
                .stream().forEach(productMetricDetail -> {totalComponents.add(productMetricDetail.getTotalComponents());
                totalReportingComponents.add(productMetricDetail.getReportingComponents());});
                portfolioMetricDetail.getSummary().getCounts().stream().forEach(metricCount -> {metricCounts.add(metricCount);});
                });
        Map result = metricCounts.stream().collect(Collectors.toMap(MetricCount::getLabelKey,MetricCount::getValue, (oldValue,newValue) -> oldValue+newValue));
        IntSummaryStatistics totalCompo = totalComponents.stream().mapToInt((x) -> x).summaryStatistics();
        IntSummaryStatistics totalReport = totalReportingComponents.stream().mapToInt((x) -> x).summaryStatistics();
        lobResponse.setTotalOk(result);
        lobResponse.setTotalComponents((int) totalCompo.getSum());
        lobResponse.setTotalRreportingComponets((int) totalReport.getSum());

        return lobResponse;
    }

    @Override
    public MetricDetails getProductMetricDetails(String lob, MetricType type, String name) {
        List<PortfolioMetricDetail> lobMetrics = portfolioMetricRepository.findAllByLobAndType(lob,type );

        // List<PortfolioMetricDetail> lobMetrics = lobMetricRepository.findAllByLobAndType(lob,type );
        List<ProductMetricDetail> productMetricDetailList = new ArrayList<>();


        Optional.ofNullable(lobMetrics).orElseGet(Collections::emptyList)
                .stream().forEach(portfolioMetricDetail -> {portfolioMetricDetail.getProductMetricDetailList()
                .stream().forEach(productMetricDetail -> {productMetricDetailList.add(productMetricDetail);});});

        return productMetricDetailList.stream().filter(productMetricDetail -> productMetricDetail.getName().equalsIgnoreCase(name)).findFirst().orElseGet(null);

    }


}
