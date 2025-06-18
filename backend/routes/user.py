from fastapi import APIRouter,HTTPException
from pydantic import EmailStr

from models.user import User, UserLogin
from config.database import user_collection

from utils.jwt_handler import create_token

router=APIRouter()

@router.post("/signup")
async def signup(user:User):
    existing = await user_collection.find_one({"useremail":user.useremail, "userpassword": user.userpassword})
    if existing:
        return HTTPException(status_code =400, detail="User already exists")
    
    await user_collection.insert_one(user.dict())
    return{"msg":"New Account Created Successfully","status": 201}

@router.post("/login")
async def signin(user:UserLogin):
    existing = await user_collection.find_one({"useremail": user.useremail, "userpassword": user.userpassword})
    if not existing:
        return HTTPException(status_code=400, detail="Invalid Credentials")
    
    token = create_token({"useremail": existing["useremail"]})
    return{"msg":"Login Successful", "status": 200,"token":token}

@router.get("/dashboard/{useremail}")
async def getusername(useremail:EmailStr):
    existing = await user_collection.find_one({"useremail": useremail})
    if not existing:
        return HTTPException(status_code=404, detail="User not found")
    
    return {"username": existing["username"], "status": 200}