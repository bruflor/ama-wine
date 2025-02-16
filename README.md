# Ask Me Anything About Wine 🍷

This project simulates a real-world scenario where users can query information about wine and receive concise, relevant answers. Key features include:
- A responsive frontend based on a Figma design.
- A user-friendly question input interface.
- Display of LLM-generated answers in real-time.

The project is built using three services: `ollama`, `fastapi`, and `webapp`, all containerized with Docker and managed using Docker Compose.

Please run all services in the docker compose to ensure the project runs as expected.

> **Note:** Ensure all services are running in Docker Compose for the project to function correctly.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
> **Tip:** Verify Docker is running by executing `docker --version` in your terminal.

## Getting Started

1. **Clone the Repository**

   Clone the repository to your local machine using either SSH or HTTPS:

```bash
git clone <repository-url>
cd <repository-directory>
````
   
2. **Build and Run the Services**

Ensure the docker is running on your machine:

```bash
sudo systemctl start docker
```

The services are defined in a docker-compose.yml file. To build and run all the services, use the following command:

```bash
docker-compose up --build
```

This commands will:
Start docker at your machine
Build the Docker images for each service (ollama, fastapi, and webapp).

Start the containers and link them together as specified in the docker-compose.yml file.

3. **Access the Services**

Once the containers are up and running, you can access the services as follows:

Ollama (LLM Server): Accessible at http://localhost:11434

FastAPI (Backend): Accessible at http://localhost:8000

Webapp (Frontend): Accessible at http://localhost:8080

## Troubleshooting
1. Port Conflicts: Ensure that ports 11434, 8000, and 8080 are not already in use on your machine.
2. Docker permissions: If your docker throws an error `ConnectionRefusedError(111, 'Connection refused')` run it with `sudo` in front of the commands.
3. Rebuild Containers
If you make changes to the code or configuration, rebuild the containers:
```bash
docker-compose down
docker-compose up --build
```

# How to
## Frontend
To access the frontend, navigate to http://localhost:8080.
#### Main Page
- The main page allows users to ask questions about wine.
- If the database is populated, you'll see suggested questions. Otherwise, the suggestions section will be empty.

![Main Page](https://github.com/bruflor/)

#### Asking Questions
- After submitting a question, the interface will update to display your question and the LLM-generated answer.
- **Note:** The response time depends on the LLM and may not be instantaneous.

![Question Page](https://github.com/bruflor/)

#### Returning to Suggestions on Main
- To return to the suggestions, reload the page (as the layout does not include a back or reset button).

#### Dashboard
- To access the dashboard, navigate to http://localhost:8080/dashboard or type `/dashboard` in the URL.
- The dashboard displays analytics related to the questions asked that are mocked accordingly to the entries on database.
- **Note:** The user module is not implemented, so features like username, location, and permissions are non-functional.

![Dashboard](https://github.com/bruflor/)

### Backend

To explore the backend API, visit http://localhost:8000/docs. This page provides:
- An interactive OpenAPI documentation.
- The ability to test API endpoints directly.

#### Additional Endpoints
- Two additional endpoints are available but not implemented in the frontend:
   - `GET /api/logs/{logid}`
   - `DELETE /api/logs/{logid}`
