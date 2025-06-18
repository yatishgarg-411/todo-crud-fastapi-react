from pydantic import BaseModel,EmailStr
from typing import Optional

class Task(BaseModel):
    """
    Represents a task in the task management system.

    Attributes:
        title (str): The title of the task.
        description (Optional[str]): A brief description of the task. Defaults to None.
        completed (bool): Indicates whether the task has been completed. Defaults to False.
    """
    id: str
    title: str  # The title of the task
    description: Optional[str] = None  # An optional description of the task
    completed: bool = False  # A flag indicating if the task is completed

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None