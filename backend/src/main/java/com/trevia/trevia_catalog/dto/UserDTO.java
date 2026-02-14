package com.trevia.trevia_catalog.dto;

import java.time.LocalDateTime;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String username;
    private String fullName;
    private String phone;
    private String email;
    private boolean enabled;
    private Set<String> roles;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
