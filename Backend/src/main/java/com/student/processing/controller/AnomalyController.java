package com.student.processing.controller;

import com.student.processing.service.AnomalyService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AnomalyController {

    private final AnomalyService anomalyService;

    public AnomalyController(AnomalyService anomalyService) {
        this.anomalyService = anomalyService;
    }

    @GetMapping("/anomaly-status/{deviceId}")
    public Map<String, Object> getAnomalyStatus(@PathVariable String deviceId) {
        return anomalyService.getAnomalyStatus(deviceId);
    }
}
