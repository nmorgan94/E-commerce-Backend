FROM maven:3.5.3-jdk-8-alpine as target
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src/ /build/src/
RUN mvn package

FROM openjdk:8-jre-alpine
EXPOSE 8080
COPY --from=target /build/target/*.jar /app/my-app.jar
CMD ["java", "-jar", "/app/my-app.jar"]
