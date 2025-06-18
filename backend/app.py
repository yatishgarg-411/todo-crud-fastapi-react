from fastapi import FastAPI
from routes.task import router as task_router
from routes.user import router as user_router
from routes.note import router as note_router
from fastapi.middleware.cors import CORSMiddleware


app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],  # Authorization, Content-Type, etc.
)
app.include_router(task_router)
app.include_router(user_router, prefix="/user")
app.include_router(note_router)
