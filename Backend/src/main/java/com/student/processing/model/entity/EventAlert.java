package com.student.processing.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "event_alerts")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventAlert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "time")
    private Instant time;

    @Column(name = "device")
    private String device;

    @Column(name = "event_type")
    private String eventType;

    @Column(name = "sensor_type")
    private String sensorType;

    @Column(name = "value")
    private Double value;

    @Column(name = "suspicious")
    private Boolean suspicious;
}

