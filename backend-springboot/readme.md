# Backend Springboot

## création du projet

```
curl https://start.spring.io/starter.zip \
  -d dependencies=web,data-jpa,h2,lombok \
  -d language=java \
  -d type=maven-project \
  -d bootVersion=3.2.0 \
  -d javaVersion=21 \
  -d artifactId=springboot \
  -o my-backend.zip

unzip my-backend.zip -d backend-springboot

./mvnw -v

./mvnw spring-boot:run
```
