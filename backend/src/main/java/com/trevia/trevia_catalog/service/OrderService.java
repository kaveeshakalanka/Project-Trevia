package com.trevia.trevia_catalog.service;

import com.trevia.trevia_catalog.dto.OrderRequest;
import com.trevia.trevia_catalog.entity.Order;
import com.trevia.trevia_catalog.entity.User;
import java.util.List;

public interface OrderService {
    Order createOrder(User user, OrderRequest orderRequest);

    List<Order> getUserOrders(User user);

    // Admin methods
    List<Order> getAllOrders();

    Order updateOrderStatus(Long orderId, String status);

    void deleteOrder(Long orderId);
}
