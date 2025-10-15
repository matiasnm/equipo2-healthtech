package com.equipo2.healthtech.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@Slf4j
public class CorsConfig {

    @Value("${frontend.url}")
    private String frontendUrl;

    @Value("${api.url}")
    private String apiUrl;

    @Value("${CORS_ALLOW_ALL:false}")
    private boolean corsAllowAll;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        if (corsAllowAll) {
            log.info("CORS ALLOW: ALL");
            configuration.setAllowedOrigins(List.of("/**"));
            configuration.setAllowedMethods(List.of("*"));
            configuration.setAllowedHeaders(List.of("*"));
        } else {
            log.info("CORS ALLOW: {}, {}", frontendUrl, apiUrl);
            configuration.setAllowedOrigins(List.of(frontendUrl, apiUrl));
            configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
            configuration.setAllowedHeaders(List.of("Authorization", "Verifier", "Content-Type"));
            configuration.setAllowCredentials(true);
        }
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}