from fastapi import HTTPException,APIRouter,Depends
from config.database import notes_collection
from models.notes import Note, NoteUpdate
from utils.jwt_beare import JWTBearer
from typing import List
from bson import ObjectId



router = APIRouter()

@router.post("/note/add")
async def addnote(note: Note , useremail:str=Depends(JWTBearer())):
    notes_data=note.dict()
    notes_data["useremail"]= useremail
    await notes_collection.insert_one(notes_data)
    return {"msg": "Note added successfully"}

@router.get("/note/all", response_model=list[Note])
async def get_notes(useremail:str = Depends(JWTBearer())):
    notes=[]
    async for note in notes_collection.find({'useremail': useremail}):
        note["id"] = str(note["_id"])
        notes.append(note)
    return notes

@router.delete("/note/delete/{id}")
async def delete_note(id:str):
    existing= await notes_collection.find_one({"_id":ObjectId(id)})
    if not existing:
        raise HTTPException(status_code=404, detail="Note not found")
    result = await notes_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 1:
        return {"msg": "Note deleted successfully"}
    else:
        raise HTTPException(status_code=400, detail="Note deletion failed")

@router.patch("/note/update/{id}")
async def update_note(id:str,updated_note:NoteUpdate):
    existing = await notes_collection.find_one({'_id':ObjectId(id)})
    if not existing:
        raise HTTPException(status_code=404, detail="Note not found")
    update_date= {k:v for k,v in updated_note.dict().items() if v is not None}

    result= await notes_collection.update_one(
        {'_id': ObjectId(id)},
          {'$set': update_date}
     )
        
    if result.modified_count == 1:
        return {"msg": "Note updated successfully"}
    else:
        raise HTTPException(status_code=400, detail="Note update failed")
     

