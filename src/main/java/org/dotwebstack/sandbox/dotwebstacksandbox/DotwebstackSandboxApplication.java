package org.dotwebstack.sandbox.dotwebstacksandbox;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("org.dotwebstack")
public class DotwebstackSandboxApplication {

  public static void main(String[] args) {
    SpringApplication.run(DotwebstackSandboxApplication.class, args);
  }

}
