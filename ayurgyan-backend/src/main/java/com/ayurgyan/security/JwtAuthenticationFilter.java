package com.ayurgyan.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired(required = false)
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String path = request.getServletPath();
        String requestURI = request.getRequestURI();

        logger.info("Processing request: " + requestURI + " (Servlet Path: " + path + ")");

        // Skip JWT processing for public endpoints (with and without /api prefix)
        if (requestURI.startsWith("/api/auth/") || requestURI.startsWith("/auth/") ||
            requestURI.startsWith("/api/herbs/") || requestURI.startsWith("/herbs/") ||
            requestURI.startsWith("/api/test/") || requestURI.startsWith("/test/") ||
            requestURI.startsWith("/swagger-ui/") || 
            requestURI.startsWith("/v3/api-docs/") ||
            requestURI.equals("/error") || requestURI.equals("/api/error")) {
            
            logger.info("Skipping JWT filter for public endpoint: " + requestURI);
            chain.doFilter(request, response);
            return;
        }

        // If JWT util is not available, just continue
        if (jwtUtil == null) {
            logger.warn("JWT Util not available, skipping authentication");
            chain.doFilter(request, response);
            return;
        }

        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            try {
                username = jwtUtil.extractUsername(jwt);
                logger.info("Extracted username from JWT: " + username);
            } catch (Exception e) {
                logger.warn("JWT token validation failed: " + e.getMessage());
            }
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

                if (jwtUtil.validateToken(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    logger.info("Authenticated user: " + username);
                }
            } catch (Exception e) {
                logger.warn("User authentication failed: " + e.getMessage());
            }
        }
        chain.doFilter(request, response);
    }
}