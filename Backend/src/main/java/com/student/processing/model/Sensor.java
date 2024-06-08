package com.student.processing.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class Sensor {
    private String id;
    private String name;
    private double latitude;
    private double longitude;
    private String region;
}
