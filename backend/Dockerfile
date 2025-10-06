# Alternativa sin Maven Wrapper
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

<<<<<<< HEAD
# Copiar wrapper y POM
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Descargar dependencias
RUN ./mvnw dependency:go-offline -B
=======
# Instalar Maven
RUN apk add --no-cache maven

# Copiar POM
COPY pom.xml .

# Descargar dependencias
RUN mvn dependency:go-offline -B
>>>>>>> 92a7b59 (fix:docker files)

# Copiar código fuente
COPY src ./src

# Compilar
<<<<<<< HEAD
RUN ./mvnw package -DskipTests

# Exponer puerto
EXPOSE 8080

# Ejecutar
=======
RUN mvn package -DskipTests

EXPOSE 8080

>>>>>>> 92a7b59 (fix:docker files)
CMD ["java", "-jar", "target/healthtech-0.0.1-SNAPSHOT.jar"]