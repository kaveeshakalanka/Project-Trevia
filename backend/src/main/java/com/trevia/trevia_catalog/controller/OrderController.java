package com.trevia.trevia_catalog.controller;

import com.trevia.trevia_catalog.dto.OrderRequest;
import com.trevia.trevia_catalog.entity.Order;
import com.trevia.trevia_catalog.entity.User;
import com.trevia.trevia_catalog.repository.UserRepository;
import com.trevia.trevia_catalog.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174",
        "http://localhost:5175" }, allowCredentials = "true")
@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Order> placeOrder(@Valid @RequestBody OrderRequest orderRequest,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(orderService.createOrder(user, orderRequest));
    }

    @GetMapping
    public ResponseEntity<List<Order>> getMyOrders(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(orderService.getUserOrders(user));
    }

    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }

    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
