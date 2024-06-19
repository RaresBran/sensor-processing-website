package com.student.processing.model.dto;

import jakarta.validation.constraints.Email;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlertEmailDto {
    @Email
    private String email;
}
