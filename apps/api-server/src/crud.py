from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from typing import List, Optional
from . import models, schemas


# Project CRUD
async def get_project(db: AsyncSession, project_id: str) -> Optional[models.Project]:
    result = await db.execute(
        select(models.Project)
        .where(models.Project.id == project_id)
        .options(selectinload(models.Project.documents))
    )
    return result.scalar_one_or_none()


async def get_projects(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[models.Project]:
    result = await db.execute(
        select(models.Project)
        .options(selectinload(models.Project.documents))
        .offset(skip)
        .limit(limit)
    )
    return list(result.scalars().all())


async def create_project(db: AsyncSession, project: schemas.ProjectCreate) -> models.Project:
    db_project = models.Project(**project.model_dump())
    db.add(db_project)
    await db.commit()
    await db.refresh(db_project)
    return db_project


async def update_project(
    db: AsyncSession, project_id: str, project: schemas.ProjectUpdate
) -> Optional[models.Project]:
    db_project = await get_project(db, project_id)
    if not db_project:
        return None

    update_data = project.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_project, field, value)

    await db.commit()
    await db.refresh(db_project)
    return db_project


async def delete_project(db: AsyncSession, project_id: str) -> bool:
    db_project = await get_project(db, project_id)
    if not db_project:
        return False

    await db.delete(db_project)
    await db.commit()
    return True


# Document CRUD
async def get_document(db: AsyncSession, document_id: str) -> Optional[models.Document]:
    result = await db.execute(
        select(models.Document).where(models.Document.id == document_id)
    )
    return result.scalar_one_or_none()


async def get_document_by_yjs_id(db: AsyncSession, yjs_document_id: str) -> Optional[models.Document]:
    result = await db.execute(
        select(models.Document).where(models.Document.yjs_document_id == yjs_document_id)
    )
    return result.scalar_one_or_none()


async def get_documents(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[models.Document]:
    result = await db.execute(
        select(models.Document).offset(skip).limit(limit)
    )
    return list(result.scalars().all())


async def get_documents_by_project(
    db: AsyncSession, project_id: str, skip: int = 0, limit: int = 100
) -> List[models.Document]:
    result = await db.execute(
        select(models.Document)
        .where(models.Document.project_id == project_id)
        .offset(skip)
        .limit(limit)
    )
    return list(result.scalars().all())


async def create_document(db: AsyncSession, document: schemas.DocumentCreate) -> models.Document:
    db_document = models.Document(**document.model_dump())
    db.add(db_document)
    await db.commit()
    await db.refresh(db_document)
    return db_document


async def update_document(
    db: AsyncSession, document_id: str, document: schemas.DocumentUpdate
) -> Optional[models.Document]:
    db_document = await get_document(db, document_id)
    if not db_document:
        return None

    update_data = document.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_document, field, value)

    await db.commit()
    await db.refresh(db_document)
    return db_document


async def delete_document(db: AsyncSession, document_id: str) -> bool:
    db_document = await get_document(db, document_id)
    if not db_document:
        return False

    await db.delete(db_document)
    await db.commit()
    return True
