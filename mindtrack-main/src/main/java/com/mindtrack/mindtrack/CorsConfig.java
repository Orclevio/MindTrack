    package com.mindtrack.mindtrack;

    import org.springframework.context.annotation.Configuration;
    import org.springframework.web.servlet.config.annotation.CorsRegistry;
    import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

    @Configuration
    public class CorsConfig implements WebMvcConfigurer {

        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                    .allowedOrigins("*") // Permitir todas as origens
                    .allowedMethods("GET", "POST", "PUT", "DELETE") // Permitir todos os métodos HTTP
                    .allowedHeaders("*"); // Permitir todos os cabeçalhos
        }
    }
