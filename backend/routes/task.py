from fastapi import APIRouter, Depends, HTTPException
from config.database import task_collection
from models.task import Task
from models.task import TaskUpdate
from bson import ObjectId
from typing import List
from utils.jwt_beare import JWTBearer

router = APIRouter()

@router.post("/task/add")  # ❌ was `.push`, ✅ use `.post`
async def create_task(task: Task, useremail:str = Depends(JWTBearer())):
    task_data = task.dict()
    task_data["useremail"] = useremail
    await task_collection.insert_one(task_data)
    return {"msg": "Task created successfully"}

@router.patch("/task/update/{task_id}")
async def update_task(task_id: str, updated_task: TaskUpdate):
    existing = await task_collection.find_one({"_id": ObjectId(task_id)})
    update_data = {k: v for k, v in updated_task.dict().items() if v is not None}

    if not existing:
        raise HTTPException(status_code=404, detail="Task not found")  # ❌ return → ✅ raise

    result = await task_collection.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": update_data}  # ❌ $set was inside wrong block
    )

    if result.modified_count == 1:  # ❌ typo: `modified_Count` → ✅ `modified_count`
        return {"msg": "Task Updated Successfully"}
    else:
        raise HTTPException(status_code=400, detail="Task update failed")

@router.delete("/task/delete/{task_id}")
async def delete_task(task_id: str):
    existing = await task_collection.find_one({"_id": ObjectId(task_id)})
    if not existing:
        raise HTTPException(status_code=404, detail="Task not found")

    result = await task_collection.delete_one({"_id": ObjectId(task_id)})

    if result.deleted_count == 1:  # ❌ `modified_count` → ✅ `deleted_count`
        return {"msg": "Task Deleted Successfully"}
    else:
        raise HTTPException(status_code=400, detail="Task deletion failed")

@router.get("/task/all", response_model=List[Task])
async def get_tasks(useremail: str = Depends(JWTBearer())):
    tasks = []
    async for task in task_collection.find({'useremail':useremail}):
        task["id"] = str(task["_id"])  # Convert ObjectId to string
        tasks.append(task)
    return tasks
