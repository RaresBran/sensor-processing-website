package com.student.processing.service;

import com.student.processing.model.Device;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class DeviceService {

    private final List<Device> devices = new ArrayList<>();

    @PostConstruct
    public void init() {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(
                Objects.requireNonNull(getClass().getResourceAsStream("/devices.csv"))))) {
            devices.addAll(reader.lines()
                    .skip(1) // Skip header line
                    .map(this::mapToDevice)
                    .toList());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private Device mapToDevice(String line) {
        String[] fields = line.split(",");
        return new Device(fields[0], fields[1], Double.parseDouble(fields[2]), Double.parseDouble(fields[3]), fields[4]);
    }

    public List<Device> getAllDevices() {
        return devices;
    }
}
