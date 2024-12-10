package com.banking.smart_bank.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import com.banking.smart_bank.entity.User;
import com.banking.smart_bank.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    public void registerUser(String username, String rawPassword) {
        // Encrypt the password
        String encodedPassword = passwordEncoder.encode(rawPassword);
        User user = new User();
        user.setUsername(username);
        // Store hashed password
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }
}
