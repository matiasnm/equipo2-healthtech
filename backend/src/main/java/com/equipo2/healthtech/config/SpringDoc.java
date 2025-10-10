package com.equipo2.healthtech.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
@AllArgsConstructor
public class SpringDoc {

        private final Environment env;

        @Bean
        public OpenAPI openAPI() {
                String apiUrl = env.getProperty("API_URL");

                return new OpenAPI()
                        // Dynamic server URL
                        .addServersItem(new Server().url(apiUrl))
                        // Info
                        .info(new Info()
                                .title("Health Tech")
                                .version("1.0.0")
                                .description("a Healthy App..."))
                        // Security
                        .addSecurityItem(new SecurityRequirement().addList("bearer-key"))
                        .components(
                                new io.swagger.v3.oas.models.Components()
                                        .addSecuritySchemes("bearer-key",
                                                new SecurityScheme()
                                                        .type(SecurityScheme.Type.HTTP)
                                                        .scheme("bearer")
                                                        .bearerFormat("JWT")
                                                        .in(SecurityScheme.In.HEADER)
                                        )
                        );
        }
}