FROM debian:bookworm-slim

# Install LanguageTool dependencies
RUN apt-get update && \
    apt-get install -y wget unzip default-jre-headless && \
    rm -rf /var/lib/apt/lists/*

# Download and install LanguageTool
WORKDIR /opt
RUN wget https://languagetool.org/download/LanguageTool-stable.zip && \
    unzip LanguageTool-stable.zip && \
    rm LanguageTool-stable.zip && \
    mv LanguageTool-* languagetool

WORKDIR /opt/languagetool

EXPOSE 8010

CMD ["java", "-cp", "languagetool-server.jar", "org.languagetool.server.HTTPServer", "--port", "8010", "--allow-origin", "*"]
