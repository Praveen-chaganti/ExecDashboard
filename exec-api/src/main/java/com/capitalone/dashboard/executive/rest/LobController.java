package com.capitalone.dashboard.executive.rest;


import com.capitalone.dashboard.exec.model.MetricDetails;
import com.capitalone.dashboard.exec.model.MetricType;
import com.capitalone.dashboard.executive.model.LobProductResponse;
import com.capitalone.dashboard.executive.model.LobResponse;
import com.capitalone.dashboard.executive.service.LobService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/metric")
@CrossOrigin
public class LobController {
    private final LobService lobService;

    public LobController(LobService lobService) { this.lobService = lobService; }


    @GetMapping("/lob/{lob}/type/{type}/products/summary")
    public List<LobProductResponse> getLobProduce(@PathVariable("lob") String lob,
                                                  @PathVariable("type") MetricType metricType){

        return lobService.getLobProducts(lob,metricType);

    }
    @GetMapping("/lob/{lob}/type/{type}/product/{name}/summary")
    public LobProductResponse getProductByNameAndLob(@PathVariable("lob") String lob,
                                                           @PathVariable("name") String name,
                                                           @PathVariable("type") MetricType type){
        return lobService.getProductByLobAndProductName(lob,type,name);
    }

    @GetMapping("/lob/{lob}/type/{type}/product/{name}/details")
    public MetricDetails getProductMetricDetails(@PathVariable("lob") String lob,
                                                @PathVariable("name") String name,
                                                @PathVariable("type") MetricType type){
        return lobService.getProductMetricDetails(lob,type,name);
    }

    @GetMapping("/lob/{lob}/type/{type}/products/summary/label/{labelType}")
    public List<LobProductResponse> getLobProduce(@PathVariable("lob") String lob,
                                                  @PathVariable("type") MetricType metricType,
                                                  @PathVariable("labelType") String labelType) {

        return lobService.getProductByLobAndProductNameAndLabelType(lob, metricType, labelType);
    }

    @GetMapping("/lob/{lob}/type/{type}/summary")
    public LobResponse getLoblevelData(@PathVariable("lob") String lob,
                                       @PathVariable("type") MetricType metricType){

        return lobService.getLobLevelInformation(lob,metricType);

    }




}
