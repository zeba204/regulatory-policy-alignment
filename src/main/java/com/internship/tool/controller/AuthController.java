package com.internship.tool.controller;

import com.internship.tool.entity.User;
import com.internship.tool.repository.UserRepository;
import com.internship.tool.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            return "Username already exists";
        }

        userRepository.save(user);
        return "User Registered Successfully";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User existingUser = userRepository.findFirstByUsername(user.getUsername()).orElse(null);

        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return jwtUtil.generateToken(user.getUsername());
        }

        return "Invalid Credentials";
    }

    @PostMapping("/refresh")
    public String refreshToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return "Invalid Token";
        }

        String oldToken = authHeader.substring(7);
        String username = jwtUtil.extractUsername(oldToken);

        return jwtUtil.generateToken(username);
    }
}