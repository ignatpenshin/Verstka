# Verstka Spellcheck Service

LanguageTool server for spell checking and grammar checking.

## Features

- Multi-language spell checking
- Grammar checking
- Style suggestions
- Support for technical/scientific writing

## Running

```bash
docker build -t verstka-spellcheck .
docker run -p 8010:8010 verstka-spellcheck
```

## API

The service runs LanguageTool HTTP server on port 8010.

See [LanguageTool HTTP API](https://languagetool.org/http-api/) for documentation.
