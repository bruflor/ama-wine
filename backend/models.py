from sqlmodel import SQLModel, Field

# Define the Interaction model
class Interaction(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True) # Auto-incrementing int, should be changed for large scale projects to an uuid
    question: str
    answer: str
    second_sentence: str | None = None
    ip: str
    location: str
    username: str
    user_id: str

# Define the question model for request body
class QuestionRequest(SQLModel):
    question: str
    location: str #ideally this will come from the user model, but for now will come from the browser
