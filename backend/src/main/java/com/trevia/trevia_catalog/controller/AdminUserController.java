package com.trevia.trevia_catalog.controller;

import com.trevia.trevia_catalog.dto.CreateSupplierRequest;
import com.trevia.trevia_catalog.dto.MessageResponse;
import com.trevia.trevia_catalog.entity.Role;
import com.trevia.trevia_catalog.entity.User;
import com.trevia.trevia_catalog.repository.RoleRepository;
import com.trevia.trevia_catalog.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    /* Admin endpoint to create a new supplier*/
     
    @PostMapping("/supplier")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createSupplier(@Valid @RequestBody CreateSupplierRequest request) {
        // Check username already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        // Check email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Get roles
        Role supplierRole = roleRepository.findByName(Role.ERole.ROLE_SUPPLIER)
                .orElseThrow(() -> new RuntimeException("Error: Supplier role not found."));
        Role userRole = roleRepository.findByName(Role.ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: User role not found."));

        Set<Role> roles = new HashSet<>();
        roles.add(supplierRole);
        roles.add(userRole);

        // Create new supplier user
        User supplier = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(roles)
                .build();

        userRepository.save(supplier);

        return ResponseEntity.ok(new MessageResponse("Supplier user created successfully!"));
    }
}
