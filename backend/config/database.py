"""
This module initializes the connection to the MongoDB database using Motor, an asynchronous driver for MongoDB.
It loads environment variables from a .env file to retrieve the MongoDB URI and sets up the database and collections.
"""

from motor.motor_asyncio import AsyncIOMotorClient  # Import the asynchronous MongoDB client from Motor
import os  # Import the os module to interact with the operating system
from dotenv import load_dotenv  # Import load_dotenv to load environment variables from a .env file

load_dotenv()  # Load environment variables from a .env file

MONGO_URI = os.getenv("MONGO_URI")  # Retrieve the MongoDB URI from environment variables

client = AsyncIOMotorClient(MONGO_URI)  # Create an instance of AsyncIOMotorClient with the MongoDB URI
db = client["todoapp"]  # Access the 'todoapp' database
user_collection = db["users"]  # Access the 'users' collection within the 'todoapp' database
task_collection = db["tasks"]  # Access the 'tasks' collection within the 'todoapp' database
notes_collection = db["notes"]
