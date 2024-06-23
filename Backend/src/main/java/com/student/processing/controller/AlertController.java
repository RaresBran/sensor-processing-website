package com.student.processing.controller;

import com.student.processing.model.dto.AlertEmailDto;
import com.student.processing.model.dto.ThresholdsDto;
import com.student.processing.service.AlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
@RequestMapping("/app/alert")
public class AlertController {

    private final AlertService alertService;

    @GetMapping("/anomaly-status/{deviceId}")
    public Map<String, Object> getAnomalyStatus(@PathVariable String deviceId) {
        return alertService.getAnomalyStatus(deviceId);
    }

    @PostMapping("/thresholds")
    public ThresholdsDto updateThresholds(@RequestBody ThresholdsDto thresholds) {
        return alertService.updateThresholds(thresholds);
    }

    @GetMapping("/thresholds")
    public ThresholdsDto getThresholds() {
        return alertService.getThresholds();
    }

    @PostMapping("/emails")
    public AlertEmailDto addEmailToAlertList(@RequestBody @Validated AlertEmailDto alertEmailDto) {
        alertService.addEmailToAlertList(alertEmailDto);
        return alertEmailDto;
    }

    @GetMapping("/emails")
    public List<AlertEmailDto> getAlertEmailList() {
        return alertService.getAlertEmailList();
    }

    @DeleteMapping("/emails")
    public AlertEmailDto deleteEmailFromAlertList(@RequestBody @Validated AlertEmailDto alertEmailDto) {
        alertService.deleteEmailFromAlertList(alertEmailDto);
        return alertEmailDto;
    }
}

