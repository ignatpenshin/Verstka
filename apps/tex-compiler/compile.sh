#!/bin/bash
# LaTeX compilation script
# Usage: ./compile.sh <source.tex>

set -e

INPUT_FILE="${1:-main.tex}"
OUTPUT_DIR="${OUTPUT_DIR:-/tmp/tex-output}"

mkdir -p "$OUTPUT_DIR"

# Run pdflatex in batch mode
pdflatex -interaction=nonstopmode -output-directory="$OUTPUT_DIR" "$INPUT_FILE"

# Run bibtex if .aux file exists
if [ -f "$OUTPUT_DIR/$(basename "$INPUT_FILE" .tex).aux" ]; then
    cd "$OUTPUT_DIR"
    bibtex "$(basename "$INPUT_FILE" .tex)" || true
    cd -
fi

# Second pass for references
pdflatex -interaction=nonstopmode -output-directory="$OUTPUT_DIR" "$INPUT_FILE"

echo "Compilation complete: $OUTPUT_DIR/$(basename "$INPUT_FILE" .tex).pdf"
