package com.student.processing.service;

import com.student.processing.exception.exceptions.EmailAlreadyExistsException;
import com.student.processing.model.dto.AlertEmailDto;
import com.student.processing.model.dto.ThresholdsDto;
import com.student.processing.model.entitytimescale.EventAlert;
import com.student.processing.model.entityredis.Thresholds;
import com.student.processing.repository.EventAlertRepository;
import com.student.processing.repository.ThresholdsRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AlertService {

    public static final String THRESHOLDS_KEY = "default";
    private static final String EMAIL_LIST_KEY = "alert:emailList";
    private final ThresholdsRepository thresholdsRepository;
    private final EventAlertRepository eventAlertRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final ModelMapper modelMapper;

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
        Map<String, Object> result = new HashMap<>();
        Instant now = Instant.now();
        Instant lastThirtyDays = now.minus(30, ChronoUnit.DAYS);

        List<EventAlert> alerts = eventAlertRepository.findByDeviceAndTimeBetweenOrderByTimeDesc(deviceId, lastThirtyDays, now);
        if (alerts.isEmpty()) {
            result.put("status", false);
            return result;
        }
        EventAlert lastAlert = alerts.getFirst();

        boolean isAnomaly = false;

        if ("anomaly_start".equals(lastAlert.getEventType())) {
            isAnomaly = true;
            result.put("sensorType", lastAlert.getSensorType());
            result.put("value", lastAlert.getValue());
            result.put("suspicious", lastAlert.getSuspicious());
        }

        result.put("status", isAnomaly);

        return result;
    }

    public ThresholdsDto updateThresholds(ThresholdsDto thresholdsDto) {
        Thresholds thresholds = modelMapper.map(thresholdsDto, Thresholds.class);
        thresholds.setId(THRESHOLDS_KEY);
        thresholds = thresholdsRepository.save(thresholds);
        return modelMapper.map(thresholds, ThresholdsDto.class);
    }

    public ThresholdsDto getThresholds() {
        return modelMapper.map(
                thresholdsRepository.findById(THRESHOLDS_KEY).orElse(DEFAULT_THRESHOLDS),
                ThresholdsDto.class
        );
    }

    private SetOperations<String, String> setOps() {
        return redisTemplate.opsForSet();
    }

    public void addEmailToAlertList(AlertEmailDto alertEmailDto) {
        if (Objects.requireNonNull(setOps().members(EMAIL_LIST_KEY)).contains(alertEmailDto.getEmail())) {
            throw new EmailAlreadyExistsException();
        }
        setOps().add(EMAIL_LIST_KEY, alertEmailDto.getEmail());
    }

    public List<AlertEmailDto> getAlertEmailList() {
        Set<String> emails = setOps().members(EMAIL_LIST_KEY);
        if (emails != null && !emails.isEmpty()){
            return emails.stream()
                    .map(AlertEmailDto::new)
                    .toList();
        }
        return new ArrayList<>();
    }

    public void deleteEmailFromAlertList(AlertEmailDto alertEmailDto) {
        setOps().remove(EMAIL_LIST_KEY, alertEmailDto.getEmail());
    }
}
