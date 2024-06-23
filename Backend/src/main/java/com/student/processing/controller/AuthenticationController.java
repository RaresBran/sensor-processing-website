package com.student.processing.controller;

import com.student.processing.model.dto.AuthenticationRequest;
import com.student.processing.model.dto.AuthenticationResponse;
import com.student.processing.model.dto.RegisterRequest;
import com.student.processing.model.dto.UserDto;
import com.student.processing.security.AuthenticationService;
import com.student.processing.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/app/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody @Valid AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody @Valid RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @GetMapping()
    public UserDto getCurrentUser(Authentication authentication) {
        return userService.getCurrentUser(authentication);
    }
}

