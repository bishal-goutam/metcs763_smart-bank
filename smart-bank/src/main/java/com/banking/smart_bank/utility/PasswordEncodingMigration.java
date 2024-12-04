package com.banking.smart_bank.utility;

// Password Encoding Migration Script

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.banking.smart_bank.entity.User;
import com.banking.smart_bank.repository.UserRepository;

import java.util.List;

@Component
public class PasswordEncodingMigration implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Starting password migration...");

        // Fetch all users from the database
        List<User> users = userRepository.findAll();

        for (User user : users) {
            // Check if the password is already encoded
            if (!isPasswordEncoded(user.getPassword())) {
                // Encode the password
                String encodedPassword = passwordEncoder.encode(user.getPassword());
                user.setPassword(encodedPassword);
                System.out.println("Encoded password for user: " + user.getUsername());
            }
        }

        // Save all updated users back to the database
        userRepository.saveAll(users);

        System.out.println("Password migration completed!");
    }

    private boolean isPasswordEncoded(String password) {
        return password.startsWith("$2a$"); // BCrypt encoded passwords start with "$2a$"
    }
}
