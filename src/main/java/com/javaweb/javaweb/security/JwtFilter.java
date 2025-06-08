//package com.javaweb.javaweb.security;
//
//import com.javaweb.javaweb.model.User;
//import com.javaweb.javaweb.repository.UserRepository;
//import jakarta.servlet.*;
//import jakarta.servlet.http.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.*;
//import org.springframework.security.core.*;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//import java.util.*;
//
//@Component
//public class JwtFilter extends OncePerRequestFilter {
//
//    @Autowired private JwtUtil jwtUtil;
//    @Autowired private UserRepository userRepository;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
//            throws ServletException, IOException {
//        String header = request.getHeader("Authorization");
//
//        if (header != null && header.startsWith("Bearer ")) {
//            String token = header.substring(7);
//            if (jwtUtil.validateToken(token)) {
//                String email = jwtUtil.getEmailFromToken(token);
//                Optional<User> userOpt = userRepository.findByEmail(email);
//                if (userOpt.isPresent()) {
//                    User user = userOpt.get();
//                    Set<GrantedAuthority> authorities = new HashSet<>();
//                    for (String role : user.getRoles()) {
//                        authorities.add(new SimpleGrantedAuthority(role));
//                    }
//                    UsernamePasswordAuthenticationToken auth =
//                            new UsernamePasswordAuthenticationToken(email, null, authorities);
//                    SecurityContextHolder.getContext().setAuthentication(auth);
//                }
//            }
//        }
//        chain.doFilter(request, response);
//    }
//}
