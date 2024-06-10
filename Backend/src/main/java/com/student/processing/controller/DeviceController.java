package com.student.processing.controller;

import com.student.processing.model.Sensor;
import com.student.processing.service.DeviceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sensors")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class DeviceController {

    private final DeviceService deviceService;

    @GetMapping
    public List<Sensor> getAllDevices() {
        return deviceService.getAllDevices();
    }
}

