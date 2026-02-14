package com.trevia.trevia_catalog.service;

import com.trevia.trevia_catalog.entity.User;

public interface UserService {
    User getUserProfile(String username);
    User updateUserProfile(String username, User userUpdates);
    
    // Admin methods
    java.util.List<User> getAllUsers();
    void deleteUser(Long id);
}
