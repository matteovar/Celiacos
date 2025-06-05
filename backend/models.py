import os

from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
client = MongoClient(MONGODB_URI)
db = client["celiaco"]

receitas_collection = db["receitas"]
locais_collection = db["locais"]
user_collection = db["users"]
