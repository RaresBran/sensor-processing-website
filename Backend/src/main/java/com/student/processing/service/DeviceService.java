package com.student.processing.service;

import com.student.processing.model.Sensor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DeviceService {

    private final List<Sensor> sensors = new ArrayList<>();

    public DeviceService() {
        // Add some dummy data
        sensors.add(new Sensor("b8:27:eb:bf:9d:51", "Sensor 1", 44.409344, 26.107534, "Tineretului"));
        sensors.add(new Sensor("00:0f:00:70:91:0a", "Sensor 2", 44.427413, 26.088964, "Parliament"));
        sensors.add(new Sensor("1c:bf:ce:15:ec:4d", "Sensor 3", 44.435531, 26.102524, "Universitate"));
    }

    public List<Sensor> getAllDevices() {
        return sensors;
    }
}
