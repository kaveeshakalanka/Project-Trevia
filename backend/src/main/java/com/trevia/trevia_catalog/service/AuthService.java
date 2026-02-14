package com.trevia.trevia_catalog.service;

import com.trevia.trevia_catalog.dto.LoginRequest;
import com.trevia.trevia_catalog.dto.SignupRequest;
import com.trevia.trevia_catalog.dto.UserInfoResponse;

public interface AuthService {
    UserInfoResponse authenticateUser(LoginRequest loginRequest);
    void registerUser(SignupRequest signUpRequest);
}
