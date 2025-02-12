# System imports
from contextlib import asynccontextmanager
from typing import List
from fastapi import FastAPI, Request
from sqlmodel import Session, select
import requests

#Files imports
from database import create_db_and_tables, engine
from models import Interaction, QuestionRequest

llm_url = "http://172.24.0.10:11434"

# Lifespan to create the database and tables
@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)

#Testing ollama llm
@app.get("/api")
def getlosd():
    ollamo = requests.get(f"{llm_url}/api/tags")
    return ollamo.json()

# Get LLM response using Ollama
# def get_llm_response(question: str) -> str:
#     response = requests.get(f"{llm_url}/").json()
#     print(response)
#     return response


# # Endpoint to handle user questions and return the answers
# @app.post("/api/question")
# async def post_question(request: Request, query: QuestionRequest):
#     #TODO: add here the logic to save the interaction on db
#     return get_llm_response(query.question)
#
#
# Endpoint to retrieve the interactions saved on the DB
# @app.get("/api/logs", response_model=List[Interaction])
# async def get_logs():
#     with Session(engine) as session:
#         logs = session.exec(select(Interaction)).all()
#         return logs


