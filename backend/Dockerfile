# JDK 17 Alpine
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Coy pom.xml and get dependecy
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
RUN ./mvnw dependency:go-offline -B

# Copy project folder
COPY src ./src

# Build app
RUN ./mvnw package -DskipTests

# Port
EXPOSE 8080

# Run
CMD ["java", "-jar", "target/healthtech-0.0.1-SNAPSHOT.jar"]
