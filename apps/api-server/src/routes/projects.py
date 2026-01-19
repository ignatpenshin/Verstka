from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from .. import schemas, crud
from ..database import get_db

router = APIRouter(prefix="/projects", tags=["projects"])


@router.post("/", response_model=schemas.ProjectWithDocuments, status_code=201)
async def create_project(
    project: schemas.ProjectCreate,
    db: AsyncSession = Depends(get_db)
):
    return await crud.create_project(db, project)


@router.get("/", response_model=List[schemas.ProjectWithDocuments])
async def list_projects(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    return await crud.get_projects(db, skip=skip, limit=limit)


@router.get("/{project_id}", response_model=schemas.ProjectWithDocuments)
async def get_project(
    project_id: str,
    db: AsyncSession = Depends(get_db)
):
    project = await crud.get_project(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.patch("/{project_id}", response_model=schemas.ProjectWithDocuments)
async def update_project(
    project_id: str,
    project: schemas.ProjectUpdate,
    db: AsyncSession = Depends(get_db)
):
    updated_project = await crud.update_project(db, project_id, project)
    if not updated_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return updated_project


@router.delete("/{project_id}", status_code=204)
async def delete_project(
    project_id: str,
    db: AsyncSession = Depends(get_db)
):
    deleted = await crud.delete_project(db, project_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Project not found")
