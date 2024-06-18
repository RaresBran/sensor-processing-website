package com.student.processing.model.entity_redis;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@Setter
@AllArgsConstructor
@Builder
@ToString
@RedisHash("Thresholds")
public class Thresholds {
    @Id
    private String id;  // A unique ID for each threshold set
    private double humidityUpper;
    private double humidityLower;
    private double temperatureUpper;
    private double temperatureLower;
    private double coUpper;
    private double coLower;
    private double lpgUpper;
    private double lpgLower;
    private double smokeUpper;
    private double smokeLower;
}
