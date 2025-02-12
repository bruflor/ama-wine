FROM ollama/ollama:0.1.32

# Pre-Install llama2
RUN nohup bash -c "ollama serve &" && sleep 5 && ollama pull llama2