package com.capitalone.dashboard.exec.repository;

import com.capitalone.dashboard.exec.model.MetricType;
import com.capitalone.dashboard.exec.model.PortfolioMetricDetail;
import com.capitalone.dashboard.exec.model.ProductMetricDetail;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PortfolioMetricRepository
        extends CrudRepository<PortfolioMetricDetail, ObjectId>, QueryDslPredicateExecutor<PortfolioMetricDetail> {

    PortfolioMetricDetail findByNameAndLobAndType (String name, String lob, MetricType type);
    List<PortfolioMetricDetail> findByNameAndLob (String name, String lob);

    List<PortfolioMetricDetail> findAllByLobAndType(String lob, MetricType type);

    @Query(value="{ 'productMetricDetailList.name': ?0}")
    List<PortfolioMetricDetail> findByLobAndType(String lob, MetricType type);


    @Query(value="{ 'name' : ?0, 'lob': ?1, 'type': ?2, 'productMetricDetailList.name': ?3}")
    PortfolioMetricDetail findByNameAndLobAndTypeAndProductName(String name, String lob, MetricType type, String productName);

    @Query(value="{ 'name' : ?0, 'lob': ?1, 'type': ?2, 'productMetricDetailList.name': ?3}, 'productMetricDetailList.componentMetricDetailList.name' ?4 ")
    PortfolioMetricDetail findByNameAndLobAndTypeAndProductNameAndComponentName(String name, String lob, MetricType type, String productName, String componentName);

    void deleteAllByType(MetricType type);
}
