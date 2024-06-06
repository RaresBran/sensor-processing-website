package com.student.processing.controller;

import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/topology")
public class TopologyController {

    @PostMapping("/startTopology")
    public String startTopology(@RequestParam String kafkaBrokerUrl, @RequestParam String topologyName) throws InterruptedException {
        try {
            // Copy the JAR file to the Nimbus container
            ProcessBuilder copyProcess = new ProcessBuilder("docker", "cp", "target/sensor-topology-1.0-SNAPSHOT-jar-with-dependencies.jar", "nimbus:/topology.jar");
            Process copy = copyProcess.start();
            copy.waitFor();

            // Submit the topology
            ProcessBuilder submitProcess = new ProcessBuilder("docker", "exec", "-it", "nimbus", "storm", "jar", "/topology.jar", "org.project.SensorTopology", kafkaBrokerUrl, topologyName);
            Process submit = submitProcess.start();
            submit.waitFor();

            return "Topology started with name: " + topologyName;
        } catch (IOException | InterruptedException e) {
            throw new InterruptedException("Failed to start topology: " + e.getMessage());
        }
    }
}

