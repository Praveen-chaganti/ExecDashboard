package com.capitalone.dashboard.exec.collector;

import com.capitalone.dashboard.exec.config.DataFrameLoader;
import com.capitalone.dashboard.exec.util.HygieiaExecutiveUtil;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.catalyst.expressions.GenericRowWithSchema;

import java.util.*;


public class DefaultAuditDataCollector {

    private SparkSession sparkSession;
    private String collectionName;
    private String query;
    private JavaSparkContext javaSparkContext;

    DefaultAuditDataCollector(String collectionName, String query, SparkSession sparkSession, JavaSparkContext javaSparkContext) {
        this.collectionName = collectionName;
        this.query = query;
        this.sparkSession = sparkSession;
        this.javaSparkContext = javaSparkContext;
    }

    public Map<String, List<Row>> collectAll() {
        Map<String, List<Row>> rowMap = new HashMap<>();
        DataFrameLoader.loadDataFrame(collectionName, javaSparkContext);
        Dataset<Row> dataRows = sparkSession.sql(query);
        List<Row> rowList = dataRows.collectAsList();
        rowList.forEach(row -> {
            Date timeWindowDt = row.getAs("timeWindow");
            long daysAgo = HygieiaExecutiveUtil.getDaysAgo(timeWindowDt);
            if ((daysAgo < 90)) {
                String dashboardId = (String) ((GenericRowWithSchema) row.getAs("dashboardId")).get(0);
                List<Row> existingRowList = rowMap.get(dashboardId);
                if (existingRowList == null) {
                    List<Row> newRow = new ArrayList<>();
                    newRow.add(row);
                    rowMap.put(dashboardId, newRow);
                } else {
                    existingRowList.add(row);
                    rowMap.put(dashboardId, existingRowList);
                }
            }
        });
        return rowMap;
    }
}
