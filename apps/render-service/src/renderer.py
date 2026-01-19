import io
from typing import BinaryIO
from weasyprint import HTML, CSS
from markdown import markdown
import tempfile
import os


class PDFRenderer:
    """Renders HTML/Markdown content to PDF using WeasyPrint."""

    def __init__(self):
        self.base_css = """
            @page {
                size: A4;
                margin: 2.5cm;
            }

            body {
                font-family: Georgia, serif;
                font-size: 12pt;
                line-height: 1.6;
                color: #333;
            }

            h1, h2, h3, h4, h5, h6 {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                font-weight: bold;
                margin-top: 1.5em;
                margin-bottom: 0.5em;
                color: #222;
            }

            h1 { font-size: 24pt; border-bottom: 2px solid #eee; padding-bottom: 0.3em; }
            h2 { font-size: 20pt; border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
            h3 { font-size: 16pt; }
            h4 { font-size: 14pt; }
            h5 { font-size: 12pt; }
            h6 { font-size: 10pt; color: #666; }

            p {
                margin: 1em 0;
                text-align: justify;
            }

            code {
                font-family: 'Courier New', monospace;
                background-color: #f5f5f5;
                padding: 0.2em 0.4em;
                border-radius: 3px;
                font-size: 0.9em;
            }

            pre {
                background-color: #2d2d2d;
                color: #f8f8f2;
                padding: 1em;
                border-radius: 5px;
                overflow-x: auto;
                margin: 1em 0;
            }

            pre code {
                background: none;
                padding: 0;
                color: inherit;
            }

            blockquote {
                border-left: 4px solid #ddd;
                padding-left: 1em;
                margin: 1em 0;
                color: #666;
                font-style: italic;
            }

            ul, ol {
                margin: 1em 0;
                padding-left: 2em;
            }

            li {
                margin: 0.5em 0;
            }

            table {
                border-collapse: collapse;
                width: 100%;
                margin: 1em 0;
            }

            th, td {
                border: 1px solid #ddd;
                padding: 0.75em;
                text-align: left;
            }

            th {
                background-color: #f5f5f5;
                font-weight: bold;
            }

            a {
                color: #007bff;
                text-decoration: none;
            }

            img {
                max-width: 100%;
                height: auto;
            }
        """

    def markdown_to_html(self, markdown_content: str) -> str:
        """Convert Markdown to HTML."""
        return markdown(
            markdown_content,
            extensions=[
                'extra',
                'codehilite',
                'tables',
                'fenced_code',
                'nl2br'
            ]
        )

    def html_to_pdf(self, html_content: str, custom_css: str = "") -> bytes:
        """Convert HTML to PDF using WeasyPrint."""
        # Wrap HTML in a complete document if not already
        if not html_content.strip().startswith('<!DOCTYPE') and not html_content.strip().startswith('<html'):
            html_content = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    {html_content}
</body>
</html>
            """

        # Create HTML object
        html_obj = HTML(string=html_content)

        # Prepare CSS
        css_list = [CSS(string=self.base_css)]
        if custom_css:
            css_list.append(CSS(string=custom_css))

        # Render to PDF
        pdf_bytes = html_obj.write_pdf(stylesheets=css_list)

        return pdf_bytes

    def markdown_to_pdf(self, markdown_content: str, custom_css: str = "") -> bytes:
        """Convert Markdown directly to PDF."""
        html_content = self.markdown_to_html(markdown_content)
        return self.html_to_pdf(html_content, custom_css)
