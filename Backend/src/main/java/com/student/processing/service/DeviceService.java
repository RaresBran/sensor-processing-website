package com.student.processing.service;

import com.student.processing.model.Device;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DeviceService {

    private final List<Device> devices = new ArrayList<>();

    public DeviceService() {
        // Add some dummy data
        devices.add(new Device("b8:27:eb:bf:9d:51", "Device 1", 44.409344, 26.107534, "Tineretului"));
        devices.add(new Device("00:0f:00:70:91:0a", "Device 2", 44.427413, 26.088964, "Parliament"));
        devices.add(new Device("1c:bf:ce:15:ec:4d", "Device 3", 44.435531, 26.102524, "Universitate"));
    }

    public List<Device> getAllDevices() {
        return devices;
    }
}
