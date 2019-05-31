package com.capitalone.dashboard.exec.repository;

import com.capitalone.dashboard.exec.model.MetricType;
import com.capitalone.dashboard.exec.model.PortfolioMetricDetail;
import org.bson.types.ObjectId;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LobMetricRepository extends CrudRepository<PortfolioMetricDetail, ObjectId>, QueryDslPredicateExecutor<PortfolioMetricDetail> {

    List<PortfolioMetricDetail> findAllByLobAndType(String lob, MetricType type);
    
}
