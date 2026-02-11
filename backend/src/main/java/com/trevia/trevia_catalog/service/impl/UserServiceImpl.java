package com.trevia.trevia_catalog.service.impl;

import com.trevia.trevia_catalog.entity.User;
import com.trevia.trevia_catalog.repository.UserRepository;
import com.trevia.trevia_catalog.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User getUserProfile(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public java.util.List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User updateUserProfile(String username, User userUpdates) {
        User user = getUserProfile(username);
        
        if (userUpdates.getEmail() != null) {
            user.setEmail(userUpdates.getEmail());
        }
        
        if (userUpdates.getPassword() != null && !userUpdates.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userUpdates.getPassword()));
        }
        
        // Other fields like Address could be updated here
        
        return userRepository.save(user);
    }
}
