package com.backend.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;

@SpringBootApplication
@RestController
public class SpringbootApplication {

  private final AppConfigService appConfigService;
  private final AppVersionService appVersionService;

  public SpringbootApplication(AppConfigService appConfigService, AppVersionService appVersionService) {
    this.appConfigService = appConfigService;
    this.appVersionService = appVersionService;
  }

  public static void main(String[] args) {
    SpringApplication.run(SpringbootApplication.class, args);
  }

  @GetMapping("version")
  public Map<String, Object> version() throws IOException {
    return appVersionService.getVersion();
  }

  @GetMapping("config")
  public Map<String, Object> getConfig(@RequestParam(value = "param", defaultValue = "") String param)
      throws IOException {
    return appConfigService.getConfig(param);
  }

}