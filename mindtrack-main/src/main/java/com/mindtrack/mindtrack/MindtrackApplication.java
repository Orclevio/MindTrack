package com.mindtrack.mindtrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(CorsConfig.class)
public class MindtrackApplication {

	public static void main(String[] args) {
		SpringApplication.run(MindtrackApplication.class, args);
	}

}
