package com.student.processing.model.entity_redis;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@Setter
@AllArgsConstructor
@Builder
@ToString
@RedisHash("AlertEmail")
public class AlertEmail {
    @Id
    private String id;  // A unique ID for each email
    private String email;
}

