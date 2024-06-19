package com.student.processing.model.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ThresholdsDto {
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
