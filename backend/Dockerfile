# JDK 17 Alpine
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies (cached)
RUN ./mvnw dependency:go-offline -B

# Copy the actual source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# ---- Run stage ----
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
