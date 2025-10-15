package com.equipo2.healthtech.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
@Slf4j
public class CorsConfig {

    // Permite definir múltiples orígenes separados por coma: FRONTEND_URLS="http://localhost:5173,https://web-dev.mbst.online"
    @Value("${frontend.url:}")
    private String frontendUrlsCsv;

    // Compat: una sola URL si no se usa la lista
    @Value("${frontend.url:}")
    private String frontendUrl;

    // Útil si querés permitir Swagger UI hosteado en el mismo dominio del API (no es requerido para same-origin)
    @Value("${api.url:}")
    private String apiUrl;

    // Lee de env directo y también soporta la key jerárquica si la definís en application.yml
    @Value("${cors.allow_all:${CORS_ALLOW_ALL:false}}")
    private boolean corsAllowAll;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        if (corsAllowAll) {
            // IMPORTANTE: usar allowedOriginPatterns con "*"; setAllowedOrigins("/**") NO es válido y provoca rechazos
            configuration.setAllowedOriginPatterns(List.of("*"));
            configuration.setAllowedMethods(List.of("*"));
            configuration.setAllowedHeaders(List.of("*"));
            configuration.setAllowCredentials(true);
            configuration.setMaxAge(3600L);
            log.info("CORS ALLOW: ALL (patterns=*)");
        } else {
            List<String> allowedOrigins = resolveAllowedOrigins();
            configuration.setAllowedOriginPatterns(allowedOrigins); // patterns permite comodines si hiciera falta
            configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
            configuration.setAllowedHeaders(List.of("*"));
            configuration.setExposedHeaders(List.of("Authorization"));
            configuration.setAllowCredentials(true);
            configuration.setMaxAge(3600L);
            log.info("CORS ALLOW (patterns): {}", allowedOrigins);
        }

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    private List<String> resolveAllowedOrigins() {
        List<String> origins = new ArrayList<>();

        // Agrega lista CSV si está definida
        if (frontendUrlsCsv != null && !frontendUrlsCsv.isBlank()) {
            origins.addAll(Arrays.stream(frontendUrlsCsv.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isBlank())
                    .collect(Collectors.toList()));
        }

        // Agrega la single si está definida
        if (frontendUrl != null && !frontendUrl.isBlank()) {
            origins.add(frontendUrl.trim());
        }

        // ApiUrl como origen no suele ser necesario (same-origin no requiere CORS), pero lo mantenemos por compatibilidad
        if (apiUrl != null && !apiUrl.isBlank()) {
            origins.add(apiUrl.trim());
        }

        // Si nada configurado, evita lista vacía que rechaza todo: restringimos a localhost por defecto
        if (origins.isEmpty()) {
            origins.addAll(List.of("http://localhost:3000", "http://localhost:5173"));
        }
        return origins;
    }
}