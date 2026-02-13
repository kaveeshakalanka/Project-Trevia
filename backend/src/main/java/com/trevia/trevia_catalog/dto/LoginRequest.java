package com.trevia.trevia_catalog.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank
    private String username;
//@NotBlank - ensure the following field must be fill.
    @NotBlank
    private String password;
}
