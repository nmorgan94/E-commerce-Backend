FROM java:8
EXPOSE 8090
ADD /target/eCommerse-0.0.1-SNAPSHOT.jar eCommerse-0.0.1-SNAPSHOT.jar
ENTRYPOINT [ "java", "-jar", "eCommerse-0.0.1-SNAPSHOT.jar" ]