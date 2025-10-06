# JDK 17 Alpine
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copiar wrapper y POM
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Descargar dependencias
RUN ./mvnw dependency:go-offline -B

# Copiar código fuente
COPY src ./src

# Compilar
RUN ./mvnw package -DskipTests

# Exponer puerto
EXPOSE 8080

# Ejecutar
CMD ["java", "-jar", "target/healthtech-0.0.1-SNAPSHOT.jar"]