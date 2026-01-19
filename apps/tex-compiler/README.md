# Verstka TeX Compiler

Isolated LaTeX compilation service for full Overleaf-mode support.

## Features

- Full TeXLive installation
- Sandboxed compilation
- Streaming compile logs
- Error reporting

## Docker Build

```bash
docker build -t verstka-tex-compiler .
```

## Security

- Runs in isolated container
- Seccomp profile for sandboxing
- No network access during compilation
- Timeout limits
