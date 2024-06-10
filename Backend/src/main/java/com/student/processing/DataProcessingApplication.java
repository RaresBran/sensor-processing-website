package com.student.processing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

@SpringBootApplication
@EnableRedisRepositories
public class DataProcessingApplication {

	public static void main(String[] args) {
		SpringApplication.run(DataProcessingApplication.class, args);
	}
}
