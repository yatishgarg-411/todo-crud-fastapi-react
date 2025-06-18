from pydantic import BaseModel,EmailStr

class User(BaseModel):
    username:str
    useremail:EmailStr
    userpassword:str

class UserLogin(BaseModel):
    useremail:EmailStr
    userpassword:str