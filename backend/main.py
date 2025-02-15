# System imports
import json
from contextlib import asynccontextmanager
from typing import List
from fastapi import FastAPI, Request, HTTPException
from sqlmodel import Session, select
from sqlalchemy import desc

import requests

# Files imports
from database import create_db_and_tables, engine
from models import Interaction, QuestionRequest

llm_url = "http://172.24.0.10:11434"


# Lifespan to create the database and tables
@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)

# Guessing some topics related
ALLOWED_TOPICS = ["wine", "wines", "vineyard", "grape", "pairing", "pairing", "tasting", "flavors", "region", "variety",
                  "varieties", "sommelier",
                  "chardonnay", "cabernet", "pinot", "merlot", "syrah", "sauvignon", "riesling",
                  "sparkling", "champagne", "prosecco", "port", "sherry", "zinfandel",
                  "bordeaux", "burgundy", "napa", "tuscany", "rioja", "barolo", "chianti"]

DEFAULT_RESPONSE = "I'm sorry, I can only answer questions related to wine knowledge. Please ask a question about wine."


def validate_question(question: str) -> bool:
    # Check if the question is relevant to wine knowledge.
    question_lower = question.lower()
    return any(topic in question_lower for topic in ALLOWED_TOPICS)


# Get LLM response using Ollama
def get_llm_response(question: str):
    if not validate_question(question):
        return DEFAULT_RESPONSE

    # Define the prompt with context and examples
    prompt = f"""
        Answer the following question about wine. If the question is not related to wine, say so instead of answering.

        Question: {question}
        Answer:
        """

    with requests.post(f"{llm_url}/api/chat", json={
        "model": "llama2:latest",
        "messages": [
            {
                "role": "system",
                "content": "You are a knowledgeable sommelier. Your task is to provide accurate, detailed, and helpful answers to questions about wine. If the question is not related to wine, say so instead of answering."
            },
            {
                "role": "user",
                "content": prompt
            }]
    }, stream=True) as stream:
        full_resp = []
        for line in stream.iter_content(None):
            data = json.loads(line)
            full_resp.append(data)
        return full_resp


# Endpoint to handle user questions and return the answers
@app.post("/api/question")
async def post_question(request: Request, query: QuestionRequest):
    answer = get_llm_response(query.question)

    if answer == DEFAULT_RESPONSE:
        return {"answer": [{"done": True, "message": {"content": DEFAULT_RESPONSE}}]}

    # Log interaction
    ip = request.client.host
    # ideally the username, user id and location will come from the user auth model
    with Session(engine) as session:
        interaction = Interaction(
            question=query.question,
            answer=json.dumps(answer),
            ip=ip,
            location=query.location,
            username="User name",
            user_id="1234",
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
        logs = session.exec(select(Interaction).order_by(desc(Interaction.created_at))).all()

        return logs


#
@app.get("/api/logs/{log_id}", response_model=Interaction)
async def get_log(log_id: int):
    with Session(engine) as session:
        log = session.get(Interaction, log_id)

        if not log:
            raise HTTPException(status_code=404, detail="Log not found")
        return log
