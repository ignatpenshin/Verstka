from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(
    title="Verstka Render Service",
    description="Markdown/LaTeX to PDF rendering service",
    version="0.1.0",
)


class RenderRequest(BaseModel):
    content: str
    format: str = "markdown"  # markdown or latex
    output: str = "pdf"  # pdf or html


@app.get("/")
async def root():
    return {"message": "Verstka Render Service"}


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/render")
async def render(request: RenderRequest):
    """
    Render markdown or latex to PDF/HTML.

    Supports multiple pipelines:
    1. Markdown → HTML → PDF (Puppeteer/WeasyPrint)
    2. Markdown → LaTeX → PDF (Pandoc + TeXLive)
    3. LaTeX → PDF (TeXLive)
    """
    # TODO: Implement rendering logic
    return {"status": "not_implemented", "message": "Rendering logic coming soon"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001)
