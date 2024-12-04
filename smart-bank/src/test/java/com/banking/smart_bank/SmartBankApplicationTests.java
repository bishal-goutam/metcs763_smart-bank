package com.banking.smart_bank;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class SmartBankApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void testPasswordEncoder() {
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String rawPassword = "password1";
		String encodedPassword = passwordEncoder.encode(rawPassword);

		// Verify the raw password matches the encoded password
		assertTrue(passwordEncoder.matches(rawPassword, encodedPassword),
				"The raw password should match the encoded password.");
	}

}
