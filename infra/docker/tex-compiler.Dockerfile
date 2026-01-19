FROM debian:bookworm-slim

# Install full TeXLive
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    texlive-full \
    biber && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

# Copy compilation script
COPY apps/tex-compiler/compile.sh /usr/local/bin/compile.sh
RUN chmod +x /usr/local/bin/compile.sh

CMD ["/usr/local/bin/compile.sh"]
