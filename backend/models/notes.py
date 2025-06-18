from pydantic import BaseModel
from typing import Optional 

class Note(BaseModel):
    id:str
    title:str
    description:str

class NoteUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None