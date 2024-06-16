package com.student.processing.repository;

import com.student.processing.model.entity.EventAlert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;

public interface EventAlertRepository extends JpaRepository<EventAlert, Long> {

    List<EventAlert> findByDeviceAndTimeBetweenOrderByTimeDesc(String device, Instant start, Instant end);
}

