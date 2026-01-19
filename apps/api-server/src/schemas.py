from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List


class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None


class Project(ProjectBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class DocumentBase(BaseModel):
    title: str = "Untitled Document"
    yjs_document_id: str
    is_public: bool = False


class DocumentCreate(DocumentBase):
    project_id: str


class DocumentUpdate(BaseModel):
    title: Optional[str] = None
    is_public: Optional[bool] = None


class Document(DocumentBase):
    id: str
    project_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ProjectWithDocuments(Project):
    documents: List[Document] = []

    class Config:
        from_attributes = True
