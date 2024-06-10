package com.student.processing.service;

import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.InfluxDBClientFactory;
import com.influxdb.client.QueryApi;
import com.influxdb.query.FluxRecord;
import com.influxdb.query.FluxTable;
import com.student.processing.model.entity.Thresholds;
import com.student.processing.repository.ThresholdsRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AlertService {

    private final InfluxDBClient influxDBClient;
    private final ThresholdsRepository thresholdsRepository;

    private static final Thresholds DEFAULT_THRESHOLDS = Thresholds.builder()
            .humidityUpper(100)
            .humidityLower(0)
            .smokeUpper(5)
            .smokeLower(0)
            .temperatureUpper(50)
            .temperatureLower(-40)
            .coUpper(10)
            .coLower(0)
            .lpgUpper(1000)
            .lpgLower(0)
            .build();

    @Autowired
    public AlertService(
            @Value("${app.influxdb.token}") final String token,
            @Value("${app.influxdb.url}") final String url,
            ThresholdsRepository thresholdsRepository
    ) {
        this.influxDBClient = InfluxDBClientFactory.create(url, token.toCharArray(), "admin");
        this.thresholdsRepository = thresholdsRepository;
    }

    public Map<String, Object> getAnomalyStatus(String deviceId) {
        List<FluxTable> tables = getFluxTables(deviceId);

        Map<String, Object> result = new HashMap<>();
        boolean isAnomaly = false;
        String sensorType = "";
        Double value = null;
        Boolean suspicious = false;

        for (FluxTable table : tables) {
            List<FluxRecord> records = table.getRecords();
            FluxRecord mostRecentRecord = records.getFirst();
            String eventType = (String) mostRecentRecord.getValueByKey("eventType");
            if ("anomaly_start".equals(eventType)) {
                isAnomaly = true;
                sensorType = (String) mostRecentRecord.getValueByKey("sensorType");
                value = (Double) mostRecentRecord.getValueByKey("value");
                suspicious = (Boolean) mostRecentRecord.getValueByKey("suspicious");
            } else if ("anomaly_end".equals(eventType)) {
                isAnomaly = false;
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

    private @NotNull List<FluxTable> getFluxTables(String deviceId) {
        String query = String.format("""
                from(bucket: "sensor-data")
                  |> range(start: -30d)
                  |> filter(fn: (r) => r["_measurement"] == "event_alerts")
                  |> filter(fn: (r) => r["device"] == "%s")
                  |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
                  |> sort(columns: ["_time"], desc: true)
                """, deviceId);

        QueryApi queryApi = influxDBClient.getQueryApi();
        return queryApi.query(query);
    }

    public Thresholds updateThresholds(Thresholds thresholds) {
        thresholds.setId("default"); // Assuming a single set of thresholds, use "default" as the ID
        return thresholdsRepository.save(thresholds);

    }

    public Thresholds getThresholds() {
        return thresholdsRepository.findById("default").orElse(DEFAULT_THRESHOLDS);
    }
}
