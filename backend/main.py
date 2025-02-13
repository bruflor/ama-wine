# System imports
import json
from contextlib import asynccontextmanager
from typing import List
from fastapi import FastAPI, Request, HTTPException
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

# Get LLM response using Ollama
def get_llm_response(question: str):
    with requests.post(f"{llm_url}/api/chat", json={
        "model": "llama2:latest",
        "messages": [
            {
                "role": "user",
                "content": question
            }]
    }, stream=True) as stream:
        full_resp = []
        for line in stream.iter_content(2048):
            data = json.loads(line)
            full_resp.append(data)
        return full_resp


# Endpoint to handle user questions and return the answers
@app.post("/api/question")
async def post_question(request: Request, query: QuestionRequest):
    answer = get_llm_response(query.question)

    # Log interaction
    ip = request.client.host
    #ideally the username, user id and location will come from the user auth model
    with Session(engine) as session:
        interaction = Interaction(
            question=query.question,
            answer=json.dumps(answer),
            ip=ip,
            location=query.location,
            username= "User name",
            user_id= "1234",
        )
        session.add(interaction)
        session.commit()

    resp = {"answer": answer}
    return resp
#
# # Endpoint to retrieve the interactions saved on the DB
@app.get("/api/logs", response_model=List[Interaction])
async def get_logs():
    with Session(engine) as session:
        logs = session.exec(select(Interaction)).all()

        return logs
#
@app.get("/api/logs/{log_id}", response_model=Interaction)
async def get_log(log_id: int):
    with Session(engine) as session:
        log = session.get(Interaction, log_id)

        if not log:
            raise HTTPException(status_code=404, detail="Log not found")
        return log
