package com.student.processing.controller;

import com.student.processing.model.entity.Thresholds;
import com.student.processing.service.AlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AlertController {

    private final AlertService alertService;

    @GetMapping("/anomaly-status/{deviceId}")
    public Map<String, Object> getAnomalyStatus(@PathVariable String deviceId) {
        return alertService.getAnomalyStatus(deviceId);
    }

    @PostMapping("/thresholds")
    public Thresholds updateThresholds(@RequestBody Thresholds thresholds) {
        return alertService.updateThresholds(thresholds);
    }

    @GetMapping("/thresholds")
    public Thresholds getThresholds() {
        return alertService.getThresholds();
    }
}
