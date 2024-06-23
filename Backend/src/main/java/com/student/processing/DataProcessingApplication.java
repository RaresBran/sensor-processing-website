package com.student.processing;

import com.student.processing.model.Role;
import com.student.processing.model.entitypostgres.User;
import com.student.processing.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

@SpringBootApplication
@EnableRedisRepositories
@EnableJpaRepositories(basePackages = "com.student.processing.repository")
@RequiredArgsConstructor
public class DataProcessingApplication implements CommandLineRunner {
	private final UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(DataProcessingApplication.class, args);
	}

	@Override
	public void run(String... args) {
		if (userRepository.findByEmail("admin1@admin.com").isEmpty()) {
			userRepository.save(User.builder()
					.role(Role.ADMIN)
					.email("admin1@admin.com")
					.password("$2a$12$ByNJBEwvuQpoCHl15RQtzujdhbela1PLftLgWigUcFEq6Sd1LT2L6")
					.build());
		}
	}
}
