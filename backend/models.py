from sqlmodel import SQLModel, Field

# Define the Interaction model
class Interaction(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True) # Auto-incrementing int, should be changed for large scale projects to an uuid
    question: str
    response: str
    second_sentence: str
    ip: str
    location: str
    #user_name is required in frontend

# Define the question model for request body
class QuestionRequest(SQLModel):
    question: str
    ip: str
    location: str