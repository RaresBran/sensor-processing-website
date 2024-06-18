package com.student.processing.service;

import com.student.processing.model.entity_timescale.EventAlert;
import com.student.processing.model.entity_redis.Thresholds;
import com.student.processing.repository.EventAlertRepository;
import com.student.processing.repository.ThresholdsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AlertService {

    private final ThresholdsRepository thresholdsRepository;
    private final EventAlertRepository eventAlertRepository;

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

    public Map<String, Object> getAnomalyStatus(String deviceId) {
        Instant now = Instant.now();
        Instant thirtyDaysAgo = now.minus(30, ChronoUnit.MINUTES);

        List<EventAlert> alerts = eventAlertRepository.findByDeviceAndTimeBetweenOrderByTimeDesc(deviceId, thirtyDaysAgo, now);

        Map<String, Object> result = new HashMap<>();
        boolean isAnomaly = false;
        String sensorType = "";
        Double value = null;
        Boolean suspicious = false;

        for (EventAlert alert : alerts) {
            if ("anomaly_start".equals(alert.getEventType())) {
                isAnomaly = true;
                sensorType = alert.getSensorType();
                value = alert.getValue();
                suspicious = alert.getSuspicious();
                break; // Assuming you only want the latest "anomaly_start" event
            }
        }

        result.put("status", isAnomaly);
        if (isAnomaly) {
            result.put("sensorType", sensorType);
            result.put("value", value);
            result.put("suspicious", suspicious);
        }

        return result;
    }

    public Thresholds updateThresholds(Thresholds thresholds) {
        thresholds.setId("default"); // Assuming a single set of thresholds, use "default" as the ID
        return thresholdsRepository.save(thresholds);

    }

    public Thresholds getThresholds() {
        return thresholdsRepository.findById("default").orElse(DEFAULT_THRESHOLDS);
    }
}
