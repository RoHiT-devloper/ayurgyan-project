package com.ayurgyan.controller;

import com.ayurgyan.model.User;
import com.ayurgyan.model.UserRole;
import com.ayurgyan.model.dto.ApiResponse;
import com.ayurgyan.model.dto.AuthDTO;
import com.ayurgyan.repository.UserRepository;
import com.ayurgyan.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthDTO.JwtResponse>> login(@Valid @RequestBody AuthDTO.LoginRequest loginRequest) {
        try {
            System.out.println("=== LOGIN ATTEMPT ===");
            System.out.println("Username: " + loginRequest.getUsername());
            
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
            String jwt = jwtUtil.generateToken(userDetails);

            User user = userRepository.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            AuthDTO.JwtResponse response = new AuthDTO.JwtResponse(
                    jwt, user.getUsername(), user.getEmail(), user.getRole().name());

            System.out.println("=== LOGIN SUCCESSFUL ===");
            return ResponseEntity.ok(ApiResponse.success("Login successful", response));

        } catch (Exception e) {
            System.err.println("=== LOGIN FAILED ===");
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Invalid username or password"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> register(@Valid @RequestBody AuthDTO.RegisterRequest registerRequest) {
        try {
            System.out.println("=== REGISTRATION ATTEMPT ===");
            System.out.println("Username: " + registerRequest.getUsername());
            System.out.println("Email: " + registerRequest.getEmail());
            System.out.println("Password length: " + (registerRequest.getPassword() != null ? registerRequest.getPassword().length() : 0));

            // Validate input
            if (registerRequest.getUsername() == null || registerRequest.getUsername().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("Username is required"));
            }

            if (registerRequest.getEmail() == null || registerRequest.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("Email is required"));
            }

            if (registerRequest.getPassword() == null || registerRequest.getPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("Password is required"));
            }

            // Check if username exists
            if (userRepository.existsByUsername(registerRequest.getUsername())) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("Username '" + registerRequest.getUsername() + "' is already taken"));
            }

            // Check if email exists
            if (userRepository.existsByEmail(registerRequest.getEmail())) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("Email '" + registerRequest.getEmail() + "' is already in use"));
            }

            // Create new user
            User user = new User();
            user.setUsername(registerRequest.getUsername().trim());
            user.setEmail(registerRequest.getEmail().trim());
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            user.setRole(UserRole.USER);

            User savedUser = userRepository.save(user);
            System.out.println("=== REGISTRATION SUCCESSFUL ===");
            System.out.println("User ID: " + savedUser.getId());
            System.out.println("Username: " + savedUser.getUsername());

            return ResponseEntity.ok(ApiResponse.success("User registered successfully", null));

        } catch (Exception e) {
            System.err.println("=== REGISTRATION FAILED ===");
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Registration failed: " + e.getMessage()));
        }
    }

    // Add a test endpoint without /api prefix
    @PostMapping("/test-register")
    public ResponseEntity<ApiResponse<String>> testRegister(@RequestBody AuthDTO.RegisterRequest registerRequest) {
        return ResponseEntity.ok(ApiResponse.success("Test endpoint reached successfully", null));
    }
}