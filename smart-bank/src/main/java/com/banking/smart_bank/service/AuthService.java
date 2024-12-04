package com.banking.smart_bank.service;

import com.banking.smart_bank.dto.LoginResponse;
import com.banking.smart_bank.entity.User;
import com.banking.smart_bank.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

@Service
public class AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginResponse authenticate(String username, String password) {
        logger.debug("In AuthService - Attempting authentication for username: {}", username);

        // Retrieve the user by username
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get(); // Unwrap the Optional to get the User object

            // Compare the raw password with the stored encoded password
            if (passwordEncoder.matches(password, user.getPassword())) {
                logger.debug("Authentication successful for username: {}", username);
                return new LoginResponse(user.getId(), user.getUsername(), user.getRole());
            }

            logger.debug("Password mismatch for user: {}", username);
        } else {
            logger.debug("User not found: {}", username);
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        return null; // Return null if authentication fails
    }
}
