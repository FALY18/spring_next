package com.javaweb.javaweb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/home")
    public String home() {
        return "home"; // Retourne la vue "home" (créez un fichier home.html ou home.jsp selon votre configuration)
    }
}
