from sqlmodel import SQLModel, create_engine

# Define the database URL (SQLite)
DATABASE_URL = "sqlite:///interactions.db"

# Create the SQLModel engine
engine = create_engine(DATABASE_URL, echo=True)

# Create the database and tables
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
