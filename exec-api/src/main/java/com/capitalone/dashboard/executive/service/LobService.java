package com.capitalone.dashboard.executive.service;


import com.capitalone.dashboard.exec.model.MetricType;
import com.capitalone.dashboard.executive.model.LobProductResponse;
import com.capitalone.dashboard.executive.model.LobResponse;


import java.util.List;

public interface LobService {

    List<LobProductResponse> getLobProducts(String lob, MetricType type);

    List<LobProductResponse> getProductByLobAndProductName(String lob,MetricType type, String name);

    List<LobProductResponse> getProductByLobAndProductNameAndLabelType(String lob, MetricType type, String labelType);

    LobResponse getLobLevelInformation(String lob, MetricType type);




}
