from fastapi import FastAPI, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel
from .renderer import PDFRenderer

app = FastAPI(
    title="Verstka Render Service",
    description="Markdown/LaTeX to PDF rendering service",
    version="0.1.0",
)

# Initialize renderer
pdf_renderer = PDFRenderer()


class RenderRequest(BaseModel):
    content: str
    format: str = "markdown"  # markdown or html
    custom_css: str = ""


@app.get("/")
async def root():
    return {"message": "Verstka Render Service"}


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/render/pdf")
async def render_to_pdf(request: RenderRequest):
    """
    Render markdown or HTML to PDF.

    Supports:
    - Markdown → PDF
    - HTML → PDF
    """
    try:
        if request.format == "markdown":
            pdf_bytes = pdf_renderer.markdown_to_pdf(request.content, request.custom_css)
        elif request.format == "html":
            pdf_bytes = pdf_renderer.html_to_pdf(request.content, request.custom_css)
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported format: {request.format}")

        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={
                "Content-Disposition": "attachment; filename=document.pdf"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error rendering PDF: {str(e)}")


@app.post("/render/html")
async def render_to_html(request: RenderRequest):
    """
    Render markdown to HTML.
    """
    try:
        if request.format == "markdown":
            html_content = pdf_renderer.markdown_to_html(request.content)
        elif request.format == "html":
            html_content = request.content
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported format: {request.format}")

        return Response(
            content=html_content,
            media_type="text/html",
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error rendering HTML: {str(e)}")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001)
