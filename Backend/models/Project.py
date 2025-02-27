from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel

Base = declarative_base()

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    code = Column(Text)

# Pydantic Schema
class ProjectCreate(BaseModel):
    name: str
    code: str

class ProjectOut(BaseModel):
    id: int
    name: str
    code: str

    class Config:
        orm_mode = True
