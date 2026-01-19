from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from .. import schemas, crud
from ..database import get_db

router = APIRouter(prefix="/documents", tags=["documents"])


@router.post("/", response_model=schemas.Document, status_code=201)
async def create_document(
    document: schemas.DocumentCreate,
    db: AsyncSession = Depends(get_db)
):
    # Check if project exists
    project = await crud.get_project(db, document.project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # Check if yjs_document_id is unique
    existing_doc = await crud.get_document_by_yjs_id(db, document.yjs_document_id)
    if existing_doc:
        raise HTTPException(status_code=400, detail="Document with this Yjs ID already exists")

    return await crud.create_document(db, document)


@router.get("/", response_model=List[schemas.Document])
async def list_documents(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    return await crud.get_documents(db, skip=skip, limit=limit)


@router.get("/yjs/{yjs_document_id}", response_model=schemas.Document)
async def get_document_by_yjs_id(
    yjs_document_id: str,
    db: AsyncSession = Depends(get_db)
):
    document = await crud.get_document_by_yjs_id(db, yjs_document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    return document


@router.get("/{document_id}", response_model=schemas.Document)
async def get_document(
    document_id: str,
    db: AsyncSession = Depends(get_db)
):
    document = await crud.get_document(db, document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    return document


@router.patch("/{document_id}", response_model=schemas.Document)
async def update_document(
    document_id: str,
    document: schemas.DocumentUpdate,
    db: AsyncSession = Depends(get_db)
):
    updated_document = await crud.update_document(db, document_id, document)
    if not updated_document:
        raise HTTPException(status_code=404, detail="Document not found")
    return updated_document


@router.delete("/{document_id}", status_code=204)
async def delete_document(
    document_id: str,
    db: AsyncSession = Depends(get_db)
):
    deleted = await crud.delete_document(db, document_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Document not found")
