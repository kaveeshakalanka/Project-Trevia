package com.trevia.trevia_catalog.controller;

import com.trevia.trevia_catalog.dto.LoginRequest;
import com.trevia.trevia_catalog.dto.MessageResponse;
import com.trevia.trevia_catalog.dto.SignupRequest;
import com.trevia.trevia_catalog.dto.UserInfoResponse;
import com.trevia.trevia_catalog.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        UserInfoResponse userInfo = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(userInfo);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        authService.registerUser(signUpRequest);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
