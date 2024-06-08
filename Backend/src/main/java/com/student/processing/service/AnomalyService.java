package com.student.processing.service;

import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.InfluxDBClientFactory;
import com.influxdb.client.QueryApi;
import com.influxdb.query.FluxRecord;
import com.influxdb.query.FluxTable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnomalyService {

    private final InfluxDBClient influxDBClient;

    public AnomalyService() {
        this.influxDBClient = InfluxDBClientFactory.create("http://localhost:8086", "RBvme3xYoZK52px6srfwTA0_jt4sdqT96HBctCBwi_7lhj46Sivpc6YQcL4JG6BJf7wxLYLo1pxPpzdYQtE0Tg==".toCharArray(), "admin");
    }

    public Map<String, Object> getAnomalyStatus(String deviceId) {
        String query = String.format("from(bucket: \"sensor-data\")\n" +
                "  |> range(start: -30d)\n" +
                "  |> filter(fn: (r) => r[\"_measurement\"] == \"event_alerts\")\n" +
                "  |> filter(fn: (r) => r[\"device\"] == \"%s\")\n" +
                "  |> filter(fn: (r) => r[\"eventType\"] == \"anomaly_start\" or r[\"eventType\"] == \"anomaly_end\")\n" +
                "  |> sort(columns: [\"_time\"], desc: false)", deviceId);

        QueryApi queryApi = influxDBClient.getQueryApi();
        List<FluxTable> tables = queryApi.query(query);

        Map<String, Object> result = new HashMap<>();
        boolean isAnomaly = false;
        String sensorType = null;
        double value = 0;
        boolean suspicious = false;

        for (FluxTable table : tables) {
            List<FluxRecord> records = table.getRecords();
            for (FluxRecord record : records) {
                String eventType = (String) record.getValueByKey("eventType");
                if ("anomaly_start".equals(eventType)) {
                    isAnomaly = true;
                    sensorType = (String) record.getValueByKey("sensorType");
                    value = (Double) record.getValueByKey("value");
                    suspicious = (Boolean) record.getValueByKey("suspicious");
                } else if ("anomaly_end".equals(eventType)) {
                    isAnomaly = false;
                }
            }
        }

        if (isAnomaly) {
            result.put("status", true);
            result.put("sensorType", sensorType);
            result.put("value", value);
            result.put("suspicious", suspicious);
        } else {
            result.put("status", false);
        }

        return result;
    }
}
