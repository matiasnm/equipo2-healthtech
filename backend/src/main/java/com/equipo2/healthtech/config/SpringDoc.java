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
                                .description("""
    **a Healthy App...**

    ### ⚙️ RULES

    1. If `status = false` → **UserProfile is null** (ALL USERS)  
    
    2.a Practitioners **must set a PractitionerRole** in order to be active!
    
    2.b Practitioners **must set a PractitionerProfile** in order to be active!

    ### 🔐 Login Info

    | USER              | PASS     | ROLE          | INFO                                               |
    |-------------------|----------|----------------|----------------------------------------------------|
    | **admin@ht.com**  | admin    | [ADMIN]        | status = true                                      |
    | **patient1@ht.com** | patient | [PATIENT]      | status = true                                      |
    | **doctor1@ht.com** | doctor  | [PRACTITIONER] | status = true; practitionerRole = null             |
    """))
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